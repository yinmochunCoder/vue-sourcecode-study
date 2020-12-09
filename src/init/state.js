import { observe, Observe } from "../observe/index";

/**
 * 初始化数据选项
 * @param vm
 */
export function initState(vm) {
    // 获取实例选项
    var options = vm.$options
   // 初始化选项属性
    if (options.data) initData(vm)
    if (options.props) initProps(vm,options.props)
    if (options.methods) initMethods(vm,options.methods)
    if (options.watch) initWatch(vm,options.watch)
    if (options.computed) initComputed(vm,options.computed)
}

// 初始化data属性
function initData(vm) {
    let data = vm.$options.data
    // 将data赋值给vm的_data属性,data为方法返回的对象时，调用函数
    // vm._data给实例对象暴露_data属性，vue原型上增加$data属性，便于用户访问数据
    data = vm._data = typeof data === 'function'
        ? getData(data,vm)
        : data || {}
    // 给vue实例增加$data属性
    Object.defineProperty(Vue.prototype, "$data", {
        get() { return vm._data }
    })
    // 将vue属性进行代理
    let keys = Object.keys(data)
    var i = keys.length
    while(i--) {
        let key = keys[i]
        proxy(vm,'_data',key)
    }
    observe(data)
}

// 当data为函数返回的对象时,指定this到vm上，同时执行data函数
function getData(data,vm) {
    return data.call(vm, vm)
}

function initProps(vm,propsOptions) {
    // 暴露_props属性
    var props = vm._props = {}
    var loop = function(key) {
        // 需要实例化class之后，才能调用class上的方法
        var ob = new Observe()
        // 将props属性添加到响应式系统里
        ob.defineReactive(vm,key)
        // 将属性增加到props下
        Object.defineProperty(props,key,{
            value: propsOptions[key]
        })
        // props属性进行代理
        if (Object.keys(props).length !== 0) {
            proxy(vm,"_props",key)
        }
    }
    for (let key in propsOptions )
        loop(key)
    console.log(vm._prop, "vm._prop")
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

// vue属性实现代理，方位vue._data.property = vue.property
function proxy(target, sourcreKey, key) {
    Object.defineProperty(target, key, {
        get() {
            return this[sourcreKey][key]
        },
        set(val) {
            this[sourcreKey][key] = val
        }
    })
}
