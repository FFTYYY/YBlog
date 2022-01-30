/**
 * TODO：这个文件中的一切操作都是debug模式。
 */

import axios from 'axios'
export { axios , get_node_id }

function getCookie(name: string) {
    let cookieValue = ""
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie("csrftoken")


var root = "http://127.0.0.1:8000" // DEBUG
// var root = "/" // production

axios.defaults.baseURL = root
axios.defaults.headers.post["X-CSRFToken"] = csrftoken

function get_node_id(){
    return 1 // DEBUG
}

