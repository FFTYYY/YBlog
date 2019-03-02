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
	return 父.子.order_by("排序依据")


def 节点深度(点 , cut_len = -1):
	列表 = 获取祖先节点列表(点)
	长度 = len(列表) + 1
	if cut_len > 0 and 长度 > cut_len:
		长度 = cut_len + 1
	return 长度