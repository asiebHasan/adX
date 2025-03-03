from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

import logging

logger = logging.getLogger(__name__)

@shared_task
def send_activation_email(email, subject, message):
    """Send an activation email to the given email address."""
    try:
        print(message)
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
    except Exception as e:
        logger.error(f"Failed to send activation email to {email}: {e}")