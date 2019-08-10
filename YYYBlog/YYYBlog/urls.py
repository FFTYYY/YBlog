"""YYYBlog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path , include
import Entry.models
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
	path('入口/', include('Entry.urls')),
	path('admin/', admin.site.urls),
	path('ckeditor/', include('ckeditor_uploader.urls')),
	url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
]

#try:
for zone in Entry.models.空间.objects.all():
	urlpatterns.append( path(zone.地址 + "/", include(zone.位置 + ".urls")) )
#except Exception:
#	pass

#urlpatterns.append( path('<str:输入>/', Entry.views.index) )
urlpatterns.append( path('', Entry.views.index) )
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)