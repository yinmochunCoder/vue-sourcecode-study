export const arrayMethods = Object.create(Array.prototype)

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'splice',
    'sort'
]

methodsToPatch.forEach(method => {
    // 函数劫持，首先获取原始方法
    var original = arrayMethods[method]
    Object.defineProperty(arrayMethods,method, {
        value: function mutator() {
            // 获取传入参数
            var args = [], length = arguments.length
            while(length--) args[length] = arguments[length]
            //　执行继承的原始方法，指定传入this值，参数
            var result = original.apply(this,args),
                insterd, ob = this.__ob__;
            console.log(this,'arrayMethods下的this')
            // 对新增的方法进行自定义
            switch (method) {
                case 'push':
                case 'unshift':
                    insterd = args
                    break;
                case 'splice':
                    // 获取第三个值参数，监控第三个值
                    insterd = args.slice(2)
                    break
            }
            if(insterd) { ob.observeArray(insterd) }
            return result
        }
    })
})
