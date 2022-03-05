from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node , Comment , Resource
from .utils import debug_convenient , JSONDecode
import pdb

@debug_convenient
def get_node_concepts(request , node_id):
	node = Node.objects.get(id = node_id) 
	return JsonResponse({
		"concepts": [
			[c.name , c.meta , JSONDecode(c.fixed_params) , JSONDecode(c.default_params) , JSONDecode(c.extra_params)]
			for c in node.get_all_concepts()
		]
	})

@debug_convenient
def get_node_comments(request , node_id):
	node = Node.objects.get(id = node_id) 
	return JsonResponse({
		"comments": [
			[c.content , c.name]
			for c in node.comments.all()
		]
	})

@debug_convenient
def get_node_content(request, node_id):
	
	node = Node.objects.get(id = node_id)
	content = node.content.strip()
	if content == "":
		content = json.dumps(None)

	return JsonResponse({
		"content": JSONDecode( content )
	})

@debug_convenient
def get_node_create_time(request , node_id):
	node = Node.objects.get(id = node_id)
	create_time = node.create_time
	modify_time = node.update_time

	return JsonResponse({
		"create_time": create_time , 
		"modify_time": modify_time , 
	})

@debug_convenient
def get_nodetree(request , node_id):

	if node_id == 0:
		lis = Node.objects.all()
	else:
		lis = Node.objects.get(id = node_id).get_sons()
	
	return JsonResponse({
		"data": [ [x.id, x.father.id if x.father is not None else -1, x.index_in_father] for x in lis]
	})
	
@debug_convenient
def get_node_resources(request , node_id):

	node = Node.objects.get(id = node_id)

	return JsonResponse({
		"resources": [
			[s.id , s.name , s.file.url]
			for s in node.files.all()
		]
	})
@debug_convenient
def get_node_resource_info(request , node_id):

	resource_name = request.GET.get("name")
	resources = []
	
	if resource_name != None:
		resources = Resource.objects.filter(father_id = node_id , name = resource_name)

	if len(resources) == 0:
		return JsonResponse({
			"id": -1 , 
			"url": "" , 
		})

	resource = resources[0]

	return JsonResponse({
		"id": resource.id , 
		"url": resource.file.url , 
	})
