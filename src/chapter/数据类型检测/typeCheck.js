console.log('-------------------Javascript类型检测-------------------');

// 以下是13种待检测数据：
const number = 1; // [object Number]
const string = '123'; // [object String]
const boolean = true; // [object Boolean]
const undefine = undefined; // [object Undefined]
const nul = null; // [object Null]
const symbol = Symbol('symbol'); //
const object = { a: 1 }; // [object Object]
const array = [1, 2, 3]; // [object Array]
const date = new Date(); // [object Date]
const error = new Error(); // [object Error]
const reg = /a/g; // [object RegExp]
const math = Math;
const func = function a() {}; // [object Function]
const checkArray = [number, string, boolean, undefine, nul, symbol, object, array, date, error, reg, math, func];
console.log(checkArray);

/**
 * 一、使用 typeof 关键字进行检测
 *        1.对于基本类型，除了null检测为object以外，均返回正常
 *        2.对于引用类型，除了function检测为function以外，其余均返回object
 */
console.log('-------------------typeof-------------------');
typeofArray = checkArray.map((item) => typeof item);
// ["number", "string", "boolean", "undefined", "object", "symbol", "object", "object", "object", "object", "object", "object", "function"]
console.log(typeofArray);

/**
 * 二、使用 instanceof 进行检测
 *        1.instanceof：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
 *        2.对于基本类型，无法用instanceof检测
 *        3.对于引用类型，instanceof检测并不准确
 */
console.log('-------------------instanceof-------------------');
console.log(number instanceof Number); // false
const num_ctor = new Number(1);
console.log(num_ctor instanceof Number); // true
console.log(num_ctor instanceof Object); // true

console.log(array instanceof Array); // true
console.log(array instanceof Object); // true

/**
 *  三、使用constructor检测
 *         1.对于基本类型，可以用其对应的构造器来检测
 *         2.对于特殊的对象类型，可以用其对应的构造器来检测
 *         3.局限性：类的原型可以重写，constructor可能会被覆盖
 */
console.log('-------------------constructor-------------------');
console.log(number.constructor === Number); // true
console.log(symbol.constructor === Symbol); // true

console.log(date.constructor === Date); // true
console.log(date.constructor === Object); // false

/**
 *  四、使用Object.prototype.toString.call()检测
 *         1.该方法准确的能判断出各种数据的类型
 *         2.返回的是 "[Object Class]"的形式，Class为具体的类型
 */
const toStringArr = checkArray.map((item) => Object.prototype.toString.call(item));
// ["[object Number]", "[object String]", "[object Boolean]", "[object Undefined]", "[object Null]", "[object Symbol]",
// "[object Object]", "[object Array]", "[object Date]", "[object Error]", "[object RegExp]", "[object Math]", "[object Function]"]
console.log(toStringArr);
