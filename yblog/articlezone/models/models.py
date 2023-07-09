from typing import Any
from django.db import models
from django.db.models.manager import BaseManager
from django.contrib import admin
import django.utils.timezone as timezone
import django as que
from ..constants import SHORT_STR_LENGTH 
import json
from .chatgpt import generate_tldr
import time

class Concept(models.Model):
	content = models.TextField(default = "", blank = True)
	node: BaseManager["Node"]
	id: int

	def __str__(self):
	
		if self.node != None:
			return "Concept Attached to Node {0}".format( [x.id for x in self.node.all()] )
		return "Concept {0}".format(self.id)


class ConceptInstance(models.Model):
	'''这个类用来记录所有概念的实例所在的页面'''
	id: int
	referenced_by: BaseManager["ConceptInstance"]

	# 这个概念的全局唯一编号。
	concept_id  = models.IntegerField(default = 0)

	# 这个组件所在的节点。
	node    	= models.ForeignKey("Node", on_delete = models.CASCADE, related_name = "concept_instants")

	# 这个组件引用了谁。一个组件只能引用一个人。
	linkto      = models.ForeignKey["ConceptInstance"](
		"self", 
		null = True, 
		on_delete = models.SET_NULL, 
		related_name = "referenced_by"
	)

	def __str__(self):
		return "Concept Instance -" + str(self.concept_id)



class Node(models.Model):
	id				: int
	comments		: BaseManager["Comment"]
	files			: BaseManager["Resource"]
	concept_instants: BaseManager[ConceptInstance]
	father			: models.ForeignKey

	father 			= models.ForeignKey(
		"self", 
		on_delete = models.SET_NULL , 
		null = True , 
		blank = True , 
		related_name = "son"
	)
	index_in_father = models.IntegerField(default = 0)

	content  		= models.TextField(default = "", blank = True)
	cache    		= models.TextField(default = "", blank = True)
	concept_def  	= models.ForeignKey(
		Concept, 
		on_delete = models.SET_NULL , 
		null = True , 
		blank = True , 
		related_name = "node"
	)
	tldr 	 		= models.TextField(default = "", blank = True, null = True) # 摘要...
	tldr_updatetime = models.IntegerField(default = 0) # 摘要更新时间

	create_time = models.DateTimeField(default = timezone.now)
	update_time = models.DateTimeField(default = timezone.now)
	secret = models.BooleanField(default = True)

	indiscriminate_provider = models.BooleanField(default = False) # 这个节点将要被杂陈展示
	indiscriminate_consumer = models.BooleanField(default = False) # 这个节点杂陈展示其子节点中要被杂陈展示者

	def __str__(self):
		return self.get_title()
	
	@admin.display(description = "title")
	def get_title(self) -> str:
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
	def can_public_view(self) -> bool:
		'''是否可以被公开看见'''
		if self.secret:
			return False
		if self.father:
			return self.father.can_public_view()
		return True

	def gather_indiscriminates(self) -> list["Node"]:
		'''收集子树中所有的indiscriminate_provider节点'''
		if not self.indiscriminate_consumer: # 自己必须是consumer才能提供indiscriminate_provider信息
			return []
		sons = list(filter(lambda x: x.indiscriminate_provider, self.get_sons()))
		return sons


	def get_sons(self , max_depth = 999) -> set["Node"]:
		'''返回所有子节点，包括自己。'''
		if max_depth < 0:
			return set()

		all_sons = set()
		for son in Node.objects.filter(father_id = self.id): 
			all_sons = all_sons | son.get_sons(max_depth - 1)
		all_sons.add(self)
		return all_sons

	def get_all_concepts(self) -> list[str]:
		'''收集自己到根的所有组件。'''
		ret = []
		if self.concept_def:
			ret = [self.concept_def.content]
		if self.father is not None:
			ret = ret + self.father.get_all_concepts()
		return list( filter(lambda x: len(x) > 0 , ret) )

	def update_tldr(self) -> bool:
		'''更新摘要'''
		
		now_time = int( time.time() )
		new_tldr = generate_tldr(self)
		if new_tldr is not None and new_tldr.strip() != "":
			self.tldr = new_tldr
			self.tldr_updatetime = now_time
			return True
		return False

	def save(self , *args , **kwargs):

		flag_new = (self.update_time == self.create_time) # 是否是新建的节点

		self.update_time = timezone.now()

		# <del>自动更新tldr</del>
		# 自动更新个鬼
		# now_time = int( time.time() )
		# flag = self.tldr_updatetime > 0 # 防止对空文章生成tldr
		# flag = flag and (self.tldr is not None)
		# flag = flag and (self.tldr != "")
		# if flag and now_time - self.tldr_updatetime > 864000: # 10天更新一次。
		# 	self.update_tldr()

		# 自动确定 index in father
		if flag_new and self.father:
			father = self.father
			bros = [x.index_in_father for x in Node.objects.filter(father_id = father.id)]
			min_iif = min(bros) if len(bros) > 0 else 0
			self.index_in_father = min_iif - 1
	
			
		return super().save(*args , **kwargs)

class Comment(models.Model):
	id: int

	content = models.TextField(default = "" , null = True , blank = True)
	name 	= models.CharField(max_length = SHORT_STR_LENGTH , default = "" , null = True , blank = True)
	father 	= models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "comments" , null = True)

# 存到 /MEDIA_ROOT/article_files/node_<id>/<filename> 这个文件下。
def upload_to(instance , filename):
	father_id = str(instance.father.id) if instance.father is not None else "-1"
	return "article_files/node_{father_id}/{filename}".format(father_id = father_id , filename = filename)

class Resource(models.Model):
	id: int

	name = models.CharField(max_length = SHORT_STR_LENGTH)
	file = models.FileField( upload_to = upload_to )
	father = models.ForeignKey(Node , on_delete = models.SET_NULL , related_name = "files" , null = True)

	def __str__(self):
		return self.name
		