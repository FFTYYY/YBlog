export {
    object_foreach , 
    merge_object ,
}



/** 对对象的每个值进行操作，返回一个新的对象。 */
function object_foreach(obj: any , func: (o:any)=>any){
    let ret = {}
    for(let k in obj){
        ret[k] = func(obj[k])
    }
    return ret
}



// 递归合并两个对象的每一项。
function merge_object(obj_1: any, obj_2: any){
    if(obj_1 == undefined)
        return obj_2
    if(obj_2 == undefined)
        return obj_1
    
    // 但凡遇到叶子节点，优先以obj_2为准
    if(typeof obj_2 != "object"){
        return obj_2
    }
    // 但凡遇到叶子节点，就返回。
    if(typeof obj_1 != "object"){
        return obj_1
    }

    let ret = {}
    for(let key in {...obj_1,...obj_2}){
        ret[key] = merge_object(obj_1[key] , obj_2[key])
    }
    return ret
}
