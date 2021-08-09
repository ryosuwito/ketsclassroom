from base.models import CustomeBaseModel
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify

class CustomForm(CustomeBaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    question = models.JSONField(default=None, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(self.title))
        super().save(*args, **kwargs)