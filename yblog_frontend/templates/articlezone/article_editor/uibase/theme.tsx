import { createTheme, ThemeProvider, styled , ThemeOptions, PaletteOptions } from "@mui/material/styles"
import { PaletteColor} from "@mui/material/styles"
export { my_theme }

const my_theme: ThemeOptions = {
    palette: {
        divider: "#eeeeee" , 
        mode: "dark",
        primary: {
            main: '#aea6f5',
        },
        secondary: {
            main: '#cb3f75',
        },
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
