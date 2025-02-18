from django.contrib import admin
from django.urls import path, include
from .views import (
    CustomTokenObtainPairView,
    ClientRegistrationView,
    ChangePasswordView,
    UserProfileView,
    UserProfileUpdateView,
    TokenRefreshView
)

urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("register/", ClientRegistrationView.as_view(), name="register"),
    path('refreshToken/', TokenRefreshView.as_view(), name='token_refresh'),
    path(
        "password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    path("change_password/", ChangePasswordView.as_view(), name="change_password"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="profile_update"),
]
