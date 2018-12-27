from django.db import models

# Create your models here.

class Md(models.Model):
	name = models.CharField(max_length = 200)
	file = models.FileField()
	#def __init__(self):
	#	pass