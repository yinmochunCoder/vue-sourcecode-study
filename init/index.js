import { initMixins } from './init'

// 初始化流程
function Vue(options) {
    console.log(options)
    // 判断是否是Vue的实例,this指代当前实例化的对象
    if ( !(this instanceof Vue) ) {
        console.warn("需要用new关键字实例化Vue对象")
    }
    this._init(options);
}

// vue选项初始化
initMixins(Vue)

export default Vue

