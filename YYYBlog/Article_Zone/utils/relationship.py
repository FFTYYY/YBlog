from Article_Zone.models import *
from .permission_manage import *

def 获取全部信息(request , 此节点 , 信息 = {} , depth = 1):
	'''获得k-跳以内的所有节点的信息'''
	if depth >= 4:
		return 信息
	if 信息.get(此节点.地址) is not None:
		return 信息 

	子节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 重排列(此节点.子)))
	祖先节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取祖先节点列表(此节点)))
	兄弟节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 获取兄弟节点列表(此节点)))

	信息[此节点.地址] = [[
		此节点,
		子节点列表,
		祖先节点列表,
		兄弟节点列表,
	]]

	for 子 in 子节点列表:
		信息 = 获取全部信息(request , 子 , 信息 , depth + 1)
	if 此节点.父:
		信息 = 获取全部信息(request , 此节点.父 , 信息 , depth)

		#父_子节点列表 = list(filter(lambda 点 : 节点许可查询(request , 点) , 重排列(此节点.父.子)))
		#for 兄 in 父_子节点列表:
		#	信息 = 获取全部信息(request , 兄 , 信息 , depth + 1)

	return 信息


def 重排列(列表):
	列表 = list(列表.order_by("排序依据").reverse())
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