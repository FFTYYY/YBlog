from django.db import models
from .. import constants
import django.utils.timezone as timezone

class Node(models.Model):
	father = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , blank = True , related_name = "son")
	index_in_father = models.IntegerField(default = 0)

	content = models.TextField(default = "", blank = True)

	create_time 	= models.DateTimeField(default = timezone.now)
	update_time = models.DateTimeField(default = timezone.now)

	def save(self , *args , **kwargs):
		self.update_time = timezone.now()			
		return super().save(*args , **kwargs)

class Component(models.Model):

	name = models.CharField(max_length = constants.short_str_length)
	meta = models.CharField(max_length = constants.short_str_length)
	fixed_params   = models.TextField(default = "")
	default_params = models.TextField(default = "")
	extra_params   = models.TextField(default = "")



