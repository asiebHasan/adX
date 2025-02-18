from django.urls import path
from .views import AdViewSet, AdCreateUpdateViewSet, AdDeleteViewSet

urlpatterns = [
    path("", AdViewSet.as_view(), name="ad-list"),
    path("create/", AdCreateUpdateViewSet.as_view(), name="ad-create"),
    path("update/<int:pk>/", AdCreateUpdateViewSet.as_view(), name="ad-update"),
    path("delete/<int:pk>/", AdDeleteViewSet.as_view(), name="ad-delete"),
    
]
