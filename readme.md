## 概述
本文介绍了如何使用 `uni-app` 将一个 web 应用快速封装成`移动端（安卓）应用`, 并且对数据源代码进行分析，扩展一个新的接口：

- 如何用 uni-app 封装客户端应用;
- 分析数据源 node 仓库，扩展新的接口,增加 github 榜单;
·
## 关键词
uni-app、客户端、 安卓、热榜、套壳、koa

## 效果截图
![截屏2023-07-28 16.29.02.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44be166dd8574897bf7cf125d494869b~tplv-k3u1fbpfcp-watermark.image?)

## 代码仓库
[mobile-hotlist](https://github.com/mamumu123/mobile-hotlist)
（帮我点个免费的 star 吧🥰,您的点赞是我前进的动力）


## 项目背景

### 项目制作原因
本人平时喜欢刷各种新闻（消息），但是一堆应用 + 媒体资源，使得手机内存总是占的满满的，需要经常需要清理内存。
其中，很多应用只是为了刷新闻（消息），但是占用了很多的内存。为了减少内存的占用，所以想要弄一个榜单合集来替代这些应用。

![2023.08.01_19.15.43.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb0ab47367454355a5a2a4db0ad86ddb~tplv-k3u1fbpfcp-watermark.image?)

在 github 有很多现成的应用，其中一个项目 [DailyHot](https://github.com/imsyy/DailyHotApi) 比较不错，并且适配了移动端。所以准备将这个 web 应用封装成（安卓）客户端, 来给自己使用。

## 动手试试
为了快速套壳，可以实现的技术栈有很多，比如 `flutter`、 `react-native`、`uni-app` 等。最后选择了 `uni-app` 进行封装，原因包括：
- 前端友好，不需要学习新的语言；
- 跨端支持小程序；

> uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台

其实微信小程序应该是最好的场景，便于打开又不需要安装。但是小程序的限制太多，而且不允许个人开发者使用 `web-view`, 需要之后再想办法。

### 初始化项目
首先使用 `HBuilderX` 新建一个 `uni-app` 项目，然后在`pages/index/index`中增加 web-view 组件,将页面嵌入就可以了。

>web-view 是一个 web 浏览器组件，可以用来承载网页的容器

```html
<template>
	<view>
		<web-view src="https://hot.imsyy.top/#/"></web-view>
	</view>
</template>
```


### 调试-安卓模拟器
移动端调试可以通过模拟器，也可以通过连接真机进行调试。为了调试方便，决定在本地安装官方模拟器。

#### 下载模拟器
模拟器有很多，作为新手，下载的是 [google 官方模拟器](https://developer.android.com/studio)。安装比较简单，就是通过网页下载，然后一直点击`next`，直到`finish`。

#### 运行
在安装好以后，打开模拟器，就可以按照 `uni-app` 官方提供的[ 安装模拟器教程 ](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html)实现联调。

在 HBuilderX 的菜单栏点击点击 `运行`，然后选择`运行到手机模拟器`，`运行到 Android App 基座`。

![截屏2023-07-28 16.20.10.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb454eea10f642d58b4277ab9144a3ef~tplv-k3u1fbpfcp-watermark.image?)

在选择到 emulator-xxx 的设备以后，点击运行。

![企业微信截图_af92892b-db18-4353-92d6-d25470ea30a4.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7d2e22eb38f449e940640d1864273d2~tplv-k3u1fbpfcp-watermark.image?)

然后等待一下，就可以查看效果了。

![截屏2023-07-28 16.29.02.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44be166dd8574897bf7cf125d494869b~tplv-k3u1fbpfcp-watermark.image?)

如果在模拟器看到效果，那么这一步就完成了。


### 打包
开发完成后，就可以开始打包成 `app` 在手机端体验效果了。(本人手机为安卓机，所以下方分享的是安卓应用的打包)

`uni-app` 在打包时提供了云打包的方式，可以不需要配置本地就打包成功。([打包为原生app](https://uniapp.dcloud.net.cn/quickstart-hx.html#%E6%89%93%E5%8C%85%E4%B8%BA%E5%8E%9F%E7%94%9Fapp))

![截屏2023-07-31 11.16.32.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ea632b2e5894efb93a6c1caad50ed20~tplv-k3u1fbpfcp-watermark.image?)

控制台会显示打包进度，然后在等待几分钟以后，就可以在路径`unpackage/release/apk/`看到可以安装的 `apk 文件`了，传递到手机，然后双击就可以安装了。


### 遇到的问题
#### 模拟器安装 sdk 较慢
在模拟器安装 sdk 时，会由于网络原因，无法安装。通过查询，可以通过设置 hosts 来加速下载。
- 点击 https://ping.chinaz.com/dl.google.com, 找到响应时间最快 IP 地址。

![企业微信截图_87d0771f-08d8-49e6-9ac2-cba2b651a9d3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1cb5d122b0c4e4d99e7d1a65652eaa6~tplv-k3u1fbpfcp-watermark.image?)

- 将 IP 加入到本地 hosts 配置文件，如 mac 电脑，直接在 控制台输入 `sudo vim /etc/hosts`, 

```bash
203.208.41.65 dl.google.com
```

#### 请提供64位版本软件包后再提交审核
[请提供64位版本软件包后再提交审核](https://uniapp.dcloud.net.cn/tutorial/android-store.html#_17%E3%80%81%E8%AF%B7%E6%8F%90%E4%BE%9B64%E4%BD%8D%E7%89%88%E6%9C%AC%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%90%8E%E5%86%8D%E6%8F%90%E4%BA%A4%E5%AE%A1%E6%A0%B8)

#### 使用 web-view 后路由和应用路由无法联动
在真机体验时，遇到一个问题,由于是一个套壳应用，`web-view` 相当于是一个 iframe, 内部和外部的路由是无法同步的。
如果是 h5 应用，非同源的 iframe 会因为安全策略，导致同步会变得很艰难。但是在客户端，没有这些限制，可以从外面操作 web-view 的路由。

通过 plus.webview.create 创建 web-view，获得操作句柄。
```js
const wv = plus.webview.create("", "custom-webview", {  
  plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止  
  'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突  
  top: uni.getSystemInfoSync().statusBarHeight + 44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值  
})  
wv.loadURL(url) 
```

将创建的 `web-view` 加入到当前页面
```js
const currentWebview = this.$scope.$getAppWebview(); 
currentWebview.append(wv); 
```

`canBack` 的回调能知道当前 `web-view` 是否能够返回上一页。如果可以，则在页面渲染一个`上一页`的按钮。
```js
const self = this  
wv.addEventListener('loaded', e => {  
  wv.canBack(e => {  
    self.canBack = e.canBack  
    currentWebview.setTitleNViewButtonStyle(0, {  
      color: e.canBack ? '#000' : '#fff',    
    });  
  })  
})  
this.wv = wv  
```

注册 `onNavigationBarButtonTap`。点击按钮时，则调用 `web-view` 的 `back` 函数，返回上一页。

```js
onNavigationBarButtonTap (e) {  
  this.handleBack()
}，
methods: {
  handleBack() {
    // #ifdef APP-PLUS
    if (this.wv && this.canBack) {
      this.wv.back()
      return true
    }
    // #endif  
  }
}
```
还可以注册 `onBackPress`事件，监听左上角导航栏按钮及安卓返回键。

```js
onBackPress(e) {  
	// #ifdef APP-PLUS  
	if (this.wv && this.canBack) {  
		this.wv.back()  
		return true  
	}  
	// #endif  
}
```

这样子，就可以实现页面的返回功能了。

## 扩展数据源

### 代码地址
[DailyHotApi](https://github.com/mamumu123/DailyHotApi)

### 功能
聚合热门数据的 API 接口


### 结构分析
这是一个很经典的 koa 项目，入口的 `index.js`做了初始化、配置中间件、创建 http 服务，监听端口等功能。
```js
const Koa = require("koa");
const app = new Koa();
const router = require("./routes");

app.use(/**....*/);

// 使用路由中间件
app.use(router.routes());

app.listen(port, () => {
});
```

然后在  `./routes/index.js` 中，进行了路由的注册，可以响应 `/`, `/all`, `/xxx`, `/xxx/new` 等接口

#### 路由注册
首先进行路由初始化
```js
const Router = require("koa-router");
const router = new Router();
```

监听路由 `/`, 返回`index.html`, 是一个接口文档页

```js
// 根目录
router.get("/", async (ctx) => {
  await ctx.render("index");
});
```

读取 `routes 文件夹`下的所有文件，获得每个子路由的配置。
```js
// 遍历所有路由模块
fs.readdirSync(__dirname)
  .filter((filename) => filename.endsWith(".js") && filename !== "index.js")
  .forEach((filename) => {
    // ...
  });
```
![截屏2023-08-01 15.45.32.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2f62e60221a44bc8d30e7cb0f510b5e~tplv-k3u1fbpfcp-watermark.image?)

以文件名作为路由名，进行路由注册
```js
const routerPath = path.join(__dirname, filename);
const routerModule = require(routerPath);
// 自动注册路由
if (routerModule instanceof Router) {
  // 引用路由
  router.use(routerModule.routes());
}
```

这样热榜路由的注册就完成了。

### 增加 github 热榜
在理顺前面的代码结构以后，我们来增加一个 github 榜单。

在 `routes 文件夹`下增加一个文件 `github.js`，直接复制一个子路由文件，然后改一下数据源接口，进行接口适配即可。

找到一个榜单数据源 `https://e.juejin.cn/resources/github`，返回的数据源如下：

```json
{
  "id": 672877879,
  "url": "https://github.com/MrBl0kcha1ne/SniperBot",
  "username": "MrBl0kcha1ne",
  "reponame": "SniperBot",
  "description": "Earn money with Sniper Bot (Uniswap/Pancakeswap)",
  "lang": "Solidity",
  "langColor": "#ce6c50",
  "starCount": 94,
  "forkCount": 37,
  "owner": {
      "username": "MrBl0kcha1ne",
      "avatar": "https://avatars.githubusercontent.com/u/137830233?v=4",
      "url": "https://github.com/MrBl0kcha1ne"
  },
  "translation": {}
},
```
修改 getData 方法，进行数据适配
```js
const getData = (data) => {
  if (!data) return [];
  return data.map((v) => {
    return {
      id: v.id,
      title: v.reponame,
      desc: v.description,
      url: `${v.url}`,
      mobileUrl: `${v.url}`,
    };
  });
};
```

效果展示

![截屏2023-08-01 18.21.19.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3d64477a82a493696e7418262bd12cc~tplv-k3u1fbpfcp-watermark.image?)


### 知识点整理

#### 配置加载
dotenv 是一个配置加载库，将环境变量从 .env 文件加载到 process.env 中
>loads environment variables from a .env file into process.env

```js
require('dotenv').config()
let domain = process.env.ALLOWED_DOMAIN || "*";
let port = process.env.PORT || 6688;
```


#### 中间件注册
中间件是 Koa 中的一个重要概念，它是一个函数，可以在请求和响应之间执行一些操作，例如修改请求或响应、记录日志、处理错误等。
例如当前这个项目，也注册了很多中间件，包括：

- koa-bodyparser: 支持x-www-form-urlencoded, application/json等格式的请求体；
- koa2-cors: 配置跨域请求；
- koa-static: 托管静态文件，请求静态文件后直接返回；
- koa-router: 路由中间件，将请求的 URL 映射到相应的处理函数上，以便处理请求和生成响应。

#### 防盗链中间件
除了这些常用的中间件，还自定义了一个防盗链中间件，能够控制允许访问的域名。
中间件会检查请求头中的 Referer 字段，获取请求来源的域名，并判断该域名是否在白名单中。如果在白名单中，则继续执行下一个中间件；否则，返回 403 Forbidden 错误。
```js
const domain = process.env.ALLOWED_DOMAIN || "*";

app.use(async (ctx, next) => {
  if (domain === "*") {
    await next();
  } else {
    if (ctx.headers.origin === domain || ctx.headers.referer === domain) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        message: "请通过正确的域名访问",
      };
    }
  }
});
```

#### cache（缓存）
node-cache 是一个简单易用的 Node.js 缓存模块，可以用于缓存数据、减少数据库查询等

```js
const NodeCache = require("node-cache");
const cache = new NodeCache({
  stdTTL: 1800, // 缓存默认过期时间（单位秒）
  checkperiod: 60, // 定期检查过期缓存的时间（单位秒）
});
```

以掘金热榜为例，当请求 `/juejin` 时，首先从缓存中获取数据，如果缓存存在数据，则直接返回；如果缓存不存在，再进行对数据接口的请求，请求后更新缓存，并返回数据；
```js
// 调用路径
const url =
  "https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot";
// 缓存键名
const cacheKey = "juejinData";

// 掘金热榜
juejinRouter.get("/juejin", async (ctx) => {
    // 从缓存中获取数据
    let data = await get(cacheKey);
    const from = data ? "cache" : "server";
    if (!data) {
      // 如果缓存中不存在数据
      console.log("从服务端重新获取掘金热榜");
      // 从服务器拉取数据
      const response = await axios.get(url);
      data = getData(response.data.data);
      // 将数据写入缓存
      await set(cacheKey, data);
    }
    ctx.body = {
      // .... other params
      data,
    };
})
```

#### 检测端口是否占用
检测端口是否占用，是通过创建了一个 net.Server 对象，并尝试在指定端口上启动该服务器。
如果端口已经被占用，则会触发 'error' 事件，我们可以通过判断错误码是否为 'EADDRINUSE' 来判断端口是否被占用。如果端口未被占用，则会触发 'listening' 事件

```js
// 检测端口是否被占用
const net = require("net");

const checkPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = net
      .createServer()
      .once("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.log(`端口 ${port} 已被占用, 正在尝试其他端口...`);
          server.close();
          resolve(false);
        } else {
          reject(err);
        }
      })
      .once("listening", () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};
```





## 参考

[DailyHot](https://github.com/imsyy/DailyHotApi)

[DailyHotApi](https://github.com/imsyy/DailyHotApi)

[uni-app介绍文档](https://uniapp.dcloud.net.cn/)

[安装模拟器](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html)

[Android Studio下载SDK资源速度慢怎么办](https://www.jianshu.com/p/c93fea637566)

[uni-app中使用webview加载网页，支持后退和关闭](https://ask.dcloud.net.cn/article/37714)
