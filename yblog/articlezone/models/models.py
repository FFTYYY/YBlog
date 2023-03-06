from re import L
from django.db import models
from ..constants import SHORT_STR_LENGTH 
import django.utils.timezone as timezone
import json
from django.contrib import admin

class Concept(models.Model):
	content = models.TextField(default = "", blank = True)

	def __str__(self):
		if self.node != None:
			return "Concept Attached to Node {0}".format( [x.id for x in self.node.all()] )
		return "Concept {0}".format(self.id)

class Node(models.Model):
	father = models.ForeignKey("self", on_delete = models.SET_NULL , null = True , blank = True , related_name = "son")
	index_in_father = models.IntegerField(default = 0)

	content  = models.TextField(default = "", blank = True)
	cache    = models.TextField(default = "", blank = True)
	concept_def  = models.ForeignKey(Concept, on_delete = models.SET_NULL , null = True , blank = True , related_name = "node")
	tldr 	 = models.TextField(default = "", blank = True) # 摘要...

	create_time = models.DateTimeField(default = timezone.now)
	update_time = models.DateTimeField(default = timezone.now)
	secret = models.BooleanField(default = True)

	indiscriminate_provider = models.BooleanField(default = False) # 这个节点将要被杂陈展示
	indiscriminate_consumer = models.BooleanField(default = False) # 这个节点杂陈展示其子节点中要被杂陈展示者

	def __str__(self):
		return self.get_title()
	
	@admin.display(description = "title")
	def get_title(self):
		'''这个方法效率极低，尽量避免调用。'''
		notitle = "<NoTitle: {0}>".format(self.id)
		if self.content.strip() == "":
			return notitle

		root = json.loads(self.content)
		try:
			if (root.get("parameters") is None) or (root["parameters"].get("title") is None) or \
					(root["parameters"]["title"].get("val") is None):
				return notitle
		except AttributeError: 
			return notitle
		title = root["parameters"]["title"]["val"]
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

	def get_sons(self , max_depth = 999):
		'''返回所有子节点，包括自己。'''
		if max_depth < 0:
			return set()

		all_sons = set()
		for son in Node.objects.filter(father_id = self.id):
			all_sons = all_sons | son.get_sons(max_depth - 1)
		all_sons.add(self)
		return all_sons

	def get_all_concepts(self):
		'''收集自己到根的所有组件。'''
		ret = []
		if self.concept_def:
			ret = [self.concept_def.content]
		if self.father is not None:
			ret = ret + self.father.get_all_concepts()
		return list( filter(lambda x: len(x) > 0 , ret) )

	def save(self , *args , **kwargs):

		self.update_time = timezone.now()
	
		return super().save(*args , **kwargs)



class Comment(models.Model):
	content = models.TextField(default = "" , null = True , blank = True)
	name = models.CharField(max_length = SHORT_STR_LENGTH , default = "" , null = True , blank = True)
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "comments" , null = True)

# 存到 /MEDIA_ROOT/article_files/node_<id>/<filename> 这个文件下。
def upload_to(instance , filename):
	father_id = str(instance.father.id) if instance.father is not None else "-1"
	return "article_files/node_{father_id}/{filename}".format(father_id = father_id , filename = filename)

class Resource(models.Model):

	name = models.CharField(max_length = SHORT_STR_LENGTH)
	file = models.FileField( upload_to = upload_to )
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "files" , null = True)

	def __str__(self):
		return self.name
		