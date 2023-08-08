from django.shortcuts import render
from django.http import HttpResponse , Http404
from .utils import debug_convenient , must_login , allow_iframe

@debug_convenient
@must_login(Http404())
def edit_node_view(request , node_id):

    linkto = request.GET.get("linkto") # 渲染之后立刻跳转

    return render(request , "articlezone/article_editor_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
        "linkto": linkto , 
    })

@debug_convenient
@must_login(Http404())
def edit_nodetree_view(request , node_id = None):

    return render(request , "articlezone/nodetree_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
    })

@debug_convenient
@must_login(Http404())
def edit_nodetree_shallow_view(request , node_id = None):

    return render(request , "articlezone/nodetree_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
        "shallow": True , 
    })

@debug_convenient
def read_node_view(request , node_id = None):

    linkto = request.GET.get("linkto")

    return render(request , "articlezone/article_viewer_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
        "linkto": linkto , 
    })

@debug_convenient
@allow_iframe
def read_node_pure_view(request , node_id = None):

    linkto = request.GET.get("linkto")

    return render(request , "articlezone/pure_printer_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
        "linkto": linkto , 
    })

@debug_convenient
@allow_iframe
def test_unity_view(request):

    return render(request , "articlezone_unity/index.html")
