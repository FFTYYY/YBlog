import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { ThemeOptions , PaletteColor} from "@mui/material/styles"

export { default_theme  }
export type { ThemeOptions }

const default_theme : ThemeOptions = {
    palette: {
        divider: "#00000077" , 
        primary: {
            main: "#111111"
        }
    },    
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
        typography: {
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
    printer: {
        margins: {
            paragraph: "0.4rem" ,  
            special: "0.8rem" ,  
            colon: "1rem" ,  
            level: "2rem" ,  
            structure: "0.4rem" , 
        } , 
        typography: {
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
        } , 
    } , 
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
    typography: {
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
    } , 
    typography: {
        

        /** 主要内容的字体。 */
        body: TypographyTheme  
        
        /** 结构性文本的字体。 */
        structure: TypographyTheme

        /** 展示的文本的字体。 */
        display: TypographyTheme

        /** 弱化的文本的字体。（不重要的） */
        weaken: TypographyTheme
    }
}

interface MyTheme {
    printer: PrinterTheme
    editor: EditorTheme
} 

declare module "@mui/material/styles" {
	interface Theme {
        printer: PrinterTheme
        editor: EditorTheme
	}	
	interface ThemeOptions {
        printer?: MyPartial<PrinterTheme>
        editor?: MyPartial<EditorTheme>
	}
}

