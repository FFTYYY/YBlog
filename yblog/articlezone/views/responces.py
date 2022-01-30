from django.http import HttpResponse , JsonResponse
import json
from ..models import Node
from .utils import allow_acess
import pdb

@allow_acess
def get_node_content(request, node_id):
    node = Node.objects.get(id = node_id)
    return JsonResponse({
        "content": node.content.replace("'",'"')
    })


@allow_acess
def post_node_content(request, node_id):
    node = Node.objects.get(id = node_id)
    
    if request.body != b"":
        content = json.loads(request.body)["content"]

        node.content = content
        node.save()

    return JsonResponse({})

@allow_acess
def get_nodetree_info(request):
    return JsonResponse({
        "data": [ [x.id, x.father.id if x.father is not None else -1, x.index_in_father] for x in Node.objects.all()]
    })