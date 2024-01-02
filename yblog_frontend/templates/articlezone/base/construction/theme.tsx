import { Theme } from "@ftyyy/ytext"
import { light } from "@mui/material/styles/createPalette"
export { my_theme }

let my_palette_light = {
    symbol:{
        reference: "#6baed6" , 
        abstract: "#7fcdbb" , 
        error: "rgba(230,20,20,0.65)" , 
    } , 
    text: {
        on_primary: "rgb(230,230,230)" , 
        weak_on_primary: "rgb(150,150,150)" , 
        anti_on_primary: "rgb(20,20,20)" , 
        on_secondary: "rgb(250,250,250)" , 
        weak_on_secondary: "rgb(220,220,220)" , 

        link: "#40797E" , 
        info: "#777788" , 
    } , 
    background: {
        primary: "#324347" , 
        anti_primary: "#B0B0B0"  ,
        secondary: "#546A54" , 
    } , 
}

let light_palette = {
    divider: "#060606" , 
    mode: "light" as "light",
    primary: {
        main: my_palette_light.background.primary,
    },
    info: {
        main: my_palette_light.text.info,
    },
    secondary: {
        main: my_palette_light.background.secondary,
    },
    background: {
        default: "rgba(250,250,250,1)",
        paper: "rgba(250,250,250,1)",
    },
    text: {
        primary     : "rgb(6,6,6)",
        secondary   : "rgba(6,6,6,0.70)" , 
        disabled    : "rgba(6,6,6,0.5)",
    },
}

let dark_paltte = {
    divider: "#DDDDDD" , 
    mode: "dark" as "dark",
    primary: {
        main: "#EEEEEE",
    },
    info: {
        main: "#DDAAAA",
    },
    secondary: {
        main: "#FFDDCC",
    },
    background: {
        default: "rgba(55,50,50,1)",
        paper: "rgba(55,50,50,1)",
    },
    text: {
        primary     : "#EEEEEE",
        secondary   : "rgba(220,220,220,0.70)" , 
        disabled    : "rgba(220,220,220,0.5)",
    },
}

const my_theme: Theme = {
    mui:{
        palette: light_palette , 
    } , 
    my_palette: my_palette_light , 
    printer: {
        margins: {
            paragraph: "0.4rem" ,  
            special: "1.0rem" ,  
            colon: "1rem" ,  
            level: "2rem" ,  
        } , 
        fonts: {
            body: {
                fontFamily: "STXihei" , 
                fontSize: "1.0rem" ,
                lineHeight: "1.5rem" , 
            },
            title: {
                fontFamily: "SimHei" , 
                fontSize: "1.0rem" ,
                lineHeight: "1.5rem" , 
            } , 
            structure: {
                fontFamily: "SimHei" , 
                fontSize: "1.0rem" ,
                lineHeight: "1.5rem" , 
            } , 
            display: {
                fontFamily: "KaiTi" , 
                fontSize: "1.1rem" ,
                lineHeight: "1.5rem" , 
            } , 
            weaken: {
                fontFamily: "FangSong" , 
                fontSize: "1.0rem" ,
                lineHeight: "1.5rem" , 
            }
        } , 
    }
}
