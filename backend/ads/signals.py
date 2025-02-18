from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Ad

@receiver(post_save, sender=Ad)
def check_ad_expiry(sender, instance, **kwargs):
    if instance.expires_at and instance.expires_at < timezone.now():
        instance.active = False
        instance.save(update_fields=["active"])