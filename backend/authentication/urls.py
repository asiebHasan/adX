from django.contrib import admin
from django.urls import path, include
from .views import (
    CustomTokenObtainPairView,
    ClientRegistrationView,
    ChangePasswordView
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', ClientRegistrationView.as_view(), name='register'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
]