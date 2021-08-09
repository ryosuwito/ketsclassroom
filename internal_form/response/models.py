from django.db.models.deletion import CASCADE
from base.models import CustomeBaseModel
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.template.defaultfilters import slugify
from assignment.models import Assignment

from responder.models import Responder

class Response(CustomeBaseModel):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, null=True, related_name="assignment_target")
    answer = models.JSONField(default=None, null=True)
    responder = models.ForeignKey(Responder, on_delete=CASCADE, related_name="reponder_target")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.unique_slugify(slugify(get_random_string(length=20)))
        super().save(*args, **kwargs)