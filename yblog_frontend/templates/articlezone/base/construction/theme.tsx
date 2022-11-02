import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { PaletteColor} from "@mui/material/styles"
import type { ThemeOptions } from "@ftyyy/ytext"
export { my_theme }

const my_theme: ThemeOptions = {
    palette: {
        divider: "#00000077" , 
        primary: {
            main: "#111111"
        }
    },    
    margins: {
        paragraph: "0.4rem" ,  
        special: "1.0rem" ,  
        colon: "1rem" ,  
        level: "2rem" ,  
    } , 
    fonts: {
        body: {
            fontFamily: "STXihei" , 
        },
        title: {
            fontFamily: "SimHei" , 
        } , 
        structure: {
            fontFamily: "SimHei" , 
        } , 
        display: {
            fontFamily: "KaiTi" , 
        } , 
        weaken: {
            fontFamily: "FangSong" , 
        }
    } , 
}
