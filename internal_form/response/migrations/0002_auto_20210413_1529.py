# Generated by Django 3.2 on 2021-04-13 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('response', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='response',
            name='answer',
            field=models.JSONField(default=None, null=True),
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
    ]
