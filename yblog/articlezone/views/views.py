from django.shortcuts import render
from django.http import HttpResponse , Http404
from .utils import debug_convenient

@debug_convenient
def edit_node_view(request , node_id):

    # 禁止未登录用户访问
    if not request.user.is_authenticated:
        return Http404()

    return render(request , "articlezone/article_editor_index.html" , {
        "node_id": node_id , 
    })

@debug_convenient
def edit_nodetree_view(request , node_id = None):
    return render(request , "articlezone/nodetree_index.html" , {})