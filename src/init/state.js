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
    if (options.methods) initMethods(vm,options.methods)
    if (options.watch) initWatch(vm,options.watch)
    if (options.computed) initComputed(vm,options.computed)
}

// 初始化data属性
function initData(vm) {
    let data = vm.$options.data
    // 将data赋值给vm的_data属性,data为方法返回的对象时，调用函数
    // vm._data给实例对象暴露_data属性，vue原型上增加$data属性
    data = vm._data = typeof data === 'function'
        ? getData(data,vm)
        : data || {}

    Object.defineProperty(Vue.prototype, "$data", {
        get() { return vm._data }
    })
    var keys = Object.keys(data)
    keys.forEach(key => {
        Object.defineProperty(Vue.prototype, key, {
            value: data[key]
        })

    })
}
// 当data为函数返回的对象时,指定this到vm上，同时执行data函数
function getData(data,vm) {
    return data.call(vm, vm)
}

function initProps(vm) {

}

// 初始化方法，并挂载到vue实例
function initMethods(vm,methods) {
    // 将方法依次加入对象实例中，并绑定方法的当前对象为vue实例
    for(const key in methods) {
        vm[key] = typeof methods[key] !== 'function'
                ? function(a,b,c) {}
                : methods[key].bind(vm);
    }
}
function initWatch() {}

// 初始化计算属性，并挂载到vue实例
function initComputed(vm,computed) {
    // 为vue暴露_computedWatchers属性,并将其__proto__属性指向null，vm._computedWatchers = {}
    vm._computedWatchers = Object.create(null)
    for(const key in computed) {
        Object.defineProperty(vm._computedWatchers, key, {
            value: computed[key]
        })
    }
}
