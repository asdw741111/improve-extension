/*
 * 插件主逻辑，用于从远程加载bundle.js
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 10:07:19
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-19 15:14:46
 * @FilePath    : /improve/plugins/chrome/scripts/main.js
 */

(function (){
  /**
     * 加载入口js
     * @param {string} js
     */
  const loadBundleJs = (jsUrl) => {
    // for development set in localStorage
    // for test TODO 如果需要打包插件，需要将下边这样注释。改地址对应本工程启动后的脚本访问路径，通过npm start启动
    jsUrl = "http://localhost:8080/bundle.js"
    var ele = document.createElement("script")
    ele.src = jsUrl
    document.head.appendChild(ele)
    ele.remove()
  }


  const init = function (){
    loadBundleJs("https://shengsheng.site/plugin/bundle.js?_=" + Date.now())
  }

  init()

})()
