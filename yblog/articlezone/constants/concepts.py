__all__ = ["CONCEPT_METAS"]

univ_lab = {
    "label": "显示的名称" , 
}
w_univ_par = {"prefix": "" , "suffix": "" , "title": "" , "close": "", "ordering": True} 

w_univ_lab = {
    ** univ_lab , 
    "prefix": "文本前缀" , 
    "suffix": "文本后缀" , 
    "title": "入" , 
    "close": "出" , 
    "ordering": "（true / false）是否开启编号"
}

CONCEPT_METAS = {
    "昭言"   : [ { "label": "昭言" , **w_univ_par} , {**w_univ_lab} ] , 
    "常言"   : [ { "label": "常言" , **w_univ_par} , {**w_univ_lab} ] , 
    "随言"   : [ { "label": "随言" , **w_univ_par} , {**w_univ_lab} ] , 
    "属言"   : [ { "label": "属言" , **w_univ_par} , {**w_univ_lab}] , 
    "齐言"   : [ 
        { "label": "齐言" , **w_univ_par , "widths": "1"} , 
        {**w_univ_lab , "widths": "（相对）宽度列表，用逗号分隔"} , 
    ] , 
    "穆言"   : [ {} , {} ] , 
    "数学言" : [ 
        { "label": "数学" , **w_univ_par, "environ": "align"} , 
        {**w_univ_lab} , 
    ] , 
    "裱示"   : [ { "label": "裱示" , **w_univ_par } , {**w_univ_lab} ] , 
    "彰示"   : [ { "label": "彰示" , **w_univ_par } , {**w_univ_lab} ] , 
    "格示"   : [ { "label": "格示" , **w_univ_par } , {**w_univ_lab} ] , 
    "强调"   : [ { "label": "强调" } , {**univ_lab} ] , 
    "刊调"   : [ { "label": "刊调" } , {**univ_lab} ] , 
    "链调"   : [ 
        { "label": "链接" , "target": "" , "type": False} , 
        { **univ_lab , "target": "如何查找目标" , "type": "目标格式（ index / outer-index / http ）" }
    ] , 
    "图调"   : [ 
        { "label": "图片" , "target": "" , "type": "internal" , "width": 10 , "height": -1} , 
        {**univ_lab , "target": "如何查找目标" , "type": "目标格式（ internal / http ）" , "width": "图片宽度（rem）" , "height": "图片高度（rem）"}  , 
        { "forceInline": True }
    ] , 
    "数学调" : [ { "label": "数学"} , {**univ_lab} ] , 
    "新段"   : [ { } ] , 
    "次节"   : [ { "title": "" } ] , 
    "小节线" : [ { "title": "" , "alone": False , } ] , 
    "章节线" : [ { } ] , 
}
