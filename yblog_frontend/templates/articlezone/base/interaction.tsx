/** 这个模块封装了和后端交互的一些操作。
 * @module
 */

import { axios , get_node_id , get_csrf } from "../utils"
export { Interaction }


/** 可能用到的所有 url。
 * 注意每项是一个函数，用于从必要的信息生成`url`。
 */
var urls = {
    get:{
        content     : (nodeid: number)  => `get_node_content/${nodeid}` , 
        nodetree    : (nodeid: number)  => `get_nodetree/${nodeid}` , 
        concept     : (nodeid: number)  => `get_node_concepts/${nodeid}` , 
        create_time : (nodeid: number)  => `get_node_create_time/${nodeid}` , 
        comments    : (nodeid: number)  => `get_node_comments/${nodeid}` , 
    } , 
    post: {
        content : (nodeid: number) => `post_node_content/${nodeid}` , 
        comments: (nodeid: number) => `post_node_comments/${nodeid}` , 
        nodetree: (nodeid: number) => `post_nodetree/${nodeid}` , 
    }
}

/** 这个函数从后端读取一个节点相关的信息。
 * @param urlmaker 从节点编号生成 url 的函数。
 * @param key 要从获得的数据中直接取得的项。如果为`undefined`，就直接返回从后端获得的数据。
 * @param node_id 要访问的节点的编号。默认为当前正在修改的节点。
 */
async function get_node_information(urlmaker:(nodeid:number) => string , key?: string, node_id?: number){
    if(node_id == undefined)
        node_id = get_node_id()
    
    let data = (await axios.get(urlmaker(node_id))).data
    
    if(key != undefined)
        data = data[key]

    return data
}
/** 这个函数向后端发送一些信息。
 * @param urlmaker 从节点编号生成 url 的函数。
 * @param data 要发送的数据。
 * @param node_id 要访问的节点的编号。默认为当前正在修改的节点。
 */

async function post_node_information(urlmaker:(nodeid:number) => string, data: any , node_id?: number): Promise<boolean>{
    if(node_id == undefined)
        node_id = get_node_id()

    let status = (await axios.post( urlmaker(node_id) , data)).data.status

	return status
}

/** 这些是所有可能用到的和后端交互的函数。 */
var Interaction = {
    get: {
        content     :(nodeid?: number) => get_node_information(urls.get.content     , "content"  , nodeid), 
        nodetree    :(nodeid?: number) => get_node_information(urls.get.nodetree    , "data"     , nodeid), 
        concept     :(nodeid?: number) => get_node_information(urls.get.concept     , "concepts" , nodeid), 
        create_time :(nodeid?: number) => get_node_information(urls.get.create_time , undefined  , nodeid), 
        comments    :(nodeid?: number) => get_node_information(urls.get.comments    , "comments" , nodeid), 
    } , 
    post: {
        content     :(data: any, nodeid?: number) => post_node_information(urls.post.content  , data , nodeid) , 
        nodetree    :(data: any, nodeid?: number) => post_node_information(urls.post.nodetree , data , nodeid) , 
        comments    :(data: any, nodeid?: number) => post_node_information(urls.post.comments , data , nodeid) , 
    }
}
