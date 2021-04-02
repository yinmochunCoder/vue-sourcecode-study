/***
 *  对象属性的响应式原理
 * **/


export function initObjPrototies(Obj) {
    let dataObj = Obj.$options.data
    // 给Obj暴露data属性，修改属性
    Obj.prototype.data = dataObj
    if (dataObj) {
        // 放到observe中处理，dataObj必须是一个对象
        observe(dataObj)
    }
}


function observe(data) {
    // 判断是否是对象
    if (!(data !== null && typeof data === 'object'))  return
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
        defineReactive(data, keys[i], data[keys[i]])
    }
}


function defineReactive(obj, prop, value) {
    // value如果是个对象
    observe(value)
    Object.defineProperty(obj,prop,{
        get() {
            return value
        },
        set(newVal) {
            // 对改变的属性同样增加set与get属性
            if(value !== newVal) {
                observe(newVal)
                value = newVal
            }

        }
    })
}


// vue数据的响应式原理，主要是使用了Object.defineProperty方法,为每一个data对象属性设置了get与set方法
// 通过get获取值，通过set修改属性值，从而达到响应式原理
//
// 属性有可能也是对象类型的，因此需要递归调用，为data中的所有属性设置set与get方法
// 无限递归也导致响应效率慢
