/** 这个模块封装了和后端交互的一些操作。
 * @module
 */

import axios from "axios"
import $ from "jquery"

export { Interaction , get_node_id }

var DEBUGGING = true

/** 这个函数读取后端发送过来的`csrf_token`。 */
function get_csrf(): number{
    let data = $("#_data_csrf").html()
    console.log("csrf" , data)
    return data
}

/** 这个函数读取后端发送过来的当前节点编号。 */
function get_node_id(): number{
    return parseInt($("#_data_nodeid").html())
}

/** `root`是当前的根目录。 */
var root = DEBUGGING ? "http://127.0.0.1:8000" : "/"


// 设置 axios 的默认选项。
axios.defaults.baseURL = root
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.headers.post["X-CSRFToken"] = get_csrf()



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

/** 可能用到的所有 url。
 * 注意每项是一个函数，用于从必要的信息生成`url`。
 */
var urls = {
    get:{
        content     : (nodeid: number)  => `get/node/content/${nodeid}` , 
        nodetree    : (nodeid: number)  => `get/nodetree/${nodeid}` , 
        concept     : (nodeid: number)  => `get/node/concepts/${nodeid}` , 
        create_time : (nodeid: number)  => `get/node/create_time/${nodeid}` , 
        comments    : (nodeid: number)  => `get/node/comments/${nodeid}` , 
    } , 
    post: {
        content : (nodeid: number) => `post/node/content/${nodeid}` , 
        comments: (nodeid: number) => `post/node/comments/${nodeid}` , 
        nodetree: (nodeid: number) => `post/nodetree/${nodeid}` , 
    }
}

/** 这些是所有可能用到的和后端交互的函数。 */
var Interaction = {
    /** 所有从后端读取数据的函数。 */
    get: {
        content     :(nodeid?: number) => get_node_information(urls.get.content     , "content"  , nodeid), 
        nodetree    :(nodeid?: number) => get_node_information(urls.get.nodetree    , "data"     , nodeid), 
        concept     :(nodeid?: number) => get_node_information(urls.get.concept     , "concepts" , nodeid), 
        create_time :(nodeid?: number) => get_node_information(urls.get.create_time , undefined  , nodeid), 
        comments    :(nodeid?: number) => get_node_information(urls.get.comments    , "comments" , nodeid), 
    } , 

    /** 所有向后端发送数据的函数。 */
    post: {
        content     :(data: any, nodeid?: number) => post_node_information(urls.post.content  , data , nodeid) , 
        nodetree    :(data: any, nodeid?: number) => post_node_information(urls.post.nodetree , data , nodeid) , 
        comments    :(data: any, nodeid?: number) => post_node_information(urls.post.comments , data , nodeid) , 
    }
}
