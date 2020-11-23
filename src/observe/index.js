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
    //创建ob实例
    var ob = new Observe()

    let keys = Object.keys(data)
    keys.forEach(key => {
        Object.defineProperty(vm,key,{
            get() {
                return data[key]
            },
            set(newValue) {
                data[key] = newValue
            }
        })
    })
}

function Observe() {

}
