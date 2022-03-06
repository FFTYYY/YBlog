/** 这个模块封装了对节点树的一些操作。
 * 一个节点树有两种表示方式：原始表示和处理之后的表示。原始表示是后端存储时使用的表示，和后端进行交互时会使用这种表示。
 * 而处理后的表示是更适合使用的表示。
 * @module
 */

export { Nodetree }
export type {raw_info_item , info_item}

/** 每个`raw_info_item`是从后端获得的一组原始数据，这组数据稍后被解析成`info_item`树。
 * 三个元素依次表示`id`、`father_id`、`idx_in_father`、`secret`。其中`secret`表示节点的可见性。
*/
type raw_info_item = [number,number,number,boolean] // 树项 

/** `info_item`用于描述处理后的节点树。 
 * 每个节点会有一个`id`，这个`id`从`1`开始编号，是后端储存时用的编号。
*/
interface info_item {
    my_id: number
    father_id: number 
    sons: info_item[]
    idx_in_father? : number
    secret: boolean
}

/** 给定 nodetree，这个函数生成一个 id 到树节点的映射。 
 * @param node 节点树的根。
*/
function generate_id2node(node: info_item): {[id: number]: info_item}{
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
function raw_to_processed(raw_nodetree: raw_info_item[] , root_id: number = -1): info_item{
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
            sons: _raw_to_processed(val[0]) , 
            secret: val[3] , 
        }})
    }

    return {
        my_id: -1,
        father_id: -1,
        sons: _raw_to_processed(-1), 
        secret: true , 
    }
}

/** 这个函数将对节点树的树形的描述转换成三元组的描述。 
 * @param nodetree 节点树的树形描述。
*/
function processed_to_raw(nodetree: info_item){

    let _processed_to_raw = (node:info_item , idx_in_father: number): raw_info_item[] =>{
        let res = [ [node.my_id , node.father_id , idx_in_father , node.secret] as raw_info_item ]
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

/** 这个类封装对节点树的操作。 */
class Nodetree{

    /** 根节点的编号。 
     * 因为输入的可能是一棵子树，根节点的父节点可能还是有记录。因此需要外部输入根节点信息。
    */
    root_id?: number

    /** 处理好的节点树。 */
    nodetree: info_item

    /** 将节点编号映射成节点的映射。 */
    _id2node: {[key: number]: info_item}

    /** 初始化一棵节点树。
     * @param raw_nodeinfos 原始表示的树信息。
     * @param root_id 根节点的编号。如果输入的是一棵子树，则需要输入根节点编号。
     */
    constructor(raw_nodeinfos?: raw_info_item[] , root_id?: number){
        if(raw_nodeinfos != undefined){
            this.update_rawinfo(raw_nodeinfos , root_id)
        }
    }

    /** 复制一棵全新的相同结构的节点树。 */
    deepcopy(){
        return new Nodetree(
            this.get_raw() , 
            this.root_id , 
        )
    }

    /** 这个函数输入一个节点树并用来更新储存的节点树。 */
    update_nodetree(nodetree: info_item){
        this.nodetree = nodetree
        this._id2node = generate_id2node(nodetree)
        return this
    }

    /** 这个函数输入一些原始信息并用来更新储存的节点树。 */
    update_rawinfo(raw_nodeinfos: raw_info_item[], root_id?: number){
        this.root_id = root_id
        let nodetree = raw_to_processed(raw_nodeinfos , root_id)
        this.update_nodetree(nodetree)
        return this
    }

    /** 给定`id`，询问一个树节点。 */
    id2node(nodeid: number){
        return this._id2node[nodeid]
    }

    /** 获得当前树的原始形式。 */
    get_raw(){
        return processed_to_raw(this.nodetree)
    }

    /** 获取树根。 */
    get_root(): info_item{
        return this.nodetree
    }

    /** 询问`nodef`是否是`nodes`的父节点。
     */
    is_son(nodef_id: number , nodes_id: number): boolean{
        while(true){
            nodes_id = this.id2node(nodes_id).father_id // 向上行。
            if(nodes_id == -1)
                break
            if(nodes_id == nodef_id)
                return true
        }
        return false
    }
}
