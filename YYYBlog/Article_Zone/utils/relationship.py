from Article_Zone.models import *

def 获取祖先节点列表(节点):
	列表 = []
	while True:
		父 = 节点.父
		if not 父:
			break
		列表.append(父)
		节点 = 父
	return 列表

def 获取兄弟节点列表(节点):
	父 = 节点.父
	if not 父:
		return []
	return 父.子.all()