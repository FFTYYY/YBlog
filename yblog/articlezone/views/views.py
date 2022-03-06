from django.shortcuts import render
from django.http import HttpResponse , Http404
from .utils import debug_convenient , must_login

@debug_convenient
@must_login(Http404())
def edit_node_view(request , node_id):

    return render(request , "articlezone/article_editor_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
    })

@debug_convenient
@must_login(Http404())
def edit_nodetree_view(request , node_id = None):
    return render(request , "articlezone/nodetree_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
    })

@debug_convenient
def read_node_view(request , node_id = None):
    return render(request , "articlezone/article_viewer_index.html" , {
        "node_id": node_id , 
        "logged_in": request.user.is_authenticated , 
    })