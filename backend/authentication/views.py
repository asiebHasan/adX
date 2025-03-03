from django.shortcuts import render
from rest_framework import generics, permissions, response

from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import (
    CustomTokenObtainSerializer,
    UserRegistrationSerializer,
    ChangPasswordSerializer,
    UserProfileSerializer
)
from .models import User
from django.conf import settings
from .utils import generate_activation_link
from .tasks import send_activation_email

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer

class ClientRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        print("register")
        user = serializer.save(role=User.Role.CLIENT, is_active=False)

        uid, token = generate_activation_link(user)

        # Construct the activation link
        verification_link = f"{settings.FRONTEND_URL}/activate/{uid}/{token}"

        # Define email subject and message
        subject = "Verify Your Email Address"
        message = f"Click the link below to verify your email:\n\n{verification_link}"

        # Send activation email asynchronously using Celery
        send_activation_email.delay(user.email, subject, message)


class TokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenObtainSerializer
    
        

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangPasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash(request, user)
        return Response({"message": "Password updated successfully"})
    
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user