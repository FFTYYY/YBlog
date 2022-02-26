import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import type { PaletteColor} from "@mui/material/styles"
import type { ThemeOptions } from "../../../lib" 
export { my_theme }

const my_theme: ThemeOptions = {
    palette: {
        divider: "#00000077" , 
        primary: {
            main: "#111111"
        }
    },    
    printer: {
        margins: {
            paragraph: "0.4rem" ,  
            special: "2rem" ,  
            colon: "1rem" ,  
            level: "2rem" ,  
        } , 
        typography: {
            body: {
                fontFamily: "STXihei" , 
            },
            title: {
                fontFamily: "DengXian" , 
                fontWeight: 600 , 
            } , 
            structure: {
                fontFamily: "DengXian" , 
            } , 
            display: {
                fontFamily: "KaiTi" , 
            } , 
            weaken: {
                fontFamily: "FangSong" , 
            }
        } , 
    } , 
}
