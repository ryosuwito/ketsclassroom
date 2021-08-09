from base.models import CustomeBaseModel
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class ResponderGroup(CustomeBaseModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(self.name))
        super().save(*args, **kwargs)

class Responder(CustomeBaseModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    group = models.ForeignKey(ResponderGroup,on_delete=models.SET_NULL,null=True,blank=True)
    question = models.JSONField(default=None, null=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(self.name))
        super().save(*args, **kwargs)