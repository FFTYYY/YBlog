from Article_Zone.models import *

def 重排列(列表):
	列表 = list(列表.order_by("排序依据"))
	集 = [x for x in filter(lambda x:x.节点类型==1,列表)]
	文 = [x for x in filter(lambda x:x.节点类型==0,列表)]

	spl = [节点(名="SPLIT",节点类型=3)]
	if len(文) == 0:
		return 集
	if len(集) == 0:
		return 文
	return 集+spl+文

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
	return 重排列(父.子)


def 节点深度(点 , cut_len = -1):
	列表 = 获取祖先节点列表(点)
	长度 = len(列表) + 1
	if cut_len > 0 and 长度 > cut_len:
		长度 = cut_len + 1
	return 长度