/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
 import React from "react"
 import Button from "@mui/material/Button"

import type { StyleType , NodeType } from "../../core/elements"

import { Node } from "slate"
import { object_foreach , merge_object } from "../utils"

import { 
	Paper , 
	Divider ,  
} from "@mui/material"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { ThemeOptions } from "@mui/material/styles"

import { YPrinter , PrinterRenderer } from "../../printer"
import { default_theme  } from "../basic"
import { PrinterBackgroundPaper } from "./basic"
import { StyleCollector } from "../../core/stylecollector"
import { EditorCore } from "../../core/core"

export { DefaultPrinter }


/** 
 * 这个组件提供一个开箱即用的默认渲染器组件。
 */
class DefaultPrinter extends React.Component <{
	
    renderers: StyleCollector<PrinterRenderer>

    /** 编辑器核心。 */
    core: EditorCore
	theme?: ThemeOptions
}> {

    renderers: StyleCollector<PrinterRenderer>
    core: EditorCore
	theme?: ThemeOptions
	printer_ref: React.RefObject<YPrinter>

	constructor(props) {
		super(props)

		this.core = props.core
		this.renderers = props.renderers
		this.theme = props.theme

		this.printer_ref = React.createRef()
    }

	get_printer(){
		if(this.printer_ref && this.printer_ref.current){
			return this.printer_ref.current
		}
		return undefined
	}

	scroll_to(path: number[]){
		let printer = this.get_printer()
		if(printer){
			printer.scroll_to(path)
		}
	}

    render() {
		let theme = default_theme
		if(this.theme){
			theme = merge_object(default_theme , this.theme)
		}

		return <ThemeProvider theme={createTheme(theme)}><PrinterBackgroundPaper>
            <YPrinter
				core = {this.core}
				renderers = {this.renderers}
				ref = {this.printer_ref}
		    />
        </PrinterBackgroundPaper></ThemeProvider>
	}
}
