from django.contrib import admin
from .models import Node , Component


class NodeAdmin(admin.ModelAdmin):
    pass

class ComponentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Node      , NodeAdmin      )
admin.site.register(Component , ComponentAdmin)
