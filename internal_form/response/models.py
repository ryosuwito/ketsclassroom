from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from custom_form.models import CustomForm

def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + get_random_string(length=4)
    return unique_slug

class Response(models.Model):
    slug = models.SlugField()
    form = models.ForeignKey(CustomForm, on_delete=models.CASCADE, null=True)
    answer = models.JSONField(default=None, null=True)

    is_private = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    created_at =  models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.title))
        super().save(*args, **kwargs)