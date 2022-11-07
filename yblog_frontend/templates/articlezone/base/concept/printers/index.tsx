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
	useless_renderer_text , 
	useless_renderer_inline , 
	useless_renderer_block , 
} from "../../../lib"


import {renderers as group_struct_renderers} from "./group_structs"
import {renderers as inline_renderers} from "./inlines"
import {renderers as support_renderers} from "./supports"
import {renderers as abstract_renderers} from "./abstract"

// TODO abtract的printer
// TODO 再加几个概念。

export {
    default_renderers , 
    renderers , 
}

let default_renderers = {
	"group"     : useless_renderer_block , 
    "structure" : useless_renderer_block , 
    "support"   : useless_renderer_block , 
    "abstract"  : useless_renderer_block , 
    "paragraph" : get_default_paragraph_renderer({}) , 
    "inline"    : useless_renderer_inline , 
    "text"      : useless_renderer_text , 

}

let renderers = {
	group: group_struct_renderers.group ,
	inline : inline_renderers.inline,
	support: support_renderers.support , 
	abstract: abstract_renderers.abstract , 
	structure: group_struct_renderers.structure , 
}
