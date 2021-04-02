/***
 *  对象定义，引用对象方法
 */

// 引入对象方法
// 文件必须带有后缀，否则会报错
import { initObject } from "./objectFun.js";

// 定义一个对象
// 构造函数形式，需要大写
export function ExportAndImport(option) {
    // this指向调用该构造函数的实例化对象
    // console.log(this)
    // console.log(this.__proto__)
    // option是个数据对象
    this._init(option)
}

// console.log(ExportAndImport)
initObject(ExportAndImport)


// export与import
// 1、使用export与import，需要在html中用type=module引入
// 2、引入时候，文件必须带有后缀.js，否则会报错
// 3、定义一个类的时候，如果使用构造函数方式，首字母需要大写，否则会提示警告信息
// 4、对类对象的原型增加具体方法时候，其他实例可以直接使用，类对象利用.prototype增加，实例通过this调用。



