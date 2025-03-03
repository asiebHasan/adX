from django.contrib import admin
from .models import User  # Import your User model

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'is_staff', 'is_superuser', 'created_at']

admin.site.register(User, UserAdmin)