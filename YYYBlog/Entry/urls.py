from django.urls import path
from . import views

app_name = "Entry"

urlpatterns = [
	path("getcookie" , views.get_cookie),
	path("" , views.index),
]