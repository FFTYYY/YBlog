import { Theme } from "@ftyyy/ytext"
export { my_theme }

const my_theme: Theme = {
    mui:{
        palette: {
            divider: "#060606" , 
            mode: "light",
            primary: {
                main: "#404080",
            },
            secondary: {
                main: "#A02020",
            },
            background: {
                default: "rgba(230,230,230,0.96)",
                paper: "#393942",
            },
            text: {
                primary     : "#020202",
                secondary   : "rgba(6,6,6,0.70)" , 
                disabled    : "rgba(6,6,6,0.5)",
            },
        },
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
                fontSize: "1.1rem" ,
                lineHeight: "1.6rem" , 
            },
            title: {
                fontFamily: "SimHei" , 
                fontSize: "1.1rem" ,
                lineHeight: "1.6rem" , 
            } , 
            structure: {
                fontFamily: "SimHei" , 
                fontSize: "1.1rem" ,
                lineHeight: "1.6rem" , 
            } , 
            display: {
                fontFamily: "KaiTi" , 
                fontSize: "1.1rem" ,
                lineHeight: "1.6rem" , 
            } , 
            weaken: {
                fontFamily: "FangSong" , 
                fontSize: "1.1rem" ,
                lineHeight: "1.6rem" , 
            }
        } , 
    }
}
