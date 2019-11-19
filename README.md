# 前端工程化命令 

## 组件功能


```背景
背景
前端项目需求变化快，开发周期短，为了提供效率，将项目初始化、编译打包、测试等流程通过工程化的方式固定下来
让项目人员只关注业务本身，省去搭建项目、配置编译项的琐碎时间。
```

```适用范围
目前支持 
base模版是构建静态页面的模版
react模版引入了react相关的模块
vue模版引入了vue相关模块
react-router 在react的基础上增加router
vue-router在vue的基础上增加router
```



## Install

```shell
npm i @bbtfe/procli
```

## use

```js
procli -t react/base appname
进入到appname 执行npm i 安装依赖

npm run build  编译
npm run server 启动本地server
npm run watch  监视本地改动
npm run test。 测试
```
## 注意
procli -t react/base appname 执行后 进入appname 根据实际情况 修改 buildconfig/baseconfig.js 配置文件中相关路径配置

