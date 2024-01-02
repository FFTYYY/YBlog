import{D as p,a as t,$ as n,j as o,b as m}from"./titleword.1346116c.js";let l="$",c="$",d="$$",h="$$";function s(e){e.startup.document.state(0),e.texReset(),e.typeset(),e.typesetClear()}var f=new p(()=>{let e=window.MathJax;e!=null&&e.typesetPromise!=null&&(s(e),e.typesetPromise(),s(e))},1e3);function r(){f.go()}function x(e){return t.useEffect(()=>{let i=n(`
            
            <script defer>
                MathJax = {
                    config: ["MMLorHTML.js"],
                    jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
                    extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],

                    loader: {load: ["[tex]/boldsymbol"]},
                    tex: {
                        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"] , 
                        packages: {"[+]": ["tagformat", "boldsymbol"]} , 
                        inlineMath: [["${l}", "${c}"]] , 
                        displayMath: [["${d}", "${h}"]] , 
                        tags: "ams" , 
                        
                    },
                    svg: {
                        fontCache: "global" , 
                        scale: 1.0 , 
                    } , 
                    ignoreHtmlClass: "mathjax_ignore" , 
                    processHtmlClass: "mathjax_process" , 
                    preRemoveClass: "mathjax_preview" , 
                }
            <\/script>

            <script type="text/javascript" id="MathJax-script" defer
              src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml-full.js">
            <\/script>
            
            <style>
                mjx-merror mjx-utext{
                    width: 100% !important;
                    padding: 0 !important;
                }
                mjx-merror mjx-container{
                    margin: 0 !important;
                }
                mjx-merror{
                    background-color: rgba(0,0,0,0) !important;
                    color: inherit !important;
                }

            </style>
        `);return setTimeout(()=>{n("head").append(i)},1e3),()=>{i.remove()}},[]),o(t.Fragment,{children:e.children})}function y(e){return t.useEffect(()=>{r()},[e.children]),m("span",{className:"mathjax_process",children:[l,e.children,c]})}function j(e){return t.useEffect(()=>{r()},[e.children]),m("div",{className:"mathjax_process",children:[d,e.children,h]})}function b(e){return t.useEffect(()=>{r()},[e.children]),o("div",{className:"mathjax_process",children:e.children})}let a={symbol:{reference:"#6baed6",abstract:"#7fcdbb",error:"rgba(230,20,20,0.65)"},text:{on_primary:"rgb(230,230,230)",weak_on_primary:"rgb(150,150,150)",anti_on_primary:"rgb(20,20,20)",on_secondary:"rgb(250,250,250)",weak_on_secondary:"rgb(220,220,220)",link:"#40797E",info:"#777788"},background:{primary:"#324347",anti_primary:"#B0B0B0",secondary:"#546A54"}},g={divider:"#060606",mode:"light",primary:{main:a.background.primary},info:{main:a.text.info},secondary:{main:a.background.secondary},background:{default:"rgba(250,250,250,1)",paper:"rgba(250,250,250,1)"},text:{primary:"rgb(6,6,6)",secondary:"rgba(6,6,6,0.70)",disabled:"rgba(6,6,6,0.5)"}};const _={mui:{palette:g},my_palette:a,printer:{margins:{paragraph:"0.4rem",special:"1.0rem",colon:"1rem",level:"2rem"},fonts:{body:{fontFamily:"STXihei",fontSize:"1.0rem",lineHeight:"1.5rem"},title:{fontFamily:"SimHei",fontSize:"1.0rem",lineHeight:"1.5rem"},structure:{fontFamily:"SimHei",fontSize:"1.0rem",lineHeight:"1.5rem"},display:{fontFamily:"KaiTi",fontSize:"1.1rem",lineHeight:"1.5rem"},weaken:{fontFamily:"FangSong",fontSize:"1.0rem",lineHeight:"1.5rem"}}}};export{x as M,j as a,y as b,b as c,r as d,f,_ as m};
