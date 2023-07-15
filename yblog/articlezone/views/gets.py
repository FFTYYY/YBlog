from django.http import HttpResponse , JsonResponse , Http404, HttpRequest
import json
from ..models import Node , Comment , Resource, Concept, ConceptInstance
from .utils import debug_convenient , JSONDecode , node_can_view
import pdb

@debug_convenient
def get_conceptins_location(request: HttpRequest , concept_id: int):
	'''查询编号为`concept_id`的概念所在的文章编号。'''
	
	try:
		concept = ConceptInstance.objects.get(concept_id = concept_id) 
	except ConceptInstance.DoesNotExist:
		return JsonResponse({
			"node_id": -1
		}) 
	node_id = concept.node.id

	return JsonResponse({
		"node_id": node_id
	})

@debug_convenient
def get_referenced_by(request: HttpRequest , concept_id: int):
	'''查询编号为`concept_id`的所有被引用实例。'''
	
	try:
		concept = ConceptInstance.objects.get(concept_id = concept_id) 
	except ConceptInstance.DoesNotExist:
		return JsonResponse({
			"referenced_by": []
		}) 

	referenced_by = [[x.node.id, x.concept_id] for x in concept.referenced_by.all()]

	return JsonResponse({
		"referenced_by": referenced_by
	})


@debug_convenient
def get_node_concepts(request: HttpRequest , node_id: int):

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	return JsonResponse({
		"concepts": node.get_all_concepts()
	})


@debug_convenient
def get_node_comments(request: HttpRequest , node_id: int):

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	return JsonResponse({
		"comments": [
			[c.content , c.name]
			for c in node.comments.all()
		]
	})

@debug_convenient
def get_node_content(request, node_id) -> HttpResponse:

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	content = node.content.strip()
	if content == "":
		content = json.dumps(None)

	return JsonResponse({
		"content": JSONDecode( content ) # TODO 为什么不让前端decode呢....
	})

@debug_convenient
def get_node_cache(request, node_id):
	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	cache = node.cache.strip()
	if cache == "":
		cache = json.dumps(None)

	return JsonResponse({
		"cache": JSONDecode( cache )
	})

@debug_convenient
def get_node_create_time(request , node_id):
	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	create_time = node.create_time.strftime("%Y / %m / %d")
	modify_time = node.update_time.strftime("%Y / %m / %d")

	return JsonResponse({
		"create_time": create_time , 
		"modify_time": modify_time , 
	})

@debug_convenient
def get_node_tldr(request , node_id):
	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	return JsonResponse({
		"tldr": node.tldr , 
	})

@debug_convenient
def get_node_visibility(request , node_id):
	node = Node.objects.get(id = node_id) 
	if not node_can_view(request , node):
		raise Http404()

	return JsonResponse({
		"visibility": {
			"secret": node.secret , 
			"indiscriminate_provider": node.indiscriminate_provider , 
		}
	})

@debug_convenient
def get_indiscriminates(request , node_id):

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

	lis = node.gather_indiscriminates()

	return JsonResponse({
		"indiscriminates": [ 
			x.id for x in lis if node_can_view(request , x) # 只返回能被看见的节点的信息
		]
	})

@debug_convenient
def get_nodetree(request , node_id):

	if node_id == 0:
		lis = Node.objects.all()
	else:
		try:
			node = Node.objects.get(id = node_id) 
		except Node.DoesNotExist:
			raise Http404()

		lis = node.get_sons()
		
	lis = list(lis)
	lis.sort(key = lambda nd: nd.index_in_father)
	
	return JsonResponse({
		"data": [ 
			[
				x.id, 
				x.father.id if x.father is not None else -1, 
				x.index_in_father , 
				x.secret ,
			] 
			for x in lis
			if node_can_view(request , x) # 只返回能被看见的节点的信息
		]
	})

@debug_convenient
def get_nodetree_shallow(request , node_id):
	if node_id == 0:
		node_id = 1

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	lis = list( node.get_sons(2) )
	lis.sort(key = lambda nd: nd.index_in_father)
	
	return JsonResponse({
		"data": [ 
			[
				x.id, 
				x.father.id if x.father is not None else -1, 
				x.index_in_father , 
				x.secret ,
			] 
			for x in lis
			if node_can_view(request , x) # 只返回能被看见的节点的信息
		]
	})

@debug_convenient
def get_node_resources(request , node_id):

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()
	
	if not node_can_view(request , node):
		raise Http404()

	return JsonResponse({
		"resources": [
			[s.id , s.name , s.file.url]
			for s in node.files.all()
		]
	})
@debug_convenient
def get_node_resource_info(request , node_id):
	'''给定一个资源文件的和所在节点和名称，查询其`url`。'''

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()

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

@debug_convenient
def get_node_son_ids(request , node_id):
	'''询问一个节点的全体子节点，但是只有可见的能被看到。'''
	if node_id <= 0:
		lis = Node.objects.filter(father = None)
	else:
		lis = Node.objects.filter(father_id = node_id)
		
	lis = list(lis)
	lis.sort(key = lambda nd: nd.index_in_father)

	# 只返回能被看见的节点的信息
	return JsonResponse({
		"son_ids": [ x.id for x in lis if node_can_view(request , x) ]
	})

@debug_convenient
def get_node_father_id(request , node_id):
	'''询问一个节点的父节点'''

	try:
		node = Node.objects.get(id = node_id) 
	except Node.DoesNotExist:
		raise Http404()

	if not node_can_view(request , node):
		raise Http404()
	# 如果节点可见，那么其父节点也一定可见，因此无需额外判断。

	
	# 只返回能被看见的节点的信息
	return JsonResponse({
		"father_id": node.father.id if node.father is not None else -1
	})
