import type { ThemeOptions , PaletteColor} from "@mui/material/styles"

export { default_editor_theme  }

const default_editor_theme: ThemeOptions = {
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


/** 通过typescript的模块增强来给主题增加新的项目。 */
declare module "@mui/material/styles" {
	interface Theme {
        editor: EditorTheme
    }
	interface ThemeOptions{
        editor?: MyPartial<EditorTheme>
    }
}


