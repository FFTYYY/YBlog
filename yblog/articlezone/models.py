from django.db import models
from . import constants

class Node(models.Model):
    content = models.TextField(default = "", blank = True)

class Component(models.Model):

    name = models.CharField(max_length = constants.short_str_length)
    meta = models.CharField(max_length = constants.short_str_length)
    fixed_params   = models.TextField(default = "")
    default_params = models.TextField(default = "")
    extra_params   = models.TextField(default = "")
    



