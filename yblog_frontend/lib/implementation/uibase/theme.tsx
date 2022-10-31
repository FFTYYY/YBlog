import type { ThemeOptions , PaletteColor} from "@mui/material/styles"
import { Printer } from "../../core"

export { default_theme  }
export type { ThemeOptions }

const default_theme: ThemeOptions = {
    palette: {
        divider: "#00000077" , 
        primary: {
            main: "#111111"
        }
    }, 
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

/** 这是自定义主题的一项，用来定义各种间隔的大小。 */
interface Margins {
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
/** 这是自定义主题的一项，用来定义各种字体。 */
interface Fonts {
        
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

/** 通过typescript的模块增强来给主题增加新的项目。 */
declare module "@mui/material/styles" {
	interface Theme {
        margins: Margins
        fonts: Fonts
    }
	interface ThemeOptions{
        margins?: MyPartial<Margins>
        fonts?: MyPartial<Fonts>
    }
}


