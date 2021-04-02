/***
 *  需要模块化导出的对象方法
 *  提供对象的原型方法
 ***/

// 引入具体需要处理的方法
import {initObjPrototies} from './reactiveProperty.js'

export function initObject(Obj) {
    console.log(Obj.prototype)
    // 表达式方式定义一个对象实例上的函数，所有该对象的实例都能调用该函数
    Obj.prototype._init = function(option) {
        console.log("需要处理的实例属性："+option)
        // 对象响应式属性，option为数据对象
        // 在vue中，option内容赋值给了$option，所以这里也可以传Obj这样的对象
        Obj.$options = option
        initObjPrototies(Obj)
    }
}
