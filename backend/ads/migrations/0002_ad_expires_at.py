# Generated by Django 5.1.5 on 2025-02-10 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ad',
            name='expires_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
