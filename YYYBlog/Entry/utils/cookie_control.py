import random

def make_cookie_value(length = 20):
	lis = ["%d" % (random.randint(0,9)) for i in range(length)]
	return "".join(lis)

def set_cookie_访问者(人 , response , domain = "127.0.0.1"):
	response.set_cookie(
		key = "YYYBLOG_VISITOR" ,
		value = 人.cookie_value ,
		max_age = 60 * 60 * 24 * 365 * 100 , #每过一百年就得重新获取一次
		#domain =  domain,
		#path = "/" , 
	)
