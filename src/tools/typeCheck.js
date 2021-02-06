/**
 * @description: 用于JS数据类型检测
 * @param {*} object
 * @return {*} 以字符串形式返回类型
 */
export function getType(object) {
    let type = typeof object;
    if (type !== "object") {
        return type;
    }
    // - \S用于查找非空白字符
    return Object.prototype.toString.call(object).replace(/^\[object (\S+)]$/, '$1');
}
