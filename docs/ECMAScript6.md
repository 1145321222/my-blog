---
title: es6
description: es6知识点
date: "2021-01-26"
tags:
 - es6
categories: 
 - 前端
---

# es6中的常见问题

+ 简单阐述下es6中声明方式的区别

+ 什么是解构赋值？

+ 使用模板字符串

+ es6中新增的数组方法有哪些？有什么不同？

+ 箭头函数和普通函数的区别
    - 箭头函数没有prototype(原型)
    - 箭头函数的this在定义的时候继承自外层第一个普通函数的this。
    - 如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
    - 箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
    - 箭头函数的this指向全局，使用arguments会报未声明的错误。
    - 箭头函数的this指向普通函数时,它的argumens继承于该普通函数
    - 使用new调用箭头函数会报错，因为箭头函数没有constructor
    - 箭头函数不支持new.target
    - 箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
    - 箭头函数相对于普通函数语法更简洁优雅
    - 主要分为这几个方面的区别： 1、this指向 2、arguments 3、箭头函数没有原型 4、箭头函数不能使用new来构造 5、不允许重命名参数 6、语法更优雅 7、 不支持new.target

+ 使用箭头函数改写下面的函数
---
    function sum(a, b = 2) {
        return a + b
    }
    sum(2, 3)
---

+ 手写一个promise

+ 以下代码依次输出的是
---
    const promise = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
    })
    promise.then(() => {
        console.log(3)
    })
    console.log(4)
---

+ 定义一个类Animal，通过传参初始化它的类型，如：“猫科类”。它有一个实例方法：run，run函数体内容可自行定义。
---
    class Animal {    
        constructor(type){        
            this.type = type;
        }

        run(){
            console.log('go go go');
        }
    }
---

+ 定义一个子类Cat并继承Animal类。初始化Cat类的昵称name和年龄age。并拥有实例方法eat，eat函数体内容可自行定义。
---
    class Cat extends Animal{    
        constructor(type,name,age){        
            super(type);        
            this.name = name;        
            this.age = age;
        }
    
        eat(){
            console.log('饿');
        }
    }

---