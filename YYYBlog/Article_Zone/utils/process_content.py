def 处理转义(内容):
	return 内容.replace("\\" , "\\\\").replace("'" , "\\'").replace("\"" , "\\\"") #替换转移字符
