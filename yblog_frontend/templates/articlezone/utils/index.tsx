import axios from 'axios'
export { csrftoken , root , axios}

var root = "http://127.0.0.1:8000" // debug
// var root = "/" // production

axios.defaults.baseURL = root;


function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
            console.log(cookie)
        }
    }
    return cookieValue;
}
const csrftoken = getCookie("csrftoken")
