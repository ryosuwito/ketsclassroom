from base.models import CustomeBaseModel
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from responder.models import ResponderGroup
from custom_form.models import CustomForm

class AssignmentGroup(CustomeBaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(self.title))
        super().save(*args, **kwargs)

class Assignment(CustomeBaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    group = models.ForeignKey(AssignmentGroup,on_delete=models.SET_NULL,null=True,blank=True)
    responder_group = models.ForeignKey(ResponderGroup,on_delete=models.SET_NULL,null=True,blank=True)
    form = models.ForeignKey(CustomForm,on_delete=models.SET_NULL,null=True,blank=True)
    valid_on =  models.DateTimeField(auto_now=True)
    valid_until =  models.DateTimeField(auto_now=True)
    time_limit = models.IntegerField(default=90)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(self.title))
        super().save(*args, **kwargs)