import json
from django.http import HttpResponse , JsonResponse , Http404
from django.conf import settings 

def node_can_view(request , node):
    '''判断一个节点是否可以输出到前端。如果已经登录，则输出true，否则根据model的secret属性而定。'''
    if settings.DEBUG:
        return True
    return request.user.is_authenticated or node.can_public_view()

def must_login(fail_return = Http404()):
    '''这个包装器确保一个函数只能在用户已经登录的情况下调用。'''
    def _must_login(response_func):
        def warp_response_func(request , *args , **kwargs):
            if (not settings.DEBUG) and (not request.user.is_authenticated):
                return fail_return
            return response_func(request , *args , **kwargs)
        return warp_response_func
    return _must_login


def debug_convenient(response_func):
    '''这个包装器在DEBUG时开启跨域访问。'''
    def warp_response_func(request , *args , **kwargs):
        response = response_func(request , *args , **kwargs)

        if settings.DEBUG:
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
            response["Access-Control-Max-Age"] = "1000"
            response["Access-Control-Allow-Headers"] = "*"
        return response
    return warp_response_func


def JSONDecode(s):
    s = s.strip()
    if s == "":
        return {}
    return json.loads(s)
