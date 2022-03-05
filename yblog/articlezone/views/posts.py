from django.http import HttpResponse , JsonResponse , Http404
import json
from ..models import Node , Comment , Resource
from ..constants import short_str_length
from .utils import debug_convenient , JSONDecode
from django import forms
import pdb

FAIL = JsonResponse({"status": False})
SUCCESS = JsonResponse({"status": True})

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

    return SUCCESS



@debug_convenient
def post_node_content(request, node_id):
    # 禁止未登录用户访问
    # if not request.user.is_authenticated:
    #     return Http404()

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

    
    data = JSONDecode(request.body)
    content = data["content"]
    name = data["name"]

    new_comment = Comment(content = content , name = name,  father_id = node_id)
    new_comment.save()

    return SUCCESS

@debug_convenient
def post_upload_file(request , node_id):

    if request.method != "POST":
        return FAIL
        
    file = request.FILES["file"]
    
    resource = Resource(name = str(file) , file = file , father_id = node_id)
    resource.save()

    return SUCCESS