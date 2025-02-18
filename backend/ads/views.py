from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Ad
from .serializers import AdSerializer

# List active ads for authenticated users
class AdViewSet(generics.ListAPIView):
    queryset = Ad.objects.filter(is_active=True)  # Filter for active ads only
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Ensure users can only delete their own ads
        return Ad.objects.filter(user=self.request.user)

# Create and update ads for authenticated users
class AdCreateUpdateViewSet(generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure the ad is created by the authenticated user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure the ad is updated by the authenticated user
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        # Filter to ensure users can only create/update their own ads
        return Ad.objects.filter(user=self.request.user)

# Delete ads for authenticated users
class AdDeleteViewSet(generics.DestroyAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only delete their own ads
        return Ad.objects.filter(user=self.request.user)
