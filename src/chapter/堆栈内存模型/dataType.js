console.log('-------------------Javascript 8种数据类型-------------------');

/**
 * primitive原始数据类型：除 Object 以外的所有类型都是不可变的（值本身无法被改变）
 * 也叫基本数据类型，共7种(最新的ECMAScript标准)
 *     1.number 数字类型
 *     2.string     字符串类型
 *     3.boolean 布尔类型
 *     4.null        对空类型
 *     5.undefined 未定义类型
 *     6.symbol  符号类型
 *     7.bigInt    大整数类型
 */
// 1.number 数字类型,双精度 64 位二进制格式的值 -(2^53 -1) 到 +(2^53 -1)
let num = 1;
let positive_inf = Infinity;
let negative_inf = -Infinity;
console.log('正无穷:', positive_inf);
console.log('负无穷', negative_inf);
console.log(typeof positive_inf);
let notAnum = NaN;
console.log(notAnum, typeof notAnum);
console.log('+0 === -0?', +0 === -0);
console.log('8/+0:', 8 / +0);
console.log('8/-0:', 8 / -0);

//  2.string 字符串类型
let str = 'str';

//  3.boolean 布尔类型
let bool = true;

//  4.null 对空类型, 值 null 是一个字面量, 值 null 特指对象的值未设置
let nul = null;
if (!null) console.log('非空');
console.log('typeof null:', typeof null);

//  5.undefined 未定义类型, 一个没有被赋值的变量会有个默认值 undefined, undefined是全局对象的一个属性
let undef = undefined;
const returnUndefined = (arg) => {
  console.log(typeof arg);
  return arg;
};
returnUndefined();

//  6.symbol  符号类型, Symbol([description:string | number]), description:可选的，用于描述该symbol
//     6.1. 基本用法
let sym1 = Symbol();
let sym2 = Symbol(2);
let sym3 = Symbol('desc:symbol3');
console.log(sym1, sym2, sym3);
console.log('valueOf():', sym1.valueOf(), sym2.valueOf(), sym3.valueOf());
console.log('toString():', sym1.toString(), sym2.toString(), sym3.toString());
// p(sym1.toSource());

// 6.2.每个从Symbol()返回的symbol值都是唯一的
let sym_A = Symbol('desc');
let sym_B = Symbol('desc');
console.log(sym_A === sym_B); // false

// 6.3.symbol作为对象的key
let objSym = {};
let symAsKey = Symbol('symbol as object key');
objSym[symAsKey] = 'value';
console.log(objSym);
console.log(Object.keys(objSym)); // [] 无法迭代得到
console.log(objSym[symAsKey]);

//  7.bigInt 大整数类型, 用任意精度表示整数
console.log('最大安全整数 : 2^53-1 =', Number.MAX_SAFE_INTEGER);
let bigint = 2 ** 55;
console.log(bigint);

/**
 * 引用数据类型(1种): 对象, 内存中的可以被标识符引用的一块区域
 * 8.object, 常用的内置对象有:
 *         8.1.Array数组
 *         8.2.Function函数
 *         8.3.Date日期
 *         8.4.RegExp正则
 */
// 字面量定义
let jack = {
  name: 'jack',
  age: 25,
  isMan: true
};

// 构造函数定义
let object = new Object();
console.log(object);
let obj_null = new Object(null);
console.log(obj_null);
let obj_undefined = new Object(undefined);
console.log(obj_undefined);
let obj_boolean = new Object(true);
console.log(obj_boolean);
let obj_num = new Object(123);
console.log(obj_num);
let obj_string = new Object('string in object');
console.log(obj_string);

// 8.1.Array数组
let nArr = new Array(4);
console.log(nArr);
nArr.fill(8);
console.log(nArr);

// 8.2.Function函数, 参数只能是string类型的
let addFunc = new Function('a', 'b', 'return a+b');
console.log(addFunc(12, 13));

// 8.3.Date日期
let nDate = new Date(); // Sun Mar 08 2020 10:20:27 GMT+0800 (中国标准时间)
console.log(nDate);

// 8.4.RegExp正则
let regExpJS = new RegExp('js', 'g');
console.log(regExpJS);
console.log('javascript as js'.match(regExpJS)); // ["js"]
let regExpTS = new RegExp(/ts?/, 'g');
console.log(regExpTS);
console.log(regExpTS.test('tsx')); // true
