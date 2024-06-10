import React, { useEffect } from "react"
import ReactDom from "react-dom"

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

    PrinterRenderer , 
	GroupNode , 
	StructNode , 
	SupportNode , 
	InlineNode , 
	Env  , 
	Context  , 
    PrinterRenderFunctionProps, 
    PrinterRenderFunction , 
	DefaultAbstractRendererAsProperty , 

	ThemeContext , 
} from "@ftyyy/ytext"

import {
	url_from_root , Interaction , urls , 
} from "../../interaction"

import {
	node2string , 
} from "../printers/utils"


export {
	converters , 
}

var _names = {}
/** 为中文字符串分配一个随机的英文名。 只能使用英文字母。*/
function convert_name(name: string){
	if(name in _names){
		return _names[name]
	}

    let t = "abcdefhijkmnprstwxyz"
    let new_name = ""
    for (let i = 0; i < 7; i++) {
		new_name = new_name + ( t.charAt(Math.floor(Math.random() * t.length)) )
	}

	_names[name] = new_name
	return new_name
}

function convert_subsection(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title
	return `\\subsection{${title}}\n\n` + children
}

function convert_brightwords(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let label = parameters.label  // 标题
	let prefix = parameters.prefix // 前缀

	let label_eng = convert_name(label)

	add_global("\\usepackage{ntheorem}")
	add_global("\\theoremstyle{theorem}\\newtheorem{theorem}{Theorem}[section]")
	add_global(`\\newtheorem{${label_eng}}[theorem]{${label}}`)

	return `\\begin{${label_eng}}${prefix ? `[${prefix}]` : ""}\n${children}\n\\end{${label_eng}}\n\n`
}

function convert_followwords(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title // 标题
	let close = parameters.close // 结尾


	return `\\textit{${title}}~ ${children}\n ${close}\n\n`
}

// XXX 应该用比较小（弱）的字体，或者搞个缩进
function convert_subwords(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title // 标题
	let close = parameters.close // 结尾

	return `\\textit{${title}}~ ${children}\n ${close}\n\n`
}

// XXX 应该居中，并用比较正式的字体
function convert_mount(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title // 标题
	let close = parameters.close // 结尾 // XXX 没加结尾
	add_global("\\usepackage{csquotes}")

	return `\\textit{${title}}\n\\begin{displayquote}\n${children}\n\\end{displayquote}\n\n`
}

function convert_display(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title // 标题
	let close = parameters.close // 结尾

	return `{\\huge ${children}}\n\n`
}

function convert_mathblock(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let suffix 	= parameters.suffix
	let close 	= parameters.close
	let environ = parameters.environ
	let environ_enter = environ ? `\\begin{${environ}}` : "$$"
	let environ_exit  = environ ? `\\end{${environ}}`   : "$$"

	let value = `${environ_enter}${node2string(node)}\\text{${suffix}}${environ_exit}`

	return `${value}${close}\n\n`
}

function convert_sectioner(node: GroupNode, children: string, context: Context, parameters: ProcessedParameterList, add_global: (val: string) => void){
	
	let title = parameters.title
	return `\\section{${title}}\n\n`
}

let converters = {
	"昭言": convert_brightwords , 
	"随言": convert_followwords , 
	"裱示": convert_mount , 
	"彰示": convert_display , 
	"属言": convert_subwords , 
	"数学": convert_mathblock , 
	"次节": convert_subsection , 
	"小节线": convert_sectioner , 
}
