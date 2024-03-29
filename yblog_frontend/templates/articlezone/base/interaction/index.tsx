/** 这个模块封装了和后端交互的一些操作。
 * @module
 */

import axios from "axios"
import $ from "jquery"
import {UniversalCache} from "./universal_cache"
import { update_id2title } from "../construction"

export { Interaction , BackendData , get_backend_data , url_from_root , urls}

var DEBUGGING = import.meta.env.DEV

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
    
    /** 当前用户是否已经登录。 
     * 注意，这个只是对于登录与否的用户可以渲染不同的页面（例如编辑按钮），不要将危险操作放在前端并依赖这个变量来控制。
    */
    logged_in: String(get_backend_data("logged_in")).toLocaleLowerCase() == "true" , 

    /** 当页面初始化好后跳转到哪里。 */
    linkto: get_backend_data("linkto") , 

    /** 只对nodetree有效，是否只编辑一层子节点。 */
    shallow: String(get_backend_data("shallow")).toLocaleLowerCase() == "true"  , 
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

let node_info_cache = new UniversalCache(5000)

function make_url(urlmaker:(nodeid:number) => string , node_id?: number){
    if(node_id == undefined)
        node_id = BackendData.node_id
    let url = urlmaker(node_id)

    return url
}

/** 这个函数从后端读取一个节点相关的信息。
 * @param urlmaker 从节点编号生成 url 的函数。
 * @param key 要从获得的数据中直接取得的项。如果为`undefined`，就直接返回从后端获得的数据。
 * @param node_id 要访问的节点的编号。默认为当前正在修改的节点。
 */
async function get_node_information(urlmaker:(nodeid:number) => string , key?: string, node_id?: number, disable_cache?: boolean){
    let data = undefined
    let url = make_url(urlmaker, node_id)
    if(!disable_cache){
        data = node_info_cache.get(url)
    }

    if(data == undefined){
        data = (await axios.get(url)).data
        node_info_cache.set(url, data)
    }
    
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
        content     : (nodeid: number)  => url_from_root( `get/node/content/${nodeid}` ) , 
        cache       : (nodeid: number)  => url_from_root( `get/node/cache/${nodeid}` ) , 
        title       : (nodeid: number)  => url_from_root( `get/node/title/${nodeid}` ) , 
        nodetree    : (nodeid: number)  => url_from_root( `get/nodetree/${nodeid}` ) , 
        shallowtree : (nodeid: number)  => url_from_root( `get/nodetree_shallow/${nodeid}` ) , 
        concept     : (nodeid: number)  => url_from_root( `get/node/concepts/${nodeid}` ) , 
        create_time : (nodeid: number)  => url_from_root( `get/node/create_time/${nodeid}` ) , 
        comments    : (nodeid: number)  => url_from_root( `get/node/comments/${nodeid}` ) , 
        resources   : (nodeid: number)  => url_from_root( `get/node/resources/${nodeid}` ) , 
        resource_info : (nodeid: number)  => url_from_root( `get/node/resource_info/${nodeid}` ) , 
        son_ids     : (nodeid: number)  => url_from_root( `get/node/son_ids/${nodeid}` ) ,  
        father_id   : (nodeid: number)  => url_from_root( `get/node/father_id/${nodeid}` ) , 
        tldr        : (nodeid: number)  => url_from_root( `get/node/tldr/${nodeid}` ) , 
        visibility  : (nodeid: number)  => url_from_root( `get/node/visibility/${nodeid}` ) , 
        indiscriminates : (nodeid: number) => url_from_root( `get/node/indiscriminates/${nodeid}` ) , 

        conceptins_location : (cins_id: number) => url_from_root( `get/conceptins/location/${cins_id}` ) , 
        referenced_by       : (cins_id: number) => url_from_root( `get/conceptins/referenced_by/${cins_id}` ) , 
    } , 
    post: {
        content : (nodeid: number) => url_from_root( `post/node/content/${nodeid}` ) , 
        cache   : (nodeid: number) => url_from_root( `post/node/cache/${nodeid}` ) , 
        comments: (nodeid: number) => url_from_root( `post/node/comments/${nodeid}` ) , 
        tldr    : (nodeid: number) => url_from_root( `post/node/generate_tldr/${nodeid}` ) , 
        nodetree: (nodeid: number) => url_from_root( `post/nodetree/${nodeid}` ) , 
        file    : (nodeid: number) => url_from_root( `post/file/${nodeid}` ) , 
        manage_recourse    : (resourceid: number) => url_from_root( `post/manage_recourse/${resourceid}` ) , 
        delete_resource    : (resourceid: number) => url_from_root( `post/delete_recourse` ) , 
    } , 
    view: {
        content: (nodeid: number , options: {linkto?: number} = {}) => {
            let linkto = options.linkto
            if(linkto != undefined){
                return url_from_root( `view/content/${nodeid}?linkto=${linkto}` ) 
            }
            return url_from_root( `view/content/${nodeid}` ) 
        }, 
        pure_printer: (nodeid: number) => {
            return url_from_root(`view/content/pure/${nodeid}`)
        } , 
    }
}

/** 这些是所有可能用到的和后端交互的函数。 */
var Interaction = {
    /** 所有从后端读取数据的函数。 */
    get: {
        content     :(nodeid: number) => get_node_information(urls.get.content     , "content"  , nodeid), 
        cache       :(nodeid: number) => get_node_information(urls.get.cache       , "cache"    , nodeid), 
        title       :(nodeid: number) => get_node_information(urls.get.title       , "title"    , nodeid), 
        nodetree    :(nodeid: number) => get_node_information(urls.get.nodetree    , "data"     , nodeid), 
        shallowtree :(nodeid: number) => get_node_information(urls.get.shallowtree , "data"     , nodeid), 
        concept     :(nodeid: number) => get_node_information(urls.get.concept     , "concepts" , nodeid), 
        create_time :(nodeid: number) => get_node_information(urls.get.create_time , undefined  , nodeid), 
        comments    :(nodeid: number) => get_node_information(urls.get.comments    , "comments" , nodeid, true), 
        resources   :(nodeid: number) => get_node_information(urls.get.resources   , "resources", nodeid), 
        resource_info: async (resouce_name: string, nodeid: number) => {
            if(nodeid == undefined){
                nodeid = BackendData.node_id
            }
            return (await axios.get(urls.get.resource_info(nodeid) , {
                params: {
                    name: resouce_name
                }
            })).data
        } , 
        
        son_ids     :async (nodeid: number) => {
            let data = await get_node_information(urls.get.son_ids, undefined, nodeid)
            let son_ids: number [] = data["son_ids"].map(x=>parseInt(x))
            let titles : string [] = data["titles"]
            let visibilitys = data["visibility"]

            // 更新Titleword的缓存
            let new_id2title = son_ids.reduce((init, son_id, idx)=>{
                return {...init, [son_id]: titles[idx]}
            }, {})
            update_id2title(new_id2title)

            for(let idx in son_ids){
                let visibility = visibilitys[idx]
                let son_id = son_ids[idx]
                let title = titles[idx]

                let url_vis = make_url(urls.get.visibility, son_id)
                node_info_cache.set(url_vis, {"visibility": visibility})

                let url_til = make_url(urls.get.title, son_id)
                node_info_cache.set(url_til, {"title": title})
            }

            return son_ids
        }, 
        father_id   :(nodeid: number) => get_node_information(urls.get.father_id    , "father_id"   , nodeid), 
        tldr        :(nodeid: number) => get_node_information(urls.get.tldr         , "tldr"        , nodeid), 
        visibility  :(nodeid: number) => get_node_information(urls.get.visibility   , "visibility"  , nodeid), 
        indiscriminates: (nodeid: number) => get_node_information(
            urls.get.indiscriminates   , "indiscriminates"  , nodeid
        ), 
        
        conceptins_location: (cins_id: number) => get_node_information(
            urls.get.conceptins_location   , "node_id"  , cins_id
        ), 
        referenced_by: (cins_id: number) => get_node_information(
            urls.get.referenced_by   , "referenced_by"  , cins_id
        ), 
    } , 

    /** 所有向后端发送数据的函数。 */
    post: {
        content     :(data: any, nodeid: number) => post_node_information(urls.post.content  , data , nodeid) , 
        cache       :(data: any, nodeid: number) => post_node_information(urls.post.cache    , data , nodeid) , 
        nodetree    :(data: any, nodeid: number) => post_node_information(urls.post.nodetree , data , nodeid) , 
        comments    :(data: any, nodeid: number) => post_node_information(urls.post.comments , data , nodeid) , 
        tldr        :(           nodeid: number) => post_node_information(urls.post.tldr     , {}   , nodeid) , 
        file        :(data: any, nodeid: number) => post_node_information(urls.post.file     , data , nodeid , {
            headers: {
                "Content-Type": "multipart/form-data"
            } ,
        }) ,  
        // XXX 或许该把 manage_recourse 的id也放到data里。
        manage_recourse: async (upload: boolean, data: any, resource_id: number) => {
            let config = upload?  { headers: { "Content-Type": "multipart/form-data" } , } : {}
            let status = (await axios.post( urls.post.manage_recourse(resource_id) , data, config)).data.status
            return status
        }, 
        delete_resource: async(resource_id: number) => {
            return (await axios.post( urls.post.delete_resource(resource_id) , {
                id: resource_id // 注意id是放在data里的。
            })).data.status
        }
    }
}

