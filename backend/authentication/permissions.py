from .models import User
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.ADMIN

class IsEmployee(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.EMPLOYEE

class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.CLIENT