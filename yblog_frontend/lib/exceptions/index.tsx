export {
    UnexpectedParametersError , 
    BadNodeError , 
    ImpossibleError , 
}

/** 这个异常表示函数遇到了不符合约定的参数。 */
class UnexpectedParametersError extends Error{
    constructor(msg: string){
        super(msg)
        Object.setPrototypeOf(this, UnexpectedParametersError.prototype);
    }
}

/** 这个异常表示遇到了不符合约定的节点。 */
class BadNodeError extends Error{
    constructor(msg: string){
        super(msg)
        Object.setPrototypeOf(this, BadNodeError.prototype);
    }
}


/** 这个异常表示执行了必不可能执行的代码，例如枚举完所有可能的情况之后。 */
class ImpossibleError extends Error{
    constructor(msg: string){
        super(msg)
        Object.setPrototypeOf(this, ImpossibleError.prototype);
    }
}

/** 这个函数对某个对象的属性做断言，如果不符合断言则返回异常。 
 * @param obj 要检测的对象
 * TODO 没写完
*/
function assert_properties<key , type>(obj: any){
    let s = "" as key
    //
}