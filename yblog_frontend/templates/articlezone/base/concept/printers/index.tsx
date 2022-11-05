import React, { useEffect } from "react"
import ReactDom from "react-dom"
import * as Slate from "slate"

import {
	Box , Link , Typography , Divider , Grid
} from "@mui/material"

import {
    Node , 
	TextNode , 

	get_default_group_renderer , 
    get_default_paragraph_renderer , 
    get_default_inline_renderer , 

    ContexterBase , 
    OrderContexter , 
    InjectContexter , 
    ConsumerContexter , 

	PreprocessFunction , 
	PreprocessInformation , 

	auto_renderer , 
	
	PrinterDivider , 
	PrinterWeakenText , 
	PrinterDisplayText , 
	PrinterStructureBoxText  , 
	PrinterParagraphBox , 
	PrinterPartBox , 
	PrinterNewLevelBox , 
	PrinterOldLevelBox , 
	PrinterBackgroundPaper , 
	
	AutoStack , 

	GlobalInfo , 
	GlobalInfoProvider, 
	AutoTooltip, 
	ProcessedParameterList , 
	get_default_structure_renderer , 

	ReferenceContexter , 
	PrinterComponent , 
    PrinterRenderFunctionProps , 
    PrinterRenderer , 
} from "../../../lib"


import {renderers as group_struct_renderers} from "./group_structs"
import {renderers as inline_renderers} from "./inlines"
import {renderers as support_renderers} from "./supports"

// TODO abtract的printer
// TODO 再加几个概念。

export {
    default_renderers , 
    renderers , 
}

let default_renderer_block = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
		let node = props.node
        return <div>{props.children}</div>
    }
})

let default_renderer_inline = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        return <span>{props.children}</span>
    }
})

let default_renderer_text = new PrinterRenderer({
    renderer(props: PrinterRenderFunctionProps):React.ReactElement<PrinterRenderFunctionProps>{
        let node = props.node as TextNode
        return <span>{node.text}</span>
    }
})


let default_renderers = {
	"group"     : default_renderer_block , 
    "structure" : default_renderer_block , 
    "support"   : default_renderer_block , 
    "abstract"  : default_renderer_block , 
    "paragraph" : get_default_paragraph_renderer({}) , 
    "inline"    : default_renderer_inline , 
    "text"      : default_renderer_text , 

}

let renderers = {
	group: group_struct_renderers.group ,
	inline : inline_renderers.inline,
	support: support_renderers.support , 
	abstract: {} , 
	structure: group_struct_renderers.structure , 
}
