import { isObject } from '../utils/index'
/**
 * 数据监测
 * @param data
 * @param asRootData
 */
export function observe(data) {
    console.log(data,"observe中获得的data")
    // 非对象返回
    if (!isObject(data)) return
    // 创建Observe实例
    var ob = new Observe(data)
}

// 函数方式的写法
function Observe(value) {
    this.value = value
    // 判断数据是否为数组
    if (Array.isArray(value)) {

    } else {
        this.walk(value)
    }
}

Observe.prototype.walk = function(obj) {
    let keys = Object.keys(obj)
    for ( let key = 0; key < keys.length; key++ ) {
        this.defineReactive(obj,keys[key])
    }

}

Observe.prototype.defineReactive = function(obj,key) {
    var val = obj[key]
    observe(val)
    Object.defineProperty(obj,key,{
        get() {
            return val
        },
        set(newValue) {
            obj[key] = newValue
        }
    })
}


