from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node , Comment
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

    print (create_time , modify_time)

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
    