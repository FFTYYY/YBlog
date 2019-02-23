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
#from .Entry.models import Zone 
import Entry.models
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('入口/', include('Entry.urls')),
	path('admin/', admin.site.urls),
]

if settings.DEBUG == True:
	for zone in Entry.models.空间.objects.all():
		urlpatterns.append( path(zone.地址 + "/", include(zone.位置 + ".urls")) )
else:
	try:
		for zone in Entry.models.空间.objects.all():
			urlpatterns.append( path(zone.地址 + "/", include(zone.位置 + ".urls")) )
	except Exception:
		pass

urlpatterns.append( path('<str:输入>/', Entry.views.default , name = "default") )
urlpatterns.append( path('', Entry.views.default , name = "default") )
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)