from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node
from .utils import debug_convenient
import pdb

def JSONDecode(s):
    s = s.strip()
    if s == "":
        return {}
    return json.loads(s)

@debug_convenient
def get_node_components(request , node_id):
    node = Node.objects.get(id = node_id) 
    return JsonResponse({
        "components": [
            [c.name , c.meta , JSONDecode(c.fixed_params) , JSONDecode(c.default_params) , JSONDecode(c.extra_params)]
            for c in node.get_all_components()
        ]
    })

@debug_convenient
def get_node_content(request, node_id):
    node = Node.objects.get(id = node_id)
    content = node.content.strip()
    if content == "":
        content = json.dumps([])

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
def post_node_content(request, node_id):
    # 禁止未登录用户访问
    # if not request.user.is_authenticated:
    #     return Http404()

    flag = False

    node = Node.objects.get(id = node_id)
    
    if request.body != b"":
        content = JSONDecode(request.body)["content"]
        node.content = json.dumps( content )
        node.save()
        flag = True

    return JsonResponse({"status": flag})

@debug_convenient
def get_nodetree_info(request , node_id):

    if node_id == 0:
        lis = Node.objects.all()
    else:
        lis = Node.objects.get(id = node_id).get_sons()

    return JsonResponse({
        "data": [ [x.id, x.father.id if x.father is not None else -1, x.index_in_father] for x in lis]
    })

@debug_convenient
def post_nodetree_info(request , node_id):

    if request.body == b"":
        return JsonResponse({"status": False})

    nodetree = JSONDecode(request.body)["nodetree"]

    for my_id , father_id , idx_in_father in nodetree:
        if my_id == node_id: # 豁免根节点
            continue
        node = Node.objects.get(id = my_id)
        node.father = Node.objects.get(id = father_id)
        node.index_in_father = idx_in_father
        node.save()

    return JsonResponse({"status": True})
    