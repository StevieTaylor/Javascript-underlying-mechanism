console.log('-------------------Javascript类型转换-------------------');

// JS数据类型转换只有3种
/**
 *  一、转换成布尔值
 */
// 可以转换为false的
const toFalseArray = [0, -0, NaN, '', false, null, undefined];
console.log('可以转换为false的有：', toFalseArray);
console.log(
  '可以转换为false的有：',
  toFalseArray.map((value) => {
    if (!value) return false;
  })
);
// 可以转换为true的
const toTrueArray = [1, 'str', true, Symbol(), {}, { name: 'jack' }, function () { }];
console.log('可以转换为true的有：', toTrueArray);
console.log(
  '可以转换为true的有：',
  toTrueArray.map((value) => {
    if (value) return true;
  })
);

/**
 * 二、转换成字符串
 *        1.对象转字符串时，会变成 "[object Object]"
 */
const toStringArray = [
  8,
  false,
  null,
  undefined,
  { name: 'jack' },
  [1, 2, 3],
  function (a) {
    return a;
  }
];
console.log('转换为字符串前：', toStringArray);
console.log(
  '转换为字符串后：',
  toStringArray.map((value) => value + '')
);
// symbol转字符串时带description
const symbolToString = Symbol('tostring');
console.log(symbolToString.toString()); // Symbol(tostring)

/**
 * 三、转换成数字
 */
const toNumberArray = ['8', 'string', true, false, null, undefined, [1, 2, 3]];
console.log('转换为数字前：', toNumberArray);
console.log(
  '转换为数字后：',
  toNumberArray.map((value) => Number(value))
);

/**
 * 四、==和===的区别：
 *        1. == 是相等，===是严格相等，既要两边的值相等，又要类型相等
 *        2. 当 == 两边类型相同时，只要值相等就返回true
 *        3. 当 == 两边类型不同时，两边会有类型转换
 */
// 1.两边的类型是否相同，相同的话就比较值的大小
console.log('1==2:', 1 == 2); // false
// 2.判断的是否是null和undefined，是的话就返回true
console.log('undefined == null:', undefined == null); // true
// 3.判断的类型是否是string和number，是的话，把string类型转换成number，再进行比较
console.log('"123" == 123:', '123' == 123); // true
// 4.判断其中一方是否是boolean，是的话就把boolean转换成number，再进行比较
console.log('true == 1:', true == 1); // true
console.log('0 == false:', 0 == false); // true
console.log('1 == false:', 1 == false); // false
// 5.如果其中一方为object，且另一方为string、number或者symbol，会将object转换成字符串，再进行比较
console.log('{ age: 26 } == 26:', { age: 26 } == 26); // false
console.log('{ age: 26 } == "{ age: 26 }":', { age: 26 } == "{ age: 26 }"); // false
console.log('{ age: 26 } == "[object Object]":', { age: 26 } == "[object Object]"); // true
console.log('对象转为字符串:', { age: 26 }.toString()); // "[object Object]"

/**
 * 五、对象转原始类型的运行流程：(调用内置的[ToPrimitive]函数)
 *        1. 如果Symbol.toPrimitive()方法，优先调用再返回
 *        2. 调用valueOf()，如果转换为原始类型，则返回
 *        3. 调用toString()，如果转换为原始类型，则返回
 *        4. 如果都没有返回原始类型，会报错
 */
let object2primitive = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(object2primitive + 1); // 7