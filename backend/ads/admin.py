from django.contrib import admin
from .models import Ad

# Register your models here.
class AdAdmin(admin.ModelAdmin):
    
    class Meta:
        model = Ad
    
    list_display = ['title', 'ad_type', 'user', 'is_active', 'created_at']
    list_filter = ['ad_type', 'is_active', 'created_at']
    search_fields = ['title', 'user']
    readonly_fields = ['created_at']        
    

admin.site.register(Ad, AdAdmin)