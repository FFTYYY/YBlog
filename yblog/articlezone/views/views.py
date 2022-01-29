from django.shortcuts import render
from django.http import HttpResponse
from .utils import allow_acess

@allow_acess
def node_view(request , node_id):
    print (request.method)
    print (request.POST)
    print (request.body)
    print (request.GET)
    print ("---------")
    return render(request , "articlezone/article_editor_index.html" , {
        "node_id": node_id , 
    })
