/**
 * TODO：这个文件中的一切操作都是debug模式。
 */

import axios from "axios"
import $ from "jquery"

function get_csrf(): number{
    let data = $("#_data_csrf").html()
    console.log("csrf" , data)
    return data
}

// var root = "http://127.0.0.1:8000" // DEBUG
var root = "/" // production

axios.defaults.baseURL = root
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.headers.post["X-CSRFToken"] = get_csrf()

function get_node_id(): number{
    return parseInt($("#_data_nodeid").html())
}

export { axios , get_node_id , get_csrf }