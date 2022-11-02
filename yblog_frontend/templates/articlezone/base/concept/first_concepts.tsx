import {
	Printer ,
	PrinterComponent ,
	FirstClassConcept , 
	SecondClassConcept ,  
    ParameterValue ,
    ParameterList , 
} from "@ftyyy/ytext"

export {
    first_concepts , 

    brightwords_style , 
	followwords_style , 
	subwords_style , 
	mathblock_style , 
	mount_style , 
	display_style , 
	formatted_style , 
	subsection_style , 
	strong_style , 
	delete_style , 
	link_style , 
	mathinline_style , 
	image_style , 
	ender_style , 
    sectioner_style , 
    alignedwords_style , 
    dimwords_style , 
    showchildren_style , 
    insertchildren_style , 
}

/** 自动添加type */
function make_param(parameters: ParameterList<ParameterValue | string | number | boolean>): ParameterList{
    let ret: ParameterList = {}
    for(let x in parameters){
        if(typeof parameters[x] == "string"){
            ret[x] = {
                type: "string" as "string" , 
                val : parameters[x] , 
            } as ParameterValue
        }
        else if(typeof parameters[x] == "number"){
            ret[x] = {
                type: "number" as "number", 
                val : parameters[x] , 
            } as ParameterValue
        }
        else if(typeof parameters[x] == "boolean"){
            ret[x] = {
                type: "boolean" as "boolean", 
                val : parameters[x] , 
            } as ParameterValue
        }
        else 
            ret[x] = parameters[x] as ParameterValue
    }
    return ret
}

/**
 * 关于`title`和`prefix`：`title`是附着在文本之外的，`prefix`则是文本的开头而已。
 */
var words_params = {
    prefix: "", 
    suffix: "", 
    title:  "", 
    close:  "", 
    ordering: {
        val: "chinese" , 
        type: "string" as "string" ,
        choices: [
            "head" ,                // 一
            "list-chaining" ,       // 1)
            "list-separating" ,     // [1]
            "discuss" ,             // ①
            "title" ,               // 【一】
            "none" , 
        ] ,
    } , 
}

var brightwords_style = new FirstClassConcept({type: "group" , name: "昭言" , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "昭言" ,
    })   
})


var followwords_style = new FirstClassConcept   ({type: "group", name: "随言"   , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "随言" ,
    })   
})
var subwords_style    = new FirstClassConcept   ({type: "group", name: "属言"   , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "属言" ,
        clustering: false , // 是否对分离的节点重新标号。
    })   
})
var mathblock_style   = new FirstClassConcept   ({type: "group", name: "数学" , 
    parameter_prototype: make_param({
    ...words_params , 
        label: "数学" ,
        environ: "align" , // 默认的环境
    })   
})


var mount_style       = new FirstClassConcept   ({type: "group", name: "裱示"   , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "裱示" ,
        long: false , // 是否是长文本。
    })
})
var display_style     = new FirstClassConcept   ({type: "group", name: "彰示"   , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "彰示" ,
    })
})
var formatted_style   = new FirstClassConcept   ({type: "group", name: "格示"   , 
    parameter_prototype: make_param({
        ...words_params , 
        label: "格示" ,
        format: "" , 
    })
})

var subsection_style  = new FirstClassConcept   ({type: "group", name: "次节"   , 
    parameter_prototype: make_param({
        label: "次节" ,
        title: "" , 
    })
})

var strong_style      = new FirstClassConcept  ({type: "inline", name: "强"   , 
    parameter_prototype: make_param({
        label: "强" ,
    })
})
var delete_style      = new FirstClassConcept  ({type: "inline", name: "刊"   , 
    parameter_prototype: make_param({
        label: "刊" ,
    })
})

var link_style      = new FirstClassConcept  ({type: "inline", name: "缀"   , 
    parameter_prototype: {...make_param({
            label: "缀" ,
            target: "" , 
            autotext: false , 
        }) , 
        type: {
            val: "internal" , 
            type: "string" , 
            choices: ["index", "outer-index", "http"]
        }
    }
})

var mathinline_style  = new FirstClassConcept  ({type: "inline", name: "数学" , 
    parameter_prototype: make_param({
        label: "数学" ,
    })
})


var image_style       = new FirstClassConcept ({type: "support", name: "图"   , 
    parameter_prototype: {
        ...make_param({ 
            label: "图片" , 
            target: ""  , 
            width: 10 , 
            height: -1 , 
        }) , 
        type: {
            val: "internal" , 
            type: "string" , 
            choices: ["internal", "url"] , 
        }
    } , 
    meta_parameters: { force_inline: true }
})

var sectioner_style   = new FirstClassConcept ({type: "support", name: "小节线" , 
    parameter_prototype: make_param( { 
        label: "小节" , 
        title: "" , 
        alone: false , // 是否是唯一的小节
    } ) 
})
var ender_style       = new FirstClassConcept ({type: "support", name: "章节线" , 
    parameter_prototype: make_param( { 
        label: "章节" , 
    } ) 
})

var alignedwords_style = new FirstClassConcept({type: "structure", name: "齐言" , 
    parameter_prototype: make_param( { 
        label: "齐言" , 
        widths: "1" , 
    } ) 
})

var dimwords_style    = new FirstClassConcept({type: "abstract", name: "穆言", 
    parameter_prototype: make_param({
        label: "穆言" , 
    })
})


var showchildren_style = new FirstClassConcept ({type: "support", name: "展示子节点" , 
    parameter_prototype: make_param({
        label: "展示子节点" , 
        max_height: -1 , 
        min_height: -1 , 
        scroll: true , 
    })
})
var insertchildren_style = new FirstClassConcept ({type: "support", name: "插入子节点" , 
    parameter_prototype: make_param({
        label: "插入子节点" , 
        no_ender: true , 
    })
})


let first_concepts = [
    brightwords_style , 
	followwords_style , 
	subwords_style , 
	mathblock_style , 
	mount_style , 
	display_style , 
	formatted_style , 
	subsection_style , 
	strong_style , 
	delete_style , 
	link_style , 
	mathinline_style , 
	image_style , 
	ender_style , 
    sectioner_style , 
    alignedwords_style , 
    dimwords_style , 
    showchildren_style , 
    insertchildren_style , 
]