import {
    GroupNode , 
    StructNode , 
    SupportNode , 
    InlineNode , 
    ParagraphNode , 
    TextNode , 
    Node , 
    validate , 
} from "../../../../lib"


export {convert_old_tree}

function make_parameters(parameters){
    for(let x in parameters){
        if(parameters[x]["type"] == "choice"){
            parameters[x].type = "string"
        }
    }
    return parameters
}

function create_group(concept , parameters , children , relation , idx = undefined): GroupNode{

    for(let x in parameters){
        if ( (parameters[x]) instanceof String){
            parameters[x] = {
                type: "string" , 
                val: parameters[x] , 
            }
        }
        else if ( (parameters[x]) instanceof Number){
            parameters[x] = {
                type: "number" , 
                val: parameters[x] , 
            }
        }

        if(x == "ordering"){
            parameters[x].val = {
                chinese: "head" , 
                "arab-circle": "discuss" , 
                "chinese-bracket": "title" , 
                "arab-bracket": "list-separating" , 
                "arab-round-bracket": "list-chaining" , 
            }[parameters[x].val]
        }
    }


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

function create_inline(concept , parameters , children , idx = undefined): InlineNode{
    if(children.length != 1)
    {
        throw "children length != 1"
    }
    return {
        type: "inline" as "inline" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        children: children , 
        abstract: [] , 
    }
}

function create_paragraph(children): ParagraphNode{
    return {
        children: children
    }
}

function create_text(text): TextNode{
    return {
        text: text
    }
}

function create_support(concept , parameters , idx= undefined): SupportNode{
    return {
        type: "support" , 
        idx: idx || Math.floor( Math.random() * 233333) , 
        concept: concept , 
        parameters: parameters , 
        // children: [{children: [{text: "haha"}]}] , 
        children: [{text: ""}] , 
        abstract: [] , 

    }
}

function create_struct(concept , parameters , children, relation, idx = undefined): StructNode{
    if(concept == "行"){
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



function parse_concept(oldnode){
    let concept = "not-found"
    let parameters = {}
    if(oldnode["proxy_info"] && oldnode["proxy_info"].proxy_name){
        concept = oldnode["proxy_info"].proxy_name
        parameters = oldnode["proxy_info"].proxy_params
    }
    else{
        concept = oldnode["name"]
        parameters = oldnode["parameters"]

    }
    return [concept , make_parameters(parameters)]
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

function parsetext(text){
    if(typeof(text) == "string"){
        return text
    }
    if(text instanceof Array){
        return text.map(x=>parsetext(x)).join("")
    }
    
    throw "wtf!"
    return text
}

function parse(oldnode){
    if(oldnode["type"] == "group"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_group(concept , parameters, parse_children(oldnode) , oldnode["relation"] , oldnode["idx"])
    }
    if(oldnode["type"] == "inline"){
        let [concept , parameters] = parse_concept(oldnode)
        return create_inline(concept , parameters, parse_children(oldnode) , oldnode["idx"])
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

function convert_old_tree(json): GroupNode{
    let old_tree = json

    let ret = parse(old_tree) as GroupNode

    let [good , msg] = validate(ret)
    console.log("good? = " , good)
    console.log(msg)
    if(!good){
        console.log("not good!!!")
        console.log(msg)
        console.log("ret is" , ret)
        console.log("old is" , old_tree)
    }

    return ret
}

