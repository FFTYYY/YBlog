from django.db import models
from .. import constants
import django.utils.timezone as timezone
from .constraints import perform_checks

class Component(models.Model):

	name = models.CharField(max_length = constants.short_str_length)
	meta = models.CharField(max_length = constants.short_str_length)
	fixed_params   = models.TextField(default = "" , null = True , blank = True)
	default_params = models.TextField(default = "" , null = True , blank = True)
	extra_params   = models.TextField(default = "" , null = True , blank = True)

	def __str__(self):
		return self.name

class Node(models.Model):
	father = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , blank = True , related_name = "son")
	index_in_father = models.IntegerField(default = 0)

	components = models.ManyToManyField(Component , related_name = "place" , null = True , blank = True , )

	content = models.TextField(default = "", blank = True)

	create_time = models.DateTimeField(default = timezone.now)
	update_time = models.DateTimeField(default = timezone.now)

	def get_all_components(self):
		'''收集自己到根的所有组件。'''
		ret = set()
		f = self
		while f is not None:
			[ret.add(x) for x in f.components.all()]
			f = f.father
		return ret

	def save(self , *args , **kwargs):

		# 不准保存 
		# TODO 加点提示信息啥的
		if not perform_checks(self):
			return 

		self.update_time = timezone.now()

		return super().save(*args , **kwargs)

