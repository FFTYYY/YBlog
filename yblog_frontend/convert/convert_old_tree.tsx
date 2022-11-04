/** 
 * 这个模块初步地将一棵树的每个节点转为新的格式。
 */

import {
    GroupNode , 
    StructNode , 
    SupportNode , 
    InlineNode , 
    ParagraphNode , 
    TextNode , 
    Node , 
    validate , 
    ProcessedParameterList , 
    NonLeafNode , 
    AbstractNode , 
} from "../templates/articlezone/lib"


export {
    convert_old_tree , 
    create_group , 
    create_inline , 
    create_paragraph , 
    create_text , 
    create_support , 
    create_struct , 
}

function parse_parameters(parameters: any): ProcessedParameterList{
    for(let x in parameters){
        if ( typeof (parameters[x]) == "string"){
            parameters[x] = {
                type: "string" , 
                val: parameters[x] , 
            }
        }
        else if ( typeof (parameters[x]) == "number"){
            parameters[x] = {
                type: "number" , 
                val: parameters[x] , 
            }
        }
        else if ( typeof (parameters[x]) == "boolean"){
            parameters[x] = {
                type: "boolean" , 
                val: parameters[x] , 
            }
        }

        if(parameters[x].type == undefined){
            if ( typeof (parameters[x].val) == "string"){
                parameters[x].type = "string"
            }
            else if ( typeof (parameters[x].val) == "number"){
                parameters[x].type = "number"
            }
            else if ( typeof (parameters[x].val) == "boolean"){
                parameters[x].type = "boolean"
            }
            else{
                console.log("????? ", parameters[x])
            }
            
        }

        if(parameters[x]["type"] == "choice"){
            parameters[x].type = "string"
        }
    }
    return parameters
}

function parse_concept(oldnode): [string, ProcessedParameterList]{
    let concept = "not-found"
    let parameters = {}
    if(oldnode["proxy_info"] && oldnode["proxy_info"].proxy_name){
        concept = oldnode["proxy_info"].proxy_name
        parameters = {...oldnode["parameters"], ...oldnode["proxy_info"].proxy_params}
    }
    else{
        concept = oldnode["name"]
        parameters = oldnode["parameters"]
    }
    parameters = parse_parameters(parameters)
    return [concept , parameters]
}


function create_group(
    concept: string , 
    parameters: ProcessedParameterList , 
    children: NonLeafNode[] , 
    relation: "chaining" | "separating" , 
    idx = undefined
): GroupNode{

    return {
        type: "group" as "group" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        children: children , 
        abstract: [] , 
        relation: relation , 
    }
}

function create_inline(
    concept: string , 
    parameters: ProcessedParameterList , 
    children: [TextNode] , 
    idx = undefined
): InlineNode{
    return {
        type: "inline" as "inline" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        children: children , 
        abstract: [] , 
    }
}

function create_paragraph(children: (InlineNode | TextNode)[]): ParagraphNode{
    return {
        children: children
    }
}

function create_text(text: string): TextNode{
    return {
        text: text
    }
}

function create_support(concept: string , parameters: ProcessedParameterList , idx= undefined): SupportNode{
    return {
        type: "support" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        children: [{text: ""}] , 
        abstract: [] , 
    }
}

function create_struct(concept , parameters , children, relation, idx = undefined): StructNode{
    if(concept == "行"){ // 保留子节点数的信息。
        let widths = parameters.widths.val
        let widths_lis = widths.split(",")
        while(widths_lis.length < children.length){
            widths_lis.push("1")
        }
        parameters.widths.val = widths_lis.join(",")
    }
    return {
        type: "structure" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        children: children , 
        abstract: [] , 
        relation: relation , 
    }
}


function parse_children(oldnode){
    let old_c = oldnode.children

    let new_c: any[] = []
    for(let x of old_c){
        let c = parse(x)
        if(c)
            new_c.push(c)
    }
    return new_c
}

function parsetext(text: any){
    if(typeof(text) == "string"){
        return text
    }
    if(text instanceof Array){
        return text.map(x=>parsetext(x)).join("")
    }
    
    throw "wtf!"
}

function parse(oldnode){
    if(oldnode["type"] == "group"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_group(concept , parameters, parse_children(oldnode) , oldnode["relation"] , oldnode["idx"])
    }
    if(oldnode["type"] == "inline"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_inline(concept , parameters, parse_children(oldnode) as any , oldnode["idx"])
    }
    if(oldnode["type"] == "support"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_support(concept , parameters, oldnode["idx"])
    }
    if(oldnode["type"] == "struct"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_struct(concept , parameters, parse_children(oldnode) , oldnode["relation"] , oldnode["idx"])
    }
    if(oldnode["text"] != undefined){
        return create_text(parsetext(oldnode["text"]))
    }
    if(oldnode["children"] != undefined){
        return create_paragraph(parse_children(oldnode))
    }
    throw "what the fuck?"
}

function convert_old_tree(json): AbstractNode{
    let old_tree = json

    let ret = parse(old_tree) as AbstractNode

    let [good , msg] = validate(ret)

    if(good){
        console.log ("convert_old_tree: good!")
    }
    else{
        console.log ("convert_old_tree: bad!")
    }

    return ret
}

