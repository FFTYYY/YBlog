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
    print (node.content)
    print (JSONDecode( node.content ))
    return JsonResponse({
        "content": JSONDecode( node.content )
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
def get_nodetree_info(request):
    return JsonResponse({
        "data": [ [x.id, x.father.id if x.father is not None else -1, x.index_in_father] for x in Node.objects.all()]
    })