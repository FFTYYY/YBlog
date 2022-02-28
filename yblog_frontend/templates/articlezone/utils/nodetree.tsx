
export {raw_to_processed , processed_to_raw , generate_id2node}
export type {raw_info_item , info_item}

/** 每个 raw_info_item 是从后端获得的一组原始数据，这组数据稍后被解析成 info_item 树。
 * 三个元素依次表示 id 、father_id 、idx_in_father。
*/
type raw_info_item = [number,number,number] // 树项 

/**  info_item 用于描述节点树。 */
interface info_item {
    my_id: number
    father_id: number 
    sons: info_item[]
    idx_in_father? : number
}

/** 给定 nodetree，这个函数生成一个 id 到树节点的映射。 
 * @param node 节点树的根。
*/
function generate_id2node(node: info_item){
    function _generate_id2node(nownode: info_item, id2node: {[id: number]: info_item}){
        id2node[nownode.my_id] = nownode
        for(let nd of nownode.sons)
            _generate_id2node(nd , id2node)
        return id2node
    }
    return _generate_id2node(node , {})
}


/** 这个函数将三元组形式的描述转换成树形的描述。 
 * @param raw_nodetree （后端发来的）三元组形式的节点树描述。
 * @param root_id 这颗子树的根节点。
*/
function raw_to_processed(raw_nodetree: raw_info_item[] , root_id: number = -1){
    raw_nodetree.sort(((x1: raw_info_item,x2: raw_info_item) => x1[2]<x2[2]?1:0)) // 按父节点内的顺序排序

    // 如果不是完整的树，那么将根节点的1前一个节点设为`-1`。
    if(root_id > 0){
        let raw_root_node = raw_nodetree.filter(x=>x[0] == root_id)[0] // `root_id`对应的节点。
        raw_root_node[1] = -1 // 根节点的前一个节点设为`-1`
    }

    let _raw_to_processed = (father_id: number): info_item[] => {
        return Object.values( raw_nodetree.filter(x=>x[1] == father_id) ).map((val:raw_info_item)=>{ return {
            my_id: val[0],
            father_id: father_id,
            sons: _raw_to_processed(val[0])
        }})
    }

    return {
        my_id: -1,
        father_id: -1,
        sons: _raw_to_processed(-1)
    }
}

/** 这个函数将对节点树的树形的描述转换成三元组的描述。 
 * @param nodetree 节点树的树形描述。
*/
function processed_to_raw(nodetree: info_item){

    let _processed_to_raw = (node:info_item , idx_in_father: number): raw_info_item[] =>{
        let res = [ [node.my_id , node.father_id , idx_in_father] as raw_info_item ]
        if(node.my_id < 0) // 不要包含一个编号小于0的节点。
            res = []

        for(let idx in node.sons){
            let subid = parseInt(idx)
            res = [...res , ... _processed_to_raw(node.sons[subid] , subid)]
        }
        return res
    }

    return _processed_to_raw( nodetree , -1 )
}

