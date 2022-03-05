/** 这个模块封装了和后端交互的一些操作。
 * @module
 */

import axios from "axios"
import $ from "jquery"

export { Interaction , BackendData , get_backend_data , url_from_root}

var DEBUGGING = true

/** 获得一个后端发来的数据。 */
function get_backend_data(key: string): string {
    let element = $(`#_data_${key}`)
    if(!element)
        return undefined
    return element.html()
}


/** 所有从后端发送来的数据。 */
var BackendData = {

    /** csrk token。 */
    csrf: get_backend_data("csrf") , 

    /** 当前节点编号。 */
    node_id: parseInt(get_backend_data("node_id")) , 
    
    /** 当前用户是否已经登录。 */
    logged_in: get_backend_data("logged_in") , 
}



/** `root`是当前的根目录。 */
var root = DEBUGGING ? "http://127.0.0.1:8000/" : "/"

/** 这个函数将一个url转换成`root/url` */
function url_from_root(url: string){
    if(url.startsWith("/"))
        url = url.slice(1,url.length)
    
    return `${root}${url}`
}

// 设置 axios 的默认选项。
axios.defaults.baseURL = root
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.headers.post["X-CSRFToken"] = BackendData.csrf



/** 这个函数从后端读取一个节点相关的信息。
 * @param urlmaker 从节点编号生成 url 的函数。
 * @param key 要从获得的数据中直接取得的项。如果为`undefined`，就直接返回从后端获得的数据。
 * @param node_id 要访问的节点的编号。默认为当前正在修改的节点。
 */
async function get_node_information(urlmaker:(nodeid:number) => string , key?: string, node_id?: number){
    if(node_id == undefined)
        node_id = BackendData.node_id
    
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
async function post_node_information(urlmaker:(nodeid:number) => string, data: any , node_id?: number, config?: any): Promise<boolean>{
    if(node_id == undefined)
        node_id = BackendData.node_id

    let status = (await axios.post( urlmaker(node_id) , data, config)).data.status

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
        resources   : (nodeid: number)  => `get/node/resources/${nodeid}` , 
        resource_info : (nodeid: number)  => `get/node/resource_info/${nodeid}` , 
    } , 
    post: {
        content : (nodeid: number) => `post/node/content/${nodeid}` , 
        comments: (nodeid: number) => `post/node/comments/${nodeid}` , 
        nodetree: (nodeid: number) => `post/nodetree/${nodeid}` , 
        file    : (nodeid: number) => `post/file/${nodeid}` , 
        manage_recourse    : (resourceid: number) => `post/manage_recourse/${resourceid}` , 
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
        resources   :(nodeid?: number) => get_node_information(urls.get.resources   , "resources", nodeid), 
        resource_info: async (resouce_name: string, nodeid?: number) => {
            if(nodeid == undefined){
                nodeid = BackendData.node_id
            }
            return (await axios.get(urls.get.resource_info(nodeid) , {
                params: {
                    name: resouce_name
                }
            })).data
        }
    } , 

    /** 所有向后端发送数据的函数。 */
    post: {
        content     :(data: any, nodeid?: number) => post_node_information(urls.post.content  , data , nodeid) , 
        nodetree    :(data: any, nodeid?: number) => post_node_information(urls.post.nodetree , data , nodeid) , 
        comments    :(data: any, nodeid?: number) => post_node_information(urls.post.comments , data , nodeid) , 
        file        :(data: any, nodeid?: number) => post_node_information(urls.post.file     , data , nodeid , {
            headers: {
                "Content-Type": "multipart/form-data"
            } ,
        }) ,         
        manage_recourse: async (upload: boolean, data: any, resource_id: number) => {
            let config = upload?  { headers: { "Content-Type": "multipart/form-data" } , } : {}
            let status = (await axios.post( urls.post.manage_recourse(resource_id) , data, config)).data.status
            return status
        }, 
    }
}

