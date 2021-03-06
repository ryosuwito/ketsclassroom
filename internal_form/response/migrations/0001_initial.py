# Generated by Django 3.2 on 2021-08-07 19:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('responder', '0001_initial'),
        ('assignment', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField()),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('answer', models.JSONField(default=None, null=True)),
                ('assignment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assignment_target', to='assignment.assignment')),
                ('responder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reponder_target', to='responder.responder')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
