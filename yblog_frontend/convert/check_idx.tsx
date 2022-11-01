export{check_idx}

function _get_idx_list(tree, idx_list){
    if(tree["idx"]){
        idx_list.push(tree["idx"])
    }

    if(tree["children"]){
        for(let x of tree.children){
            _get_idx_list(x, idx_list)
        }
    }
    return idx_list
}
function get_idx_list(tree){
    return _get_idx_list(tree, [])
}

function check_idx(old_tree, new_tree){
    let list_1 = get_idx_list(old_tree)
    let list_2 = get_idx_list(new_tree)

    let len_1 = list_1.length 
    let len_2 = list_2.length 

    let set_1 = new Set(list_1)
    let set_2 = new Set(list_2)
    let new_list_1 = Array.from(set_1)
    let new_list_2 = Array.from(set_2)

    let len_3 = new_list_1.length 
    let len_4 = new_list_2.length 

    if(len_1 != len_3){
        console.log("duplicated idx in old tree.")
        console.log(old_tree)
        throw new Error()
    }
    if(len_2 != len_4){
        console.log("duplicated idx in new tree.")
        console.log(new_tree)
        throw new Error()
    }

    if(len_3 != len_4){
        console.log("idx deleted.")
        throw new Error()
    }
}