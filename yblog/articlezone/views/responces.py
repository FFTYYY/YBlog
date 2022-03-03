from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node , Comment
from .utils import debug_convenient
import pdb

def JSONDecode(s):
    s = s.strip()
    if s == "":
        return {}
    return json.loads(s)

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
def post_node_comments(request , node_id):
    flag = False
    
    if request.body != b"":
        data = JSONDecode(request.body)
        content = data["content"]
        name = data["name"]

        new_comment = Comment(content = content , name = name,  father_id = node_id)
        new_comment.save()
        flag = True

    return JsonResponse({"status": flag})


@debug_convenient
def post_node_content(request, node_id):
    # 禁止未登录用户访问
    # if not request.user.is_authenticated:
    #     return Http404()

    print (request)
    import pdb
    pdb.set_trace()

    flag = False

    node = Node.objects.get(id = node_id)
    
    if request.body != b"":
        content = JSONDecode(request.body)["content"]
        node.content = json.dumps( content )
        node.save()
        flag = True

    return JsonResponse({"status": flag})

@debug_convenient
def get_nodetree(request , node_id):

    print ("aaaa")

    if node_id == 0:
        lis = Node.objects.all()
    else:
        lis = Node.objects.get(id = node_id).get_sons()
    
    return JsonResponse({
        "data": [ [x.id, x.father.id if x.father is not None else -1, x.index_in_father] for x in lis]
    })

@debug_convenient
def post_nodetree(request , node_id):

    if request.body == b"":
        return JsonResponse({"status": False})

    nodetree = JSONDecode(request.body)["nodetree"]

    for my_id , father_id , idx_in_father in nodetree:
        my_id = int(my_id)
        if my_id == node_id: # 豁免根节点
            continue

        node = Node.objects.get(id = my_id)
        if father_id == -1: 
            node.father = None
        else:
            node.father = Node.objects.get(id = father_id)
        node.index_in_father = idx_in_father
        node.save()

    return JsonResponse({"status": True})
    