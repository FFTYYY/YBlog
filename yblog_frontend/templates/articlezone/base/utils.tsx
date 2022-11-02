import {
    SecondClassConcept , 
} from "@ftyyy/ytext"

export { 
    num2chinese  , 
    rem2num , 
    num2rem , 
    remtimes , 

    parse_second_concepts , 
}

/** 用中国字，因为我是 中 国（吴京.jpg） 人 */
function num2chinese(number: number , map?: string[]){
    if(map == undefined){
        map = ["〇","一","二","三","四","五","六","七","八","九",]
    }
    return `${number}`.split("").map((x:string)=>(map as string[])[Number(x)]).join("")
}

/** 将`xxxrem`形式的字符串转换成数字。 */
function rem2num(rem:string){
	return Number( rem.slice(0,rem.length-3) )
}

/** 将数字转换成`"xxxrem"`形式的字符串。 */
function num2rem(num: number){
	return `${num}rem`
}

/** 将`xxxrem`形式的字符串乘以数字。 */
function remtimes(rem:string , num: number){
	return  num2rem( rem2num(rem) * num )
}

/** 这个函数把从后端获得的二级函数转换成YText需要的格式。 */
function parse_second_concepts(sec){
	let ret: SecondClassConcept[] = []
	for(let x in sec){
		let info = sec[x]
		ret.push( new SecondClassConcept({
			name: x , 
			type: info.type , 
			first_concept: info.first , 
			default_override: info.default , 
			fixed_override: info.fixed , 
		}))
	}
	return ret
}

