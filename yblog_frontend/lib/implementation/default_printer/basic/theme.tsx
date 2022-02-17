import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { ThemeOptions } from "@mui/material/styles"

export {default_printer_theme}

const default_printer_theme = createTheme({
	palette: {
		divider: "#00000077" , 
		primary: {
			main: "#111111"
		}
	},
	margins: {

		/** 段落之间的上下距离。 */
		paragraph: "0.4rem" , 

		/** 特殊元素距离之前元素的距离。 */
		special: "0.8rem" , 

		/** 代替分号的小空格。 */
		colon: "1rem" , 

		/** 一个层级的空格。 */
		level: "2rem" , 
		
	} , 
} as ThemeOptions)
