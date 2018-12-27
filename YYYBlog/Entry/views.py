from django.http import HttpResponse , Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from .models import 空间
import django.http as http

def index(request):
	return http.HttpResponseRedirect("/文章")

	ctx = {}
	ctx["Zones"] = 空间.objects.all()
	return render(request,"Entry/index.html",ctx)

def default(request , 输入 = ""):
	return http.HttpResponseRedirect("/文章")
