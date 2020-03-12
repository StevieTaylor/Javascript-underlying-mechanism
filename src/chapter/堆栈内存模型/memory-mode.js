console.log('-------------------Javascript内存机制-------------------');

/**
 * 一、原始数据类型存储在 Call Stack调用栈里
 * 过程：
 *        1.变量num在Stack中分配了一个内存地址7034BA31，该地址存储的值为1
 */
let num = 1;

/**
 * 二、引用数据类型的(变量名所对应的)地址存储在 Call Stack里，值存储在该地址所指向的Heap堆内存中
 *        为何使用堆？因为堆可以存储可以动态增长的无序数据，这对于数组和对象来说是完美的。
 * 过程：
 *        1.变量array在Stack中分配了一个内存地址04125F45, 且存储了一个值
 *        2.存储的值是个地址44XX12GF，这个地址指向了Heap中的一个内存地址
 *        3.该内存地址为44XX12GF，并且存储了值[1,2,3,4]
 */
let array = [1, 2, 3, 4];

let person1 = {
  name: 'jack',
  age: 26
};
let person2 = person1;
person2.age = 30;
console.log(person2.age); // 30
console.log(person1.age); // 30

/**
 * 三、let、const、var的声明使用优先级：const>let>var
 *        const声明对象时，可以限制Stack中的内存地址不变
 */
const cArray = [1, 'str', false, Symbol('index3')];
console.log(cArray);
// cArray = [1, 2, 3]; // error:Assignment to constant variable.
cArray.push(null);
console.log(cArray);
