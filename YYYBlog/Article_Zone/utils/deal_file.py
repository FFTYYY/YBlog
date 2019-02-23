def get_file_name_目标节点(目标节点 , 文件名):

	位置 = "Article_Zone/article_sources/"
	if 目标节点 is None:
		位置 += "univ/"
	else: 位置 += str(目标节点.id) + "/"
	位置 += 文件名
	return 位置


def get_file_name(对象 , 文件名):
	if 对象.文件名:
		文件名 = 对象.文件名

	目标节点 = 对象.目标节点
	return get_file_name_目标节点(目标节点 , 文件名)

