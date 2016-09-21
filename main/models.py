from django.db import models
from django.contrib.auth.models import User


class Paper(models.Model):
    cards = models.TextField('note cards', null=True)
    text = models.TextField('written paper', null=True)
    sources = models.TextField('list of sources', null=True)
    owner = models.ForeignKey(User)
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title
