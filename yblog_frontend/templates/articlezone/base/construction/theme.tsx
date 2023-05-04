import { Theme } from "@ftyyy/ytext"
export { my_theme }

let light_paltte = {
    divider: "#060606" , 
    mode: "light" as "light",
    primary: {
        main: "#40797E",
    },
    info: {
        main: "#666677",
    },
    secondary: {
        main: "#606099",
    },
    background: {
        default: "rgba(235,233,230,1)",
        paper: "rgba(235,233,230,1)",
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
        main: "#DDDDDD",
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
        primary     : "#DDDDDD",
        secondary   : "rgba(220,220,220,0.70)" , 
        disabled    : "rgba(220,220,220,0.5)",
    },
}

const my_theme: Theme = {
    mui:{
        palette: light_paltte , 
    } , 
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
