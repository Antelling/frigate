# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-09 19:39
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cards', models.TextField(null=True, verbose_name='note cards')),
                ('text', models.TextField(null=True, verbose_name='written paper')),
                ('sources', models.TextField(null=True, verbose_name='list of sources')),
                ('title', models.CharField(max_length=200)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
