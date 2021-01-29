---
title: 微信公众号网页
description: 微信公众号网页
date: "2021-01-29 17:00"
tags:
 - 微信公众号
categories: 
 - 微信
---
# 微信公众号网页开发
    + 网页授权流程
        - 首先想要网页授权必须在微信公众号平台中配置授权回调域名
            - 网页授权的两种方式 
                - scope为snsapi_base发起的网页授权，是用来获取用户的openid的，并且静默的跳转到回调页面
                - scope为snsapi_userinfo发起的网页授权，是用来获取用户基本信息的，需要用户手动同意
            - 以上两种授权方式都会回到重定向页面redirect_uri，并且URL后面带两个参数分别为code和state
                - code：就是用来换取access_token
                - state：就是带进来的参数可自定义
            - 两种授权链接的几个参数
                - appid：公众号的唯一标识
                - redirect_uri：授权后重定向回调链接地址
                - response_type；返回类型 code
                - scope；应用授权的方式
                - ...
        - 当用户授权完成后拿到code，此时需要通过code换取access_token和openid
            - 如果是需要获取用户信息的话，就需要使用scope为snsapi_userinfo的授权方式，这样就可以拿到用户的微信信息
    + JS-SDK的使用
        - 首先需要在公众号设置中填写js接口安全域名
        - 在需要调用JS-SDK的页面中引入js文件
        - 调用JS-SDK通过wx.config()进行注入权限验证配置
            - 因为调用JS-SDK需要使用签名，所以要调用微信的接口去请求
                - 获取前面调用JS-SDK有几点注意的是
                - 需要调用JS-SDK的页面的完整URL作为参数
                - 还有一点是这个步骤是异步的
        - 可以通过wx.ready()接口查看JS-SDK是否验证成功
        - 可以通过wx.error()接口查看JS-SDK处理失败
    + kpro员工主要功能扫一扫
        - 调用JS-SDK获取二维码中信息
        - 读出后跳转页面将参数拼接在URL后面
    + 使用微信网页开发样式库
        - WeUI（https://github.com/Tencent/weui）


    **微信网页开发文档（https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html）**