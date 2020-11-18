/**
 * 初始化数据选项
 * @param vm
 */
export function initState(vm) {
    // 获取实例选项
    var options = vm.$options
   // 初始化选项属性
    if (options.data) initData(vm)
    if (options.props) initProps(vm)
    if (options.methods) initMethods()
    if (options.watch) initWatch()
    if (options.computed) initComputed()
}

// 初始化data属性
function initData(vm) {
    let data = vm.$options.data
    console.log(data,"options.data")
    console.log(typeof data)
    // 将data赋值给vm的_data属性,data为方法返回的对象时，调用函数
    // vm._data给实例对象暴露_data属性，vue原型上增加$data属性
    data = vm._data = typeof data === 'function'
        ? getData(data,vm)
        : data || {}

    Object.defineProperty(Vue.prototype, "$data", {
        get() { return vm._data }
    })

}
// 当data为函数返回的对象时
function getData(data,vm) {
    return data.call(vm, vm)
}

function initProps() {}


function initMethods() {}
function initWatch() {}
function initComputed() {}
