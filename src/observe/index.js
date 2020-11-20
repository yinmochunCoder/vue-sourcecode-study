/**
 * 观察模式
 * @param data
 * @param asRootData
 */
export function observe(data, asRootData) {
    console.log(data)
    data.__ob__ = new Observe()
}

function Observe() {

}
