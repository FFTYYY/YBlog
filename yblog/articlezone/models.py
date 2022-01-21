from django.db import models
from . import constants



class Components(models.Model):

    name = models.CharField(max_length = constants.short_str_length)
