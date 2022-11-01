import {
	Printer ,
	PrinterComponent ,
	FirstClassConcept , 
	SecondClassConcept ,  
    ParameterValue ,
    ParameterList , 
} from "../../../../lib"

export {second_concepts}

function second_concepts_from_json(json: string){
    let infos = JSON.parse(json)

    let ret: SecondClassConcept[] = []
    for(let x in infos){
        let info = infos[x]
        ret.push( new SecondClassConcept({
            name: x , 
            type: info.type , 
            first_concept: info.first , 
            default_override: info.default , 
            fixed_override: info.fixed , 
        }))
    }
    return ret
}

let second_concepts = second_concepts_from_json(`{
    "命题": {
        "first": "昭言" , 
        "type" : "group" , 
        "fixed": {
            "title": {
                "val": "p=>p.category.val",
                "type": "function"
            },
            "prefix": {
                "val": "p=>p.alias.val",
                "type": "function"
            },
            "close": {
                "val": "",
                "type": "string"
            },
            "suffix": {
                "val": "",
                "type": "string"
            },
            "label": {
                "val": "p=>p.category.val",
                "type": "function"
            }
        } , 
        "default": {
            "alias": {
                "val": "",
                "type": "string"
            },
            "category": {
                "val": "命题",
                "type": "string",
                "choices": [
                    "定理",
                    "引理",
                    "推论",
                    "命题"
                ]
            }
        }
    } , 
    "证明": {
        "first" : "随言" , 
        "type" : "group" , 
        "fixed": {
            "label": {
              "val": "证明",
              "type": "string"
            },
            "title": {
              "val": "证明",
              "type": "string"
            },
            "close": {
              "val": "■",
              "type": "string"
            },
            "prefix": {
              "val": "",
              "type": "string"
            },
            "suffix": {
              "val": "",
              "type": "string"
            },
            "ordering": {
              "val": "none",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "列表": {
        "first" : "属言" , 
        "type" : "group" , 
        "fixed": {
          "prefix": {
            "val": "p=>p.alias.val ? \`($\{p.alias.val\})\`: '' ",
            "type": "function"
          },
          "suffix": {
            "val": "",
            "type": "string"
          },
          "title": {
            "val": "",
            "type": "string"
          },
          "close": {
            "val": "",
            "type": "string"
          },
          "label": {
            "val": "列表",
            "type": "string"
          },
          "clustering": {
            "val": true,
            "type": "boolean"
          },
          "ordering": {
            "val": "list-chaining",
            "type": "string"
          }
        } , 
        "default" : {
            "alias": {
              "val": "",
              "type": "string"
            }
          }
    }  , 
    "阐述": {
        "first" : "随言" , 
        "type" : "group" , 
        "fixed": {
            "prefix": {
              "val": "",
              "type": "string"
            },
            "suffix": {
              "val": "",
              "type": "string"
            },
            "ordering": {
              "val": "none",
              "type": "string"
            },
            "label": {
              "val": "阐述",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "引用": {
        "first" : "裱示" , 
        "type" : "group" , 
        "fixed": {
            "ordering": {
              "val": "none",
              "type": "string"
            },
            "label": {
              "val": "引用",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "节引": {
        "first" : "彰示" , 
        "type" : "group" , 
        "fixed": {
            "prefix": {
              "val": "",
              "type": "string"
            },
            "suffix": {
              "val": "",
              "type": "string"
            },
            "title": {
              "val": "",
              "type": "string"
            },
            "close": {
              "val": "",
              "type": "string"
            },
            "ordering": {
              "val": "none",
              "type": "string"
            },
            "label": {
              "val": "节引",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "代码": {
        "first" : "格式" , 
        "type" : "group" , 
        "fixed": {
            "prefix": {
              "val": "",
              "type": "string"
            },
            "suffix": {
              "val": "",
              "type": "string"
            },
            "ordering": {
              "val": "none",
              "type": "string"
            },
            "label": {
              "val": "代码",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "强调": {
        "first" : "强" , 
        "type" : "inline" , 
        "fixed": {
            "label": {
              "val": "强调",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "删除线": {
        "first" : "刊" , 
        "type" : "inline" , 
        "fixed": {
            "label": {
              "val": "删除线",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "链接": {
        "first" : "缀" , 
        "type" : "inline" , 
        "fixed": {
            "label": {
              "val": "链接",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "图片": {
        "first" : "图" , 
        "type" : "support" , 
        "fixed": {
            "label": {
              "val": "图片",
              "type": "string"
            }
          } , 
        "default" : {}
    }  , 
    "数学-块": {
        "first" : "数学" , 
        "type" : "group" , 
        "fixed": {} , 
        "default" : {}
    }  , 
    "数学-行内": {
        "first" : "数学" , 
        "type" : "inline" , 
        "fixed": {} , 
        "default" : {}
    } , 
    "小节线": {
        "first": "小节线" , 
        "type" : "support" , 
        "fixed": {} , 
        "default" : {}
    } , 
    
    "章节线": {
        "first": "章节线" , 
        "type" : "support" , 
        "fixed": {} , 
        "default" : {}
    } , 
    "行": {
        "first": "齐言" , 
        "type" : "structure" ,
        "fixed": {} , 
        "default" : {
            "label": {
                "val" : "行" , 
                "type": "string"
            } , 
            "widths": {
                "val": "1" , 
                "type": "string"
            }
        }
    }
}`)