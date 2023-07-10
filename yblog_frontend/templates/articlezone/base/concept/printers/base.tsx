import * as React from "react"
import { Grid , Box , 
    Link, ThemeOptions , Dialog, Tooltip  , Badge  , Button , Paper , IconButton  ,  } from "@mui/material"
import {
    PrinterPartBox , 
    ScrollBarBox, 
    auto_renderer , 
    AbstractNode ,    
    Printer , 
    ConceptNode , 
    PrinterRenderFunctionProps , 
    PrinterRenderFunction , 
    GlobalInfo , 
    ContexterBase , 
    PreprocessFunction , 
    DefaultPrinterComponent , 
    DefaultAbstractAsRoot, 
    AutoStack,
    AutoTooltip,
    PrinterParagraphBox,
    PrinterNewLevelBox, 
	ThemeContext , 
    DefaultAbstractRendererAsProperty, 
    Context, 
} from "@ftyyy/ytext"

import {
    Acanthus,
    BaoXiangHua, MeiGui , MeiGui2,  
} from "../../../assets"
import { BaJiao, LiuBian, SanJiao, LiuJiaoYuan, FangSheng, Acanthus2 } from "../../../assets/decors"
import {
    Interaction
} from "../../interaction"
import {
    TitleWord
} from "../../construction/titleword"
import { num2chinese } from "../../utils"

export {
    ErrorPrinter , 
    ReferencePrinter , 
    ShowIDXPrinter , 
    StandardAttachers , 
}


/**
 * 这个组件用来包裹一个渲染错误的概念。
 * 
 */
function ErrorPrinter(props: {children: any, msg?: string, inline?: boolean}){

    let display = props.inline ? "inline-block" : "block"
    return <div className="yblog-error" data-yblog-errormsg={props.msg} style={{display: display}}>
        {props.children}
        <AutoTooltip title={props.msg}><div style={{display: "inline-block"}}>
            <MeiGui2 fill="rgba(230,20,20,0.65)" strokeWidth="17px" style={{
                width: "1rem" , 
                height: "1rem" , 
                marginBottom: "-0.13rem",
                marginLeft: "0.2rem" , 
                marginRight: "0.4rem" , 
                display: "inline-block" , 
            }} />
        </div></AutoTooltip>
    </div>
}

/**
 * 这个组件是一个语法糖，其同时用`DefaultAbstractRendererAsProperty`、`ReferencePrinter`
 * 和`ShowIDXPrinter`这三个组件来包裹元素。
 */
function StandardAttachers(props: {children?: any, context: Context, node: ConceptNode, parameters?: any, inline?: boolean}){
    let {node, context, children, parameters, inline} = props
    children = children || <></>

    return <DefaultAbstractRendererAsProperty {...{node, context, parameters}} senario="title">
        <ReferencePrinter {...{node, parameters, inline}}>
            <ShowIDXPrinter {...{node, inline}}>
                {children}
            </ShowIDXPrinter>
        </ReferencePrinter>
    </DefaultAbstractRendererAsProperty>
}

/**
 * 这个组件指出一个概念的被引用次数。
 */
function ReferencePrinter(props: {children?: any, node: ConceptNode, parameters?: any, inline?: boolean}){
    let children = props.children || <></>

    let [referencers , set_referencers] = React.useState<[number, number] []>([])
    React.useEffect(()=>{(async ()=>{
        let data = await Interaction.get.referenced_by(props.node.idx)
        set_referencers(data)
    })()}, [])

    if(referencers.length == 0){
        return children
    }

    // 统计每个文章里出现了几次引用
    let count = {}
    for(let [nodeid, _] of referencers){
        if(count[nodeid] == undefined){
            count[nodeid] = 0
        }
        count[nodeid] ++ 
    }

    // 决定称呼
    let my_name = (props.parameters?.label) || props.node.concept

    let reference_comp = <Box style={{paddingRight: "5%", width: "20rem"}}>
        <PrinterParagraphBox>
            本{my_name}被引用{num2chinese(referencers.length)}次。
            {Object.keys(count).length > 1 ? "分别" : "皆"}在
        </PrinterParagraphBox>
        <PrinterNewLevelBox>{Object.keys(count).map((nodeid, idx)=>{
            return <React.Fragment key={idx}>
                <Link href={`./${nodeid}`} style={{color: "inherit"}}><TitleWord node_id={parseInt(nodeid)}/></Link>
                <span>（{num2chinese(count[nodeid])}次）,</span>
            </React.Fragment>
        })}
        </PrinterNewLevelBox>
        <PrinterParagraphBox>中。</PrinterParagraphBox>
    </Box>

    let display = props.inline ? "inline-block" : "block"
    return <Box style={{display: display}}>
        {children}
        <Tooltip title={reference_comp}><div style={{display: display}}>
            <LiuBian fill="rgba(20,120,240,0.4)" strokeWidth="6px" strokeColor="rgba(0,0,0,0.7)" style={{
                top: "-5px", 
                left: "2px" , 
                marginRight: "5px" , 
                width: "10px" , 
                height: "10px" , 
                display: "inline-block" , 
                position: "relative" , 
                transform: "scaleY(-1)",
            }} />
        </div></Tooltip>
    </Box>
}

/**
 * 这个组件显示一个组件的编号。
 */
function ShowIDXPrinter(props: {children?: any, node: ConceptNode, inline?: boolean}){
    let children = props.children || <></>

    let [show_by_text, set_sbt] = React.useState<boolean>(false)

    let globalinfo = React.useContext(GlobalInfo)
    if(!globalinfo.activate_idx){
        return <>{children}</>
    }

    let display = props.inline ? "inline-block" : "block"
    return <Box style={{display: display}} >
        {children}
        <Tooltip title={`本节点的ID是 ${props.node.idx}`}><div style={{display: display}} onClick={()=>{
            set_sbt(!show_by_text)
        }}>
            <LiuJiaoYuan fill="rgba(120,120,120,0.1)" strokeWidth="20px" strokeColor="rgba(90,20,20,1.0)" style={{
                top: "-5px", 
                left: "2px" , 
                marginRight: "5px" , 
                width: "10px" , 
                height: "10px" , 
                display: "inline-block" , 
                position: "relative" , 
                transform: "scaleY(-1)",
            }} />
        </div></Tooltip>
        {show_by_text ? <>[{props.node.idx}]</> : <></>}
    </Box>
}