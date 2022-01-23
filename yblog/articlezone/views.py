from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request , "articlezone/article_editor_index.html" , {})