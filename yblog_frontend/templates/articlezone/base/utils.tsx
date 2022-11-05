import {
    SecondClassConcept , 
    Node , 
} from "../lib"


export {parse_second_concepts}

/** 这个函数把从后端获得的二级函数转换成YText需要的格式。 */
function parse_second_concepts(sec_concepts_data){
	let sec = sec_concepts_data.reduce((obj,x)=>{
		if(!x){
			return obj
		}
		return {...obj, ...JSON.parse(x)}
	}, {})

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

