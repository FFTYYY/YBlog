from django.http import HttpResponse , JsonResponse , Http404, HttpRequest
import json
from ..models import Node , Comment , Resource , ConceptInstance
from ..constants import SHORT_STR_LENGTH
from .utils import debug_convenient , JSONDecode , must_login , node_can_view
from django import forms
import pdb
import os

FAIL = JsonResponse({"status": False})
SUCCESS = JsonResponse({"status": True})

#注意`debug_convenient`必须放在外面，否则debug时访问失败无法正确接收失败信息。
@debug_convenient
@must_login(FAIL)
def post_nodetree(request: HttpRequest , node_id: int):

	if request.body == b"":
		return JsonResponse({"status": False})

	nodetree = JSONDecode(request.body)["nodetree"]

	for my_id , father_id , idx_in_father , secret in nodetree:
		my_id = int(my_id)
		if my_id == node_id: # 豁免根节点
			continue

		node = Node.objects.get(id = my_id)
		if father_id == -1: 
			node.father = None
		else:
			node.father = Node.objects.get(id = father_id) 
		node.index_in_father = idx_in_father
		node.secret = secret
		node.save()

	return SUCCESS


@debug_convenient
@must_login(FAIL)
def post_node_content(request: HttpRequest, node_id: int): 
	
	if request.body == b"":
		return FAIL

	node = Node.objects.get(id = node_id)

	content = JSONDecode(request.body)["content"]
	node.content = json.dumps( content )
	node.save()

	return SUCCESS

@debug_convenient
@must_login(FAIL)
def post_generate_tldr(request: HttpRequest, node_id: int): 
	
	node = Node.objects.get(id = node_id)
	node.update_tldr()
	node.save()

	return SUCCESS


@debug_convenient
@must_login(FAIL)
def post_node_cache(request: HttpRequest, node_id: int): 
	
	if request.body == b"":
		return FAIL

	node = Node.objects.get(id = node_id)

	cache = JSONDecode(request.body)["cache"]
	node.cache = json.dumps( cache )

	node.concept_instants.delete() # 先删除所有跟自己有关的实例
	for instid, instcont in cache: # 先创建所有instance
		inst = ConceptInstance(concept_id = instid, node = node)
		inst.save()
	for instid, instcont in cache: # 再更新linkto
		linkto = instcont.get("linkto")
		if linkto is not None:
			inst = ConceptInstance.objects.get(instid = instid)
			targ = ConceptInstance.objects.get(instid = linkto)
			inst.linkto = targ
			inst.save()

	node.save()

	return SUCCESS

@debug_convenient
def post_node_comments(request: HttpRequest , node_id: int):

	if request.body == b"":
		return FAIL

	# 禁止向不可见的节点提交评论
	node = Node.objects.get(id = node_id)
	if not node_can_view(request , node):
		return FAIL
	
	data = JSONDecode(request.body)
	content = data["content"]
	name = data["name"]

	new_comment = Comment(content = content , name = name,  father_id = node_id)
	new_comment.save()

	return SUCCESS

@debug_convenient
@must_login(FAIL)
def post_upload_file(request: HttpRequest , node_id: int):

	if request.method != "POST":
		return FAIL
		
	file = request.FILES["file"]
	
	resource = Resource(name = file.name , file = file , father_id = node_id)
	resource.save()
	resource.name = os.path.basename(resource.file.name) #django会自动更名以防止冲突，这里将资源名改为django更名后的名称。
	resource.save()

	return SUCCESS

@debug_convenient
@must_login(FAIL)
def post_manage_resource(request: HttpRequest , resource_id: int):

	if request.method != "POST":
		return FAIL
	
	resource = Resource.objects.get(id = resource_id)

	file = request.FILES.get("file")

	if file is not None: # 这是一次修改文件
		resource.file = file # type: ignore
		resource.save()
	elif request.body != b"": # 这是一次修改文件名
		data = JSONDecode(request.body)
		name = data["name"]
		resource.name = name
		resource.save()
	else:
		return FAIL

	return SUCCESS

@debug_convenient
@must_login(FAIL)
def post_delete_resource(request: HttpRequest):

	if request.method != "POST":
		return FAIL
	
	if request.body != b"": # 删除文件
		data = JSONDecode(request.body)
		res_id = data["id"]
		resource = Resource.objects.get(id = res_id)
		resource.delete()
	else:
		return FAIL

	return SUCCESS