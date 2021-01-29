---
title: weApp
description: 微信小程序
date: "2021-01-29 16:00"
tags:
 - 小程序
categories: 
 - 微信
---

# 微信小程序开发
    + 小程序中开发中的问题及注意点
        - 小程序中如何登录
            - 调用wx.login()开放接口（注：很多的开发接口必须要在wx.login成功后才能调用，还有小程序中很多api都是异步）
            - 接口调用成功返回的code，通过此code（用户登录凭证）后端再去请求返回出openid和token
            - 返回出token后，将它存入storage，在下次请求中携带token发送给后端
            - 具体登录流程详情请查看官方文档流程图（https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html）
        - 小程序中如何获取用户信息
            - 两种类型
                - 一种是直接使用小程序的开放能力open-data
                    - 这个可以直接使用type参数来设置 `<open-data type="userNickName"></open-data>`，这种是直接在页面上显示用户的昵称，只能做展示使用，并不能拿到用户信息的值
                - 另一种就是通过`<button>`的开放能力`open-type="getUserInfo"`来获取授权，授权成功后，可以通过`bindgetuserinfo`函数来获取用户的信息
                    - `bindgetuserinfo`这个的返回参数和`wx.getUserInfo`的返回接口一致
                        - *注意：小程序中无法直接使用wx.getUserInfo来获取用户的微信信息（这个需要用户信息功能已经授权后才能调用）*
        - 小程序中如何获取用户的手机号
            - 使用`button`组件的开放能力`type="getPhoneNumber"`来获取
            - 方法返回的信息都是加密的信息，需要后端调用接口进行解密才能返回给前台
        - 如何判断小程序是否用授权，例如是否授权位置信息
            - 小程序通过`wx.getSetting`方法
            - 接口返回成功中的res返回授权的结果
            - 可以通过这个来判断是否需要向用户请求发起授权
        - 小程序中如何使用web-view访问非小程序页面
            - 如果是小程序关联的公众号文章，可以直接访问
            - 其他网页的话需要在小程序中配置业务域名
    + 小程序中的使用worker注意点
        - worker就是创建出一个新的线程，与主线程的运行不相关
        - 注意点是： 
            - 目前限制最多只能创建一个Worker
            - worker中的代码无法使用wx的所有api
            - 新增 worker 内支持网络、文件、音频等 API;
                - 如何在worker中使用轮询
                - 使用worker.request()发送网络请求
                - worker中的代码无法导入模块（无法使用import和require）
        - worker和小程序如何通信
            - Worker.onMessage 监听主线程/Worker线程向当前线程发送消息
            - Worker.postMessage 向主线程/Worker 线程发送的消息
    + 小程序中的data
        - data在小程序中定义了所有的变量
            - 读取
                - 只能通过this.data.status的方式来读取
            - 更新
                - 只能通过this.setData({status: 1})的方法俩修改值
                - 注意
                    - this.setData()只能直接赋值，不可通过遍历和push，需要预先定义好结果
                    - setData修改的值有大小限制
    + 小程序中的生命周期和页面的生命周期
        - 小程序的生命周期是在app.js中定义的
        - 每个页面都有自己独立的生命周期，注意每个生命周期的执行顺序
        - （官方文档https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html）
    + 如何通过注册点击事件
        - 小程序中的点击事件，在wxml中的元素上使用`bindtap=tapName`
        - 如何给事件函数传值，需要使用小程序中的自定义属性
            - 在元素上使用`data-id=1`,
            - 在事件函数中
            ```
                tapName (event) {
                    console.log(event)
                    // 在target和currentTarget中都会有一个dataset属性这里面的值就是小程序元素上的自定义属性
                }
            ```js
    + 小程序中如何使用storage及限制
        - 小程序中使用storage无论是设置新的值和读取等方法都有两种方法同步和异步这两种情况，注意代码执行顺序
        - 单个storage存储的大小不能超过1MB
        - 所有的storage的存储不能超过10MB
    + 页面上的分享按钮和页面分享的生命周期
        - 如果是使用button按钮的分享需要在button中设置
        - 还有一种就是页面的分享
            - 如果没有写页面分享的生命周期的函数`onShareAppMessage`，那么页面就不具备分享的能力
            - 如果需要在分享的页面携带参数，暂时的做法就是在分享的路径后面携带参数
            - 在分享的生命周期函数中可以自定义分享的图片，注意这对显示的大小的长宽比是5:4
    + 小程序中显示二维码
        - 在小程序没有api创建二维码，他只能通过后端调用产生小程序码
        - 只能通过canvas或者后端返回图片来做
    + 小程序中使用插件
        - 需要在小程序姑姑那里后台上进行配置
        - 后面阅读插件开发文档
    + 小程序基础库使用的版本问题
        - 因为之前使用worker创建新线程的问题，所以基础库版本必须在2.12.0之后的版本        