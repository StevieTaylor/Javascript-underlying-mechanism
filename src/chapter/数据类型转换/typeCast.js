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
const toTrueArray = [1, 'str', true, Symbol(), {}, { name: 'jack' }, function() {}];
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
  function(a) {
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
