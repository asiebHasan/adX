from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Ad(models.Model):
    AD_TYPES = [
        ('VIDEO', 'Video'),
        ('BANNER', 'Banner')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    ad_type = models.CharField(max_length=6, choices=AD_TYPES)
    file = models.FileField(upload_to='ads/')
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    