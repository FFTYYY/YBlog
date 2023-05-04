/** 这个模块实现一个通用缓存机制，以免同一个页面反复向后端请求同一个信息。
 * @module
 */

export {
    UniversalCache , 
}

class UniversalCache{
    cache: {[key: string]: any}
    keys : string []
    maxsize: number
    constructor(maxsize: number){
        this.maxsize = maxsize
        this.cache = {}
        this.keys = []
    }
    get(key: string){
        return this.cache[key]
    }
    set(key: string, val:any){
        this.cache[key] = val
        this.keys.push(key)
        while(this.keys.length > this.maxsize){ // 防止超过大小
            let key = this.keys.shift()
            delete this.cache[key] // 删除出队的元素
        }
    }
}