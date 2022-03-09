from re import L
from django.db import models
from ..constants import short_str_length , concept_names
import django.utils.timezone as timezone
from .constraints import perform_checks
import json
from django.contrib import admin
class Concept(models.Model):

	name = models.CharField(max_length = short_str_length)
	meta = models.CharField(max_length = short_str_length , choices = [ [x,x] for x in concept_names ])
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
	secret = models.BooleanField(default = True)

	def __str__(self):
		return self.get_title()
	
	@admin.display(description = "title")
	def get_title(self):
		'''这个方法效率极低，尽量避免调用。'''
		notitle = "<NoTitle: {0}>".format(self.id)
		if self.content.strip() == "":
			return notitle
		root = json.loads(self.content)
		if (root.get("parameters") is None) or (root["parameters"].get("title") is None):
			return notitle
		title = root["parameters"]["title"]
		if title.strip() == "":
			return notitle
		return title


	@admin.display(boolean = True, description = "public")
	def can_public_view(self):
		'''是否可以被公开看见'''
		if self.secret:
			return False
		if self.father:
			return self.father.can_public_view()
		return True

	def get_sons(self):
		'''返回所有子节点，包括自己。'''

		all_sons = set()
		for son in Node.objects.filter(father_id = self.id):
			all_sons = all_sons | son.get_sons()
		all_sons.add(self)
		return all_sons

	def get_all_concepts(self):
		'''收集自己到根的所有组件。'''
		ret = set(self.concepts.all())
		if self.father is not None:
			ret = ret | self.father.get_all_concepts()
		return ret

	def save(self , *args , **kwargs):

		# 不准保存 
		# TODO 加点提示信息啥的
		if not perform_checks(self):
			return 

		self.update_time = timezone.now()
		
		if self.father is not None:
			mine = set(self.concepts.all())
			fath = self.father.get_all_concepts()
			if len(fath - mine) > 0:
				for x in fath - mine:
					self.concepts.add(x)

		return super().save(*args , **kwargs)


class Comment(models.Model):
	content = models.TextField(default = "" , null = True , blank = True)
	name = models.CharField(max_length = short_str_length , default = "" , null = True , blank = True)
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "comments" , null = True)

# 存到 /MEDIA_ROOT/article_files/node_<id>/<filename> 这个文件下。
def upload_to(instance , filename):
	father_id = str(instance.father.id) if instance.father is not None else "-1"
	return "article_files/node_{father_id}/{filename}".format(father_id = father_id , filename = filename)

class Resource(models.Model):

	name = models.CharField(max_length = short_str_length)
	file = models.FileField( upload_to = upload_to )
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "files" , null = True)

	def __str__(self):
		return self.name
		