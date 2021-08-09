from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class CustomeBaseModel(models.Model):
    def unique_slugify(instance, slug):
        model = instance.__class__
        unique_slug = slug
        while model.objects.filter(slug=unique_slug).exists():
            unique_slug = slug + get_random_string(length=4)
        return unique_slug
    slug = models.SlugField()
    is_active = models.BooleanField(default=True)
    created_at =  models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True