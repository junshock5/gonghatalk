# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2022-05-06 10:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_message_align'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='align',
        ),
        migrations.AddField(
            model_name='message',
            name='writer',
            field=models.TextField(default='writer'),
        ),
    ]