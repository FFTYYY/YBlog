/** 这个模块提供一个开箱即用的印刷器。
 * @module
 */

import React from "react"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { ThemeOptions } from "@mui/material/styles"


import { 
    Printer , 
    PrinterComponent , 
    GroupNode , 
    AbstractNode , 
    GlobalInfoProvider , 
    PrinterCache , 
} from "../core"
import {
    default_theme , 
    PrinterBackgroundPaper , 
} from "./uibase"

export {
    merge_theme , 
    DefaultPrinterComponent , 
}

export type {
    DefaultPrinterProps
}

/** 这个函数将两个主题合并，并用后者覆盖前者。 */
function merge_theme(theme_1: ThemeOptions, theme_2: ThemeOptions):ThemeOptions{

    function merge_object(obj_1: any, obj_2: any){
        if(obj_1 == undefined)
        return obj_2
        if(obj_2 == undefined)
            return obj_1
        
        // 但凡遇到叶子节点，优先以obj_2为准
        if(typeof obj_2 == "string" || typeof obj_2 == "number" || typeof obj_2 == "boolean"){
            return obj_2
        }
        // 但凡遇到叶子节点，就返回。
        if(typeof obj_1 == "string" || typeof obj_1 == "number" || typeof obj_1 == "boolean"){
            return obj_1
        }

        let ret = {}
        for(let key in {...obj_1,...obj_2}){
            ret[key] = merge_object(obj_1[key] , obj_2[key])
        }
        return ret
    }

    return merge_object(theme_1 , theme_2) as ThemeOptions
}

/** 这是默认印刷器实现的props。 */
interface DefaultPrinterProps {
    printer: Printer
    root: AbstractNode
    theme?: ThemeOptions
    onUpdateCache?: (cache: PrinterCache) => void

    onDidMount?: (printer_comp: PrinterComponent, me: DefaultPrinterComponent)=>void
}

/** 这个类提供一个默认的印刷器实现。 */
class DefaultPrinterComponent extends React.Component<DefaultPrinterProps>{
    printer_ref: React.RefObject<PrinterComponent>
    
    /**
     * 默认印刷器的构造函数。
     * @param props.printer 要使用的印刷器。
     * @param props.root 要印刷的树。
     * @param props.theme 要使用的主题设置。可以只设置一部分主题，剩下的会被默认选项填充。
     */
    constructor(props: DefaultPrinterProps){
        super(props)
        this.printer_ref = React.createRef()
    }

    componentDidMount(): void {
        while(!this.get_component());

        if(this.props.onDidMount){
            this.props.onDidMount(this.get_component(), this)
        }
    }

    get_component(){
        if(this.printer_ref && this.printer_ref.current){
            return this.printer_ref.current
        }
        return undefined
    }

    render(){
        let me = this
        let theme = default_theme
		if(me.props.theme){
			theme = merge_theme(default_theme , me.props.theme)
		}

        return <ThemeProvider theme = {createTheme(theme)}>
            <GlobalInfoProvider value={{theme: theme}}>
                <PrinterBackgroundPaper>
                    <PrinterComponent 
                        ref = {me.printer_ref}
                        printer = {me.props.printer}
                        root = {me.props.root}
                        onUpdateCache = {me.props.onUpdateCache}
                    />
                </PrinterBackgroundPaper>
            </GlobalInfoProvider>
        </ThemeProvider>
    }
}