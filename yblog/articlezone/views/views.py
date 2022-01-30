from django.shortcuts import render
from django.http import HttpResponse
from .utils import allow_acess

@allow_acess
def node_view(request , node_id):
    return render(request , "articlezone/article_editor_index.html" , {
        "node_id": node_id , 
    })

@allow_acess
def nodetree_view(request):
    return render(request , "articlezone/nodetree_index.html" , {})