from django.urls import path
from . import views

app_name = "Entry"

urlpatterns = [
	path("" , views.index),
	path("getcookie" , views.get_cookie),
]