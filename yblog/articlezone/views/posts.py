from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node , Comment , Resource
from ..constants import short_str_length
from .utils import debug_convenient , JSONDecode , must_login , node_can_view
from django import forms
import pdb

FAIL = JsonResponse({"status": False})
SUCCESS = JsonResponse({"status": True})

#注意`debug_convenient`必须放在外面，否则debug时访问失败无法正确接收失败信息。
@debug_convenient
@must_login(FAIL)
def post_nodetree(request , node_id):

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
def post_node_content(request, node_id):

	if request.body == b"":
		return FAIL

	node = Node.objects.get(id = node_id)

	content = JSONDecode(request.body)["content"]
	node.content = json.dumps( content )
	node.save()

	return SUCCESS

@debug_convenient
def post_node_comments(request , node_id):

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
def post_upload_file(request , node_id):

	if request.method != "POST":
		return FAIL
		
	file = request.FILES["file"]
	
	resource = Resource(name = file.name , file = file , father_id = node_id)
	resource.save()

	return SUCCESS

@debug_convenient
@must_login(FAIL)
def post_manage_resource(request , resource_id):

	if request.method != "POST":
		return FAIL
	
	resource = Resource.objects.get(id = resource_id)

	file = request.FILES.get("file")

	if file is not None: # 这是一次修改文件
		resource.file = file
		resource.save()
	elif request.body != b"": # 这是一次修改文件名
		data = JSONDecode(request.body)
		name = data["name"]
		resource.name = name
		resource.save()
	else:
		return FAIL

	return SUCCESS