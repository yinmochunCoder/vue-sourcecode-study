import { isObject } from '../utils/index'
import { arrayMethods } from "./array";

/**
 * 数据监测
 * @param data
 * @param asRootData
 */
export function observe(data) {
    // 非对象返回
    if (!isObject(data)) return

    // 创建Observe实例
    var ob = new Observe(data)
    // 暴露__ob__给array
    Object.defineProperty(data,'__ob__',{
        value: ob
    })
    if (Array.isArray(data)) {
        // 数组方法，从array的原型上继承原始方法
        console.log(arrayMethods,"arrayMethods.__proto__")
        // 重写array中的方法
        protoAugment(data,arrayMethods)
        // 监测数组
        ob.observeArray(data)
    } else {
        ob.walk(data)
    }
}
// 继承并重写array数组原型方法
function protoAugment(target,src) {
    // 将data的proto属性指向重写后的数组方法所在的实例原型中
    target.__proto__ = src
}
// class的写法
class Observe {
    constructor(value) {
        this.value = value
    }
    walk(obj) {
        let keys = Object.keys(obj)
        for ( let index = 0; index < keys.length; index++ ) {
            this.defineReactive(obj,keys[index])
        }
    }

    observeArray(obj) {
        for ( let index = 0; index < obj.length; index++ ) {
            observe(obj[index]);
        }
    }

    defineReactive(obj,key) {
        var value = obj[key]
        observe(value)
        Object.defineProperty(obj,key,{
            get() {
                return value
            },
            set(newValue) {
                value = newValue
                return value
            }
        })
    }

}

// 函数方式的写法
// function Observe(value) {
//     this.value = value
//     // 判断数据是否为数组
//     if (Array.isArray(value)) {
//
//     } else {
//         this.walk(value)
//     }
// }
//
// Observe.prototype.walk = function(obj) {
//     let keys = Object.keys(obj)
//     for ( let key = 0; key < keys.length; key++ ) {
//         this.defineReactive(obj,keys[key])
//     }
//
// }
//
// Observe.prototype.defineReactive = function(obj,key) {
//     var val = obj[key]
//     observe(val)
//     Object.defineProperty(obj,key,{
//         get() {
//             return val
//         },
//         set(newValue) {
//             obj[key] = newValue
//         }
//     })
// }


