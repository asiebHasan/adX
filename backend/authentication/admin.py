from django.contrib import admin
from .models import User


# Register your models here.

class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = User

    list_display = ['email', 'is_active', 'is_staff', 'is_superuser', 'created_at']
    list_filter = ['is_active', 'is_staff', 'is_superuser', 'created_at']
    search_fields = ['email']
    readonly_fields = ['created_at']