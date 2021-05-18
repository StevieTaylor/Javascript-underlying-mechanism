/*
 * @Author: Stevie
 * @Date: 2021-05-18 16:30:24
 * @LastEditTime: 2021-05-18 16:44:44
 * @LastEditors: Stevie
 * @Description: 原型和原型链
 */
console.log('-------------------原型和原型链-------------------');

function Person(name, age) {
  this.name = name;
  this.age = age;
}
console.log('原型对象:', Person.prototype);

const person = new Person('jack', 25);
console.log('实例对象的__proto__属性:',person.__proto__);

console.log('是否一致:',Person.prototype === person.__proto__);

const object = new Object();

console.log('原型对象:', Object.prototype);

console.log('object的__proto__属性:',object.__proto__);

