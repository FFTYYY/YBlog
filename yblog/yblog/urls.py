"""yblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.conf.urls.static import static
from .settings import MEDIA_ROOT , MEDIA_URL , STATIC_URL , STATIC_ROOT

urlpatterns = [
    path("" , include("articlezone.urls")) , 
    path("admin/", admin.site.urls),
]


from django.conf import settings
# 强迫Django Serve这些资源
OLD_DEBUG = settings.DEBUG
settings.DEBUG = True
urlpatterns = urlpatterns + static(MEDIA_URL , document_root = MEDIA_ROOT) 
urlpatterns = urlpatterns + static(STATIC_URL , document_root = STATIC_ROOT)
settings.DEBUG = OLD_DEBUG