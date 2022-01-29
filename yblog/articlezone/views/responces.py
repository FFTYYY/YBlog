from django.http import HttpResponse , JsonResponse

def get_node(request, id):
    return JsonResponse({
        "node_id": id
    })
