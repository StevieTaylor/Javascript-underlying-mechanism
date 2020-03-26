/**
 *  一、数组的浅拷贝：只复制了 引用 的拷贝方法
 */
// 1. 使用concat()浅拷贝
let array_basic = [1, 'old', false, undefined, null];
console.log('basic array:', array_basic);
let array_concat = array_basic.concat();
array_concat[1] = 'new';
console.log('concat array:', array_concat);
console.log('basic array:', array_basic);

// 2. 使用slice()浅拷贝
let array_complex = [[1, 'old'], { name: 'jack', age: 26 }];
console.log('complex array:', array_complex);
let array_slice = array_complex.slice();
array_slice[0][1] = 'new';
array_slice[1].name = 'jacklove';
console.log('slice array:', array_slice);

// 3. 使用 for in 遍历实现浅拷贝
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

/**
 *  二、简易版深拷贝
 */
// 1. 使用 JSON.parse(JSON.stringify(array))的方式先字符串化再对象化
let array_mixed = [1, 'old', false, ['old', 'value'], { attr: 'old value' }];
console.log('mixed array:', array_mixed);
let array_json = JSON.parse(JSON.stringify(array_mixed));
console.log('JSON array:', array_json);
console.log('array_mixed == array_json:', array_mixed == array_json);

// 问题：无法拷贝函数function
let array_func = [function (a) { return a }, { key: function (c) { return c } }];
console.log('function array:', array_func);
let array_func_json = JSON.parse(JSON.stringify(array_func));
console.log('JSON func array:', array_func_json); // [null, {}]

// 2. 使用 for in + 递归 实现简易版深拷贝
function deepCopy(obj) {
    if (typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
console.log('mixed array:', array_mixed);
let array_deepCopy = deepCopy(array_mixed);
array_deepCopy[3][0] = 'new';
array_deepCopy[4].attr = 'new value';
console.log('deepCopy array:', array_deepCopy);

// 问题：null拷贝之后变成了{}
let response = {
    code: 0,
    msg: null,
    data: [
        { name: 'jack', age: 26 },
        { name: 'carrie', age: 24 }
    ]
}
console.log('response:', response);
let res_copy = deepCopy(response);
res_copy.data[1].age = 18;
console.log('res copy:', res_copy);

/**
 *  三、完整版深拷贝，解决3大问题：
 *         1. 循环引用
 *         2. 拷贝一些特殊的对象，比如 Set、Map、Date、Math
 *         3. 拷贝函数，普通函数和箭头函数
 */
let obj = { value: 100 };
// obj.target = obj; // 循环引用，出现无限递归的情况，导致栈溢出
// console.log('obj:', obj);

const getType = obj => Object.prototype.toString.call(obj);

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const canTraverse = {
    '[object Map]': true,
    '[object Set]': true,
    '[object Array]': true,
    '[object Object]': true,
    '[object Arguments]': true,
};
const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const handleRegExp = (target) => {
    const { source, flags } = target;
    return new target.constructor(source, flags);
}

const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if (!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (!body) return null;
    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}

const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor;
    switch (tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

const deepClone = (target, map = new Map()) => {
    if (!isObject(target))
        return target;
    let type = getType(target);
    let cloneTarget;
    if (!canTraverse[type]) {
        // 处理不能遍历的对象
        return handleNotTraverse(target, type);
    } else {
        // 这波操作相当关键，可以保证对象的原型不丢失！
        let ctor = target.constructor;
        cloneTarget = new ctor();
    }

    if (map.get(target))
        return target;
    map.set(target, true);

    if (type === mapTag) {
        //处理Map
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key, map), deepClone(item, map));
        })
    }

    if (type === setTag) {
        //处理Set
        target.forEach(item => {
            cloneTarget.add(deepClone(item, map));
        })
    }

    // 处理数组和对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map);
        }
    }
    return cloneTarget;
}
console.log('primary response:', response);
let res_clone = deepClone(response);
res_clone.data[1].age = 18;
console.log('cloned response:', res_clone);

