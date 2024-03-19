## 插件前端工程
包含如下功能：
- 本工程包含针对各个浏览器的插件代码
- 插件`main.js`作为本地入口，加载远程`bundle.js`入口文件
- src目录下为插件业务逻辑，最终打包为bundle.js

### 工程特点：
- 基于rollup打包，不污染原生网页Js
- 经过打包混淆代码减少体积，并通过将app打包为模块进行按需加载

### 适配站点
- `百度` 搜索结果过滤广告
- `知乎` 内容中的广告过滤、侧边广告过滤、自动弹出登录窗口自动关闭
- `csdn` 广告过滤、侧边无用内容精简、隐藏文章内容自动显示

### APP
app定义为：每个网站域名作为app的唯一编号，通过插件拉取代码并执行。以实现针对特定网站进行js处理，例如获取数据、扩展网站功能等。

app包含版本，加载逻辑同小程序，会在打开网页后获取app代码


## 目录说明
- `config` rollup打包配置，无需修改
- `plugins` 针对不同浏览器插件代码，例如chrome。一般只包含插件服务地址维护等基本内容，远程加载bundle.js。
- **`src`** 插件业务代码，包含插件通用能力（例如websocket）以及针对不同域名加载对应应用js

## 开发说明
### 一、开发
1. 浏览器加载`plugins`中对应浏览器插件代码，例如chrome，使插件生效
2. 执行`npm start`启动rollup编译并监听文件修改，同时启动一个web服务监听8080端口，请求`http://localhost:8080/bundle.js`即可加载。将该地址配置到插件main.js中，远程加载。例如修改`plugins/chrome/scripts/main.js`第八行，将jsUrl固定为上述地址。
3. 打开浏览器查看效果
4. 修改src下的代码保存刷新浏览器即可看到最新代码


### 二、部署
执行如下命令
```sh
# 打包为es模块
npm run build:es
```
