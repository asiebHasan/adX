from celery import shared_task
from django.utils import timezone
from django.db import close_old_connections
from django.db.models import Q
from .models import Ad

import datetime

@shared_task
def deactivate_expired_ads():
    """Bulk deactivation of expired ads."""
    print("TASK TRIGGERED AT:", datetime.now())
    close_old_connections()
    expired_ads = Ad.objects.filter(Q(expires_at__lt=timezone.now()) & Q(is_active=True))
    count = expired_ads.update(is_active=False)
    return f"Dectivated {count} expired ads."
