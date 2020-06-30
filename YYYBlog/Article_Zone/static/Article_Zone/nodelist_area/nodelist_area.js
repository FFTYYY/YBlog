/*
	每个 .node-list-area 元素的 active_level 属性用来确定他们是第几层表
	nodelist_area.levels是一个字典，用来保存每级active level目前是哪个元素，如果为空，说明没有元素
	任何元素想要被创建，必须先存入nodelist_area.levels中（弹出之前元素）
	用这种方式来保证任何时候每个层次只有一个表
*/

nodelist_area = {
	levels: {} , 
}

