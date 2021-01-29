---
title: e3-plus-finance
description: e3-plus-finance项目框架文档
date: "2021-01-26"
tags:
 - 项目文档
categories: 
 - 前端
---
<h4>
    前言
</h4>
<div>
    1. 本文档主要讲解的是中台财务项目整体流程和项目中框架的使用，本文档适用于刚刚加入业务中台前端工作人员，使用者需掌握一定的前端知识`javascript vue typescript`；
    2. 如果错误或者遗漏请告知我修改，项目现在也在一直更新，主要还是要靠看代码来理解，本文档只能辅助理解运用，不能完全照搬。
</div>

<h6>项目介绍</h6>
1. 本项目的主要使用技术为`vue`,使用的`UI`框架为`iview`,以及使用`typescript`,多数使用的组件是对`iview`的二次封装。
2. 本项目开发环境`NodeJs 10.0`以上,`NPM 6.0`以上。
3. 开发工具建议使用`VSCODE`。

---

### 开发讲解

#### 1.开发前的工作

* 根据代码库地址进行代码拉取。（_git简易使用指南_<https://www.bootcss.com/p/git-guide/>

  ）；

  * 切换代码分支为`dev`分支；在根目录下找到`config`文件夹，将整个文件夹复制；在根目录下新建`dist`文件夹，将`config`文件夹复制到`dist`文件夹，再将复制后的`config`文件夹中的`config-dev.js`文件名改为`config.js`。

* `src`目录为源代码目录；`src`目录下面每一个文件夹代表不同的模块。
  * `common`文件夹代表主框架模块；
  * `finance`文件夹代表的是财务模块；_（本文档主要讲的模块）_
    * `api`主要是写的接口调用的方法
    * `assert`一些静态资源
    * `component`模块内的公用组件，**如果是系统级别的组件则需要放到\*\***`common`\***\*文件夹下**
    * `filter`过滤器
    * `mixins`混入的类
    * `style`模块内的样式文件
    * `utils`模块内的工具类，**如果是系统级别的组件则需要放到\*\***`common`\***\*文件夹下**
    * `view`页面视图
    * `index.ts`页面路由注册

      [^注](中台中页面主要分为`ListPage`和`FormPage`这两种，根据这两种来讲述前端中如何编写以及可能会遇到的问题): 一般来说每个模块下只要有`api view`目录，就可以基本满足
* 代码规范
  * _javascript风格指南_<https://lin-123.github.io/javascript/>
  * _vue风格指南_<https://cn.vuejs.org/v2/style-guide/>
  * 具体文档可查**钉盘>企业盘>财务模块>百胜开发培训文档>前端开发规范文档**

#### 2.开发流程

1. 具体文档可查**钉盘>企业盘>财务模块>百胜开发培训文档>E3+企业中台前端开发简介**
2. **前端debug调试新增页面调试**
   1. document.querySelector('.indexWrap').\_\_vue\_\_.$tab.open({title:'测试页面',url:'v2/DemoIndex'})

#### 3.框架功能

###### `ListPage`讲解

* 页面编写注意点

  ```js
  // 1.延迟加载数据 
  // 这个方法是为了 在页面中有一些查询条件的或者其他一些默认值，需要去请求接口来取这些默认值
  protected resolve: Promise<any> = new Promise<any>((next) => {
      DemoService.getInfomation({}).then((data: ApiResult) => {
  		// 必须写这个next()
          next();
      });
  });

  // 2. 页面中的标题
  protected title: string = '应收来源业务单据跟踪表'; // 页面中tab栏中的名字
  protected businessObjectCode: string = 'RECEIVABLETRACKING'; // 必写的code 这个是需要配置到数据表中的

  ```

​		**主要分为三部分\*\***`toolbar`\***\*右上角的操作按钮区域\*\***`searchbar`\***\*页面中表单搜索条件区域\*\***`grid`\***\*搜索结果表格区域**

1. `toolbar`为整个页面的操作按钮集合，按钮分为两种类型一种是对页面进行操作（刷新，返回），还有一种就是表单的操作（提交，导出）
   1. 按钮一般使用两种

      ```vue
      <i-button></i-button>
      <!-- 这种按钮基本用法是按照 iview 框架的用法 -->

      <loading-button></loading-button>
      <!-- 这种是对 i-button的二次封装 按钮点击事件，点击后按钮会设置成loading状态，如果返回值为Promise，会等按钮事件执行完成后取消loading状态 -->

      ```

   2. 按钮中的一些属性
      1. `type`按钮的类型 可选值为 default、primary、dashed、text、info、success、warning、error或者不设置
      2. `size`按钮大小，可选值为large、small、default或者不设置
      3. `icon`设置按钮的图标类型
      4. `v-action:code`配置按钮权限，一般用在操作表单按钮上面，（新增，提交，导入）

         ```js
         v-action:add  // 代表新增权限
         v-action:submit  // 代表提交权限
         v-action:download  // 代表导入权限
         // 这些权限的code需要和PO确认，会根据用户的权限来判断能否使用

         ```
2. `searchbar`为该页面中的搜索条件区域
   1. `i-form`标签表单
      * 表单上的一些重要属性
        * `model`绑定整个表单的数据；表单中的所有搜索项都是`model`绑定的数据
        * `rules`绑定表单中需要校验项
          * ```vue
            <!-- 注意 每一项需要校验的表单都需要在form-item上面写上prop属性 -->
            <form-item prop="billNo" label="单据编号">
                <i-input v-model="searchData.billNo" />
            </form-item>

            <script>
                import { required } from 'common/utils/form-rule';
            	protected formRules: any = {
                	billNo: [required],
            		// 根据上面的prop 对需要校验项，给一个校验规则
             	};
                // 校验规则有多种，可以自定义，不同的校验规则需要引入进来
            </script>
            		

            ```


````
        ```
  * 表单内的应用
    * 主要讲一种`<doc-selector></doc-selector>`这种是弹出框选择器
    * 通过`:multiple="true"`设置来控制是否多选
    * 通过`v-model="formData.Id"`来绑定选择的ID
    * 通过`:display.sync="formData.Name"`来绑定选择的Name
    * 通过`:showCode="true"`来控制是否显示选中项的code，在绑定`:code.sync="formData.code"`显示【Code】
    * 通过`:loader="loder"`这个是用来绑定查询选择器的方法的
    * 通过`:filter="{ status: '' }"`这个是对查询接口中需要传入过滤条件

````

1. 表单中的展开和收起有两种写法
   1. 就是在`<form-item></form-item>`标签上写`v-show=!isCollapsed`的判断;前两项是不写的;
   2. 使用`search-panel`组件，在`i-form`标签内使用`search-panel`组件包裹`form-item`;
2. `grid`为表格区域
   1. `grid`中主要使用了 `txe-table`插件中的表格。<https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install> _（官方文档链接）_
   2. 组件属性
      1. `columns`为表格列的配置描述；每项参数详解
         1. `title:`表格每项的标题
         2. `key:`表格每项的参数名
         3. `align:`是否居中显示
         4. `width,minWidth:`表示每一项所占的宽度或者最小宽度
         5. `slot:`插槽，这需要配合`<template>`标签使用
            1. ```html
               <template slot-scope="{ row }" slot="guaranteeType">
                   <span>{{row.guaranteeType|dict('252')}}</span>
               </template>
               <!-- 
               	row 表示表格这一行的所有参数
               	slot 对应的是columns中的slot的参数名
               	row.guaranteeType表示该单元格中的参数
               	dict('252')使用的字典表中的code为252的引用字典表
               	这是使用的前端缓存 开始是调用引用字典表接口，前端直接调用dict(code)就可去到对应的code
               -->

               ```
         6. `summary`是否对该项数据进行合计
            1. 合计分为两种一种是对后端去操作的，对数据库中所有该项数据进行累加
            2. 还有就是对当前页面数据进行累加。
         7. `type`可以设置表格的选中效果分为多选框和单选框
            1. selection： 为多选框，对应的多选框事件`on-selection-change`当手动勾选并且值发生改变时触发的事件
            2. radio：单选框，对应的单选框事件`on-radio-change`当手动勾选并且值发生改变时触发的事件
            3. index：显示序号 
      2. `loader`获取表格数据，写的调用接口的方法
         1. ```vue
            <script>
                import { ApiResult, Pagination } from 'common/utils/api';
                // ApiResult 定义接口返回数据的格式
                // Pagination 定义了page的各项参数pageSize，pageNum等数据
            	protected loader({ pagination }: any) {
                    return DemoService.queryPage(this.searchData, pagination).then((data: ApiResult) => {
                        if(data.success && data.data.list) {
                            // 操作数据
                        }
                        return data;
                    });
                };
            </script>

            ```
         2. ```vue
            <script>
                // 表格中有
                // :showSummary="true"
                // :summaryMethod="handleSummary"
            	// 就是需要合计的时候，就需要使用promise.all 方法请求两个接口，查询列表和合计数据
                
                 protected loader({ pagination }: any) {
                    let loadData = ReceivableTrackingService.query(this.searchData,pagination).then((data: ApiResult) => {
                      return data;
                    });
                    let loadSumData = ReceivableTrackingService.queryTotals(this.searchData).then((data: ApiResult) => {
                      if(data.success && data.data) {
                        this.sumData = data.data;
                        sumFilter.set(this.columns, this.sumData);
                      }
                      return data;
                    });
                    return Promise.all([loadData, loadSumData]).then((result: any[]) => {
                      this.listData = result[0].rows;
                      this.pagination = result[0].pagination;
                      return result[0];
                    });
                  }，
                  // 列表合计
                  protected handleSummary() {
                    if (ObjectUtil.isEmpty(this.sumData)) {
                            const sums: any = {};
                            this.columns.forEach((column: any, index: any) => {
                                const key = column.key;
                                sums[key] = { key, value: '' };
                            });
                            return sums;
                        };
                    return baseUtil.SummaryDetail(this.columns, this.sumData, '', '');
                  }
            </script>

            ```
         3. 当页面中出现多个表格时，需要将每一个表中的_`ref`_名字改掉，当我们想要调用这些表格的接口时，只需要在方法中执行**`this.$refs.grid.reload()`**,如果不能未生效只需要在前面加上`this.$nextick(()=>{this.$refs.grid.reload()})`

###### `FormPage`讲解

1. 整体逻辑相差不大

#### 4.代码讲解

1. ```vue
   **对金额，价格，折扣进行处理**

   <template>
   	<!-- 另一种地方用的写法，是当input数字输入框中使用 -->
   	<number-box v-model="formData.payAmountCurrency" disabled type="amount"></number-box>
   	<!-- 数字输入框的number-box 组件默认输入的只能是数字 -->
   </template>

   <script>
       import amountFilter from 'common/filter/amount';
       import priceFilter from 'common/filter/price';
       import discountFilter from 'common/filter/discount';
       // 这三个引入包是对金额，价格，折扣这三个参数进行处理
    // 保留几位小数 具体保留几位小数需要根据后台配置来决定 
       // 
       protected amountCurrency = amountFilter(amountCurrency, '');
       protected totalTaxAmountCurrency = priceFilter(totalTaxAmountCurrency, '');
       protected discount = discountFilter(discount);
   </script>

   ```
2. ```typescript + vue
   <!-- 页面tab切换 主要是因为不同tab下有不同的表格，这些表格需要调用不同的接口-->
   <template>
   	<tabs v-model="detailTab" name="detail" @on-click="clickTab">
           <tab-pane label="单据明细" name="list" tab="detail"></tab-pane>
           <tab-pane label="其他信息" name="other" tab="detail"></tab-pane>
       </tabs>
   </template>
   <script>
   	protected  detailTab: string = 'list';  // 默认tab选中的是单据明细这一个
   	
   	protected clickTab(e: any) {
           // 根据tabs组件绑定的值 detailTab 再点击后会赋值，判断不同的值 来渲染不同的表格，发送不同的请求
           if (this.detailTab === 'list') {
               // 将回调延迟到下次 DOM 更新循环之后执行
               this.$nextTick(() => {
                   // 当表格绑定的ref是gridList时，可以直接调用这个方法；如果不是那则需要使用this.$refs.gridList.reload(); 有时页面在使用这个方法vsCode中Vetur语法会报错，但是不影响使用
                   this.reload();
               });
           }  
       }
   </script>

   ```
3. ```js
   // 跳转路由的方法
   /**
   	{
   		title: 标题，
   		url： 跳转的路径，
   		query： { // 跳转路由的参数
   			id： 主表的id，
   			mode: 模式， // 跳转下一个页面是 什么样的页面 分为 新增， 编辑， 查看，
   			
   		}
   	}
   */ 
   this.$tab.open({
        title: '付款单-编辑',
        url: 'v2/PayEdit',
        query: { id: data.data, mode: 'edit' },
    }, true);
   // 最后这个true 是来判断 打开新的页面 是否关闭当前这个页面 （也可解释为 覆盖当前路由相当于vue中路由的replace）

   ```
4. moment() 时间插件的使用
   1. ```js
      import moment from 'moment';
      // 对后端传过来时间或日期的值进行处理
      moment(),format('YYYY-MM-DD') // 时间格式为 年年年年-月月-日日
      moment().startOf('month').format('YYYY-MM-DD') // 结果为 这个月的第一天
      moment().endOf('month').format('YYYY-MM-DD') // 结果为 这个月的第一天
      moment().add(30, 'day').format('YYYY-MM-DD') // 结果为 对当前时间再加上30天
      moment().month() // 结果 + 1 为当前月
      // 更多用法 请查阅 moment.js官网  http://momentjs.cn/

      ```
5. 引用字典表
   1. ```js
      protected purchaseTypes: any = dict.getItem('130'); // 采购性质
      protected invoiceTypeList:any = dict.getItem('120');//发票类型
      protected redblueTypeList: any = dict.getItem('144'); // 红蓝字
      protected invoiceLevelList: any = dict.getItem('146'); // 发票明细级别
      protected exchangeRateTypes: any = dict.getItem('15'); // 汇率类型
      // 调用档案中心中的引用字典表 
      // dict 这个类是直接调用引用字典表的接口 存在本地 通过 getItem(code)方法 根据传进去的code返回对应的引用字典表

      ```
6. 在input输入框后添加自定义内容；类如在税率输入框上加一个%
   1. ```template
      <form-item prop="taxRatePercent" label="税率">
          <i-input number v-model="formData.taxRatePercent" :disabled="disabled">
         	 	<span class="input-append" slot="suffix" >%</span>
          </i-input>
      </form-item>

      ```
7. Excel导出功能
   1. ```js
      // 使用system模块接口
      // 导出功能 的主要思想是 将所要导出的数据 告诉后端，让后端来调接口查询 查询出来的数据导出Excel
      // 根据导出接口中的serverName和url来确定让后端调用哪个接口
      // 传入参数 详解
      const data = {
          count: this.totalCount,  // 导出的数据总条数
          exportFields: this.exportFields, // 导出的数据项 Excel中的头表
          menuId: 110211, // 导出单据中的在中台项目职工的菜单Id
          queryPostParams, // 导出数据中调用的接口所需要的查询参数 如果是get请求的话 参数为queryParams 
          requstType: 2, // 请求方式 get 为 1； post 为 2 
          serverName: 'finance',  //  导出单据的模块名
          url: 'generalLedger/queryPage',  // 导出数据所需要查询的接口
      };
      protected exportFields: any[] = [
          { 	
              dictQuoteId: 138,		// 使用字典表的id，这些id是需要后端去查 	   	
              excelHeadName: '状态',   // 对应表格的名字
              filedName: 'status',    // 对应表格中的参数名
              index: 0, 				// 索引
              isDict: 1, 				// 是否使用引用字典表 0是不使用 1是不使用
              isDto: 0 
          },
      ];

      ```
8. Excel导入功能
   1. ```vue
      <template>
      	<!-- 使用common模块中的导入组件 -->
      			<data-importer
                     v-model="showBaseImport" 	  // 导入功能是一个modal框 这个是用来控制显示隐藏的
                     :type="49"					  // 导入中有一个下载导入模版的按钮这个是通过后台配置固定的模版调用接口传入这个参数来下载模版
                     module="finance"				  // 确定是哪个模块
                     log-url="export/excelDownload" // 下载导入错误日志的接口地址
                     action="rec/import"			  // 导入的接口地址
                     ></data-importer>
      </template>	

      ```
9. 表格中的action按钮区域

   1. ```vue
      <template>
      		<table-grid
                  ref="gridList"
                  :actions="gridActions"
                >
              </table-grid>
      </template>

      ```

   ````
   ```

   ````

10. 对于接口调用的`service.ts`里面的方法怎么写
    1. ```typescript
       // 页面中查询列表接口方法
       	// 1. get请求的查询方法  都是使用super.query
       	super.query(Url, id, params);
       	// 2. post请求的查询方法 都是使用super.queryPage
       	super.queryPage(Url, cloneQuery, params);
       	// 3. 其他的get请求
       	this.api.get(Url, data)
       	// 4. 其他的post请求
       	this.api.post(Url, data, params)  // 第二个参数 是将入参放在requestbody中的 第三个参数 是将参数拼接在url的后面

       ```
---

### 修订日志

1. 2020/10/30 第一版完成；
2. 2021/01/21 新增前端调试页面方法


