export { num2chinese }

/** 用中国字，因为我是 中 国（吴京.jpg） 人 */
function num2chinese(number , map?: string[]){
    if(map == undefined){
        map = ["〇","一","二","三","四","五","六","七","八","九",]
    }
    return `${number}`.split("").map((x)=>map[Number(x)]).join("")
}
