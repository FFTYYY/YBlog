import React from "react"
import $ from "jquery"
// import "mathjax/es5/tex-svg"

export { MathJaxContext , MathJaxInline , MathJaxBlock , }

let MATHJAX_INLINE_START = "$"
let MATHJAX_INLINE_END = "$"

function MathJaxContext(props: {children: any}){
        React.useEffect(() => {
            let script = $(`
                ${""/** mathjax配置。必须先于mathjax的引入。 */}
                <script>
                    MathJax = {
                        tex: {
                            inlineMath: [["${MATHJAX_INLINE_START}", "${MATHJAX_INLINE_END}"]]
                        },
                        svg: {
                            fontCache: "global"
                        } , 
                        ignoreHtmlClass: "mathjax_ignore" , 
                        processHtmlClass: "tex2jax_process" , 
                    }
                </script>

                ${""/** mathjax的引入。 */}
                <script src="./node_modules/mathjax/es5/tex-svg.js" async></script>

                ${""/** 刷新页面。 */}
                <script>
                    setInterval(()=>{MathJax.typesetPromise()} , 2000)
                    setInterval(()=>{console.log(MathJax)} , 2000)
                </script>
            `)

            $("head").append(script)
        }, []);

          return <React.Fragment>
            {props.children}
        </React.Fragment>
}

function MathJaxInline(props: {children: any}){
    return <span className = "tex2jax_process">{props.children}</ span>
}

function MathJaxBlock(props: {children: any}){
    return <React.Fragment>$${props.children}$$</React.Fragment>
}

