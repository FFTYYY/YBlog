

def allow_acess(response_func):

    def warp_response_func(request , *args , **kwargs):
        response = response_func(request , *args , **kwargs)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response["Access-Control-Max-Age"] = "1000"
        response["Access-Control-Allow-Headers"] = "*"
        return response
    return warp_response_func