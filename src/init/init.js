// 初始化Vue相关实例属性与方法
import { initState } from './state'
import { initLifecycle } from './lifecycle'
import { initEvents } from './events'

export function initMixins(Vue) {
    Vue.prototype._init = function(options) {
        let vm = this;
            vm.$options = options
        // 合并options选项数据
        mergeOptions(options)
        // 初始化实例属性数据、事件、生命周期
        initState(vm)
        initLifecycle(vm)
        initEvents(vm)
    }
}

function mergeOptions(options) {}
