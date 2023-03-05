/** 这个模块提供一个开箱即用的印刷器。
 * @module
 */

import React from "react"

import { 
    Printer , 
    PrinterComponent , 
    GroupNode , 
    AbstractNode , 
    GlobalInfoProvider , 
    PrinterCache , 
} from "../core"
import {
    PrinterBackgroundPaper , 
} from "./uibase"
import {
    default_theme , 
    ThemeProvider , 
    ThemeContext , 
    Theme , 
} from "../core/theme"
import { merge_object } from "../core/utils"
export {
    DefaultPrinterComponent , 
}

export type {
    DefaultPrinterProps
}

/** 这是默认印刷器实现的props。 */
interface DefaultPrinterProps {
    printer: Printer
    root: AbstractNode
    theme?: Theme
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

        let theme = merge_object(default_theme , this.props.theme)

        return <GlobalInfoProvider value={{theme: theme}}><ThemeProvider value = {theme}>
            <PrinterBackgroundPaper>
                <PrinterComponent 
                    ref = {me.printer_ref}
                    printer = {me.props.printer}
                    root = {me.props.root}
                    onUpdateCache = {me.props.onUpdateCache}
                />
            </PrinterBackgroundPaper>
        </ThemeProvider></GlobalInfoProvider>
    }
}