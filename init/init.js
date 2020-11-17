// 初始化ixins
export function initMixins(Vue) {
    Vue.prototype._init = function(options) {
        console.log(this)
        // 合并options
        // 合并选项状态
        initState(options)
    }
}
