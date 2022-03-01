from django.db import models
from .. import constants
import django.utils.timezone as timezone
from .constraints import perform_checks

class Concept(models.Model):

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

	concepts = models.ManyToManyField(Concept , related_name = "place" , blank = True , )

	content = models.TextField(default = "", blank = True)

	create_time = models.DateTimeField(default = timezone.now)
	update_time = models.DateTimeField(default = timezone.now)

	def get_sons(self):
		'''返回所有子节点，包括自己。'''

		all_sons = set()
		for son in Node.objects.filter(father_id = self.id):
			all_sons = all_sons | son.get_sons()
		all_sons.add(self)
		return all_sons

	def get_all_concepts(self):
		'''收集自己到根的所有组件。'''
		ret = set()
		f = self
		while f is not None:
			[ret.add(x) for x in f.concepts.all()]
			f = f.father
		return ret

	def save(self , *args , **kwargs):

		# 不准保存 
		# TODO 加点提示信息啥的
		if not perform_checks(self):
			return 

		self.update_time = timezone.now()

		return super().save(*args , **kwargs)


class Comment(models.Model):
	content = models.TextField(default = "" , null = True , blank = True)
	name = models.CharField(max_length = constants.short_str_length , default = "" , null = True , blank = True)
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "comments" , null = True)
