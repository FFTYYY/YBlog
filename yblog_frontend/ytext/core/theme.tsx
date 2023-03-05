import React from "react"
import { merge_object } from "./utils"
import {  
    ThemeProvider as MUIThemeProvider , 
    createTheme as MUIcreateTheme ,  
    ThemeOptions as MUIThemeOptions , 
} from "@mui/material/styles"

export {
    default_theme , 
    ThemeContext , 
    ThemeProvider , 
}

export type {
    TypographyTheme , 
    EditorTheme , 
    PrinterTheme , 
    Theme , 
}

// 这个泛型递归地将每个成员都设为可选的。
type MyPartial<T> = { [k in keyof T]?: MyPartial<T[k]> }

/** 定义字体样式的主题。 */
interface TypographyTheme {
    /** 字体。 */
    fontFamily: string

    /** 字号。 */
    fontSize: string

    /** 全局的行高。注意行高为数字时指的是字体大小的倍数。 */
    lineHeight : string

    /** 全局的字符间距。 */
    lineSpacing: string

    /** 全局的粗细。 */
    fontWeight: number 
}

interface EditorTheme {
    margins: {
        
		/** 用来书写的纸张跟内部元素的距离。 */
        background: string 

		/** 段落之间的上下距离。 */
        paragraph: string

		/** 小间隔。 */
        small: string
    } , 
    widths: {
		/** 所有可以弹出的 Drawer 的宽度。 */
		editable_drawer: string 

		/** 任何一个有值的元素的最小宽度。 */
		minimum_content: string 
	} , 
    fonts: {
        /** 主要文本的字体。 */
        body: TypographyTheme

        /** 结构性文本的字体。 */
        structure: TypographyTheme
    }
}

interface PrinterTheme {
    margins: {
        /** 段落之间的上下距离。 */
        paragraph: string 

        /** 特殊元素距离前后元素的距离。 */
        special: string 

        /** 代替分号的小空格。 */
        colon: string 

        /** 一个层级的空格。 */
        level: string 

        /** 结构性的左右偏移。 */
        structure: string 
    } 
    fonts: {
        /** 主要内容的字体。 */
        body: TypographyTheme  
        
        /** 结构性文本的字体。 */
        structure: TypographyTheme

        /** 结构性文本，但是是标题。 */
        title: TypographyTheme

        /** 展示的文本的字体。 */
        display: TypographyTheme

        /** 弱化的文本的字体。（不重要的） */
        weaken: TypographyTheme
    }
}


interface Theme {
    mui?: MUIThemeOptions , 
    editor?: MyPartial<EditorTheme>
    printer?: MyPartial<PrinterTheme>
    [name: string]: any
}

const default_theme: Theme = {
    mui: {
        palette: {
            divider: "#00000077" , 
            primary: {
                main: "#111111"
            }
        }, 
    } , 
    printer: {
        margins: {
            paragraph: "0.4rem" ,  
            special: "0.8rem" ,  
            colon: "1rem" ,  
            level: "2rem" ,  
            structure: "0.4rem" , 
        } , 
        fonts: {
            body: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight: "1.5rem" , 
                lineSpacing: "0.00938em" , 
                fontWeight: 400 , 
            },
            weaken: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight: "1.5rem" , 
                lineSpacing: "0.00938em" , 
                fontWeight: 400 , 
            },
            structure: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight: "1.5rem" , 
                lineSpacing: "0.00938em" , 
                fontWeight: 400 , 
            } , 
            display: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight: "1.5rem" , 
                lineSpacing: "0.00938em" , 
                fontWeight: 400 ,         
            } , 
            title: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight: "1.5rem" , 
                lineSpacing: "0.00938em" , 
                fontWeight: 400 ,   
            }
        } ,     
    } , 
    editor: {
        margins: {
            background: "0.5rem" , 
            paragraph: "0.8rem" , 
            small: "0.2rem" , 
        } , 
        widths: {
            editable_drawer: "70%" , 
            minimum_content: "3rem" , 
        } , 
        fonts: {
            body: {
                fontFamily: "default" , 
                fontSize: "1rem" , 
                lineHeight : "1.5rem" , 
                lineSpacing: "0.00938em" ,    
                fontWeight: 400 , 
            } , 

            structure: {
                fontFamily: "Century Gothic, SimHei" , 
                fontSize: "1rem" , 
                lineHeight : "1.5rem" , 
                lineSpacing: "0.00938em" ,    
                fontWeight: 400 , 
            } , 
        } , 
    } , 
}

let ThemeContext = React.createContext<Theme>(default_theme)


/** 这个组件用来代替`ThemeContext.Provider`，其会自动合并提供的信息。 
 XXX 虽然不知道为什么，在发布之后`MUIThemeProvider`的行为会变得奇怪....
*/
function ThemeProvider(props:{
    value: Theme
    children: any

    /** 是否增加一个mui的`ThemeProvider`。 */
    mui?: boolean 
}){
    let muitheme = props.value.mui
    if (props.mui && muitheme != undefined){ // 把palette这个参数直接传给MUI来处理
        return <MUIThemeProvider theme={MUIcreateTheme(muitheme)}>
            <ThemeContext.Consumer>{oldval => 
                <ThemeContext.Provider value={ merge_object(oldval, props.value) }>{props.children}</ThemeContext.Provider>
            }</ThemeContext.Consumer>
        </MUIThemeProvider>
    }

    return <ThemeContext.Consumer>{oldval => 
        <ThemeContext.Provider value={ merge_object(oldval, props.value) }>{props.children}</ThemeContext.Provider>
    }</ThemeContext.Consumer>
}

