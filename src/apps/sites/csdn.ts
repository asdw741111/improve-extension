/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:57:08
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:24:04
 * @FilePath    : /improve/src/sites/csdn.ts
 */
/**
 * 示例：
 * 实现功能如下：
 * 1、csdn页面简化，去除顶部、左侧和下方广告
 * 2、加入全屏按钮，将文章内容全屏显示
 * 3、解除需要登录才可以复制的限制
 */
const init = () => {
  console.log("extend csdn")
  "use strict"
  const mdom = document.getElementById("content_views")
  mdom.setAttribute("id", "xxx")
  const pdom = mdom.parentElement
  const newMDom = document.createElement("div")
  newMDom.setAttribute("class", "markdown_views prism-atom-one-dark")
  newMDom.innerHTML = mdom.innerHTML
  mdom.remove()
  pdom.appendChild(newMDom);
  // document.cookie = "UserName=zhangsan";
  (window as any).csdn.loginBox.show = () => {}
  // 取消复制后追加转载信息等垃圾内容
  const arr = document.getElementsByTagName("code")
  for(let i = 0;i < arr.length;i++){arr[i].addEventListener("copy",() => {})}

  const removeGuanzhu = () => {
    const conDom = document.getElementById("article_content")
    conDom.style.height = "initial"
    conDom.style.overflow = "none"
    const guanzhuDiv = document.getElementsByClassName("hide-article-box")?.[0]
    if (guanzhuDiv){
      guanzhuDiv.remove()
    }
  }
  setTimeout(removeGuanzhu, 500)

  // remove ads
  document.getElementById("footerRightAds")?.remove()
  document.getElementById("csdn-toolbar")?.remove()

  document.getElementsByClassName("csdn-side-toolbar")[0].remove()
  // 展开高度
  const hideCodeDoms = document.getElementsByClassName("set-code-hide")
  if (hideCodeDoms.length > 0){
    for(let i = 0;i < hideCodeDoms.length;i++){
      hideCodeDoms[i].classList.remove("set-code-hide")
    }
  }

  // add full button
  const fullBtn = document.createElement("button")
  fullBtn.setAttribute("style", "padding: 5px 10px;background:black;box-shadow: 1px 1px 4px #FFFFFF;position: fixed;right: 20px;top: 20px;color:#FFFFFF;font-size: 12px;z-index:9999;")
  fullBtn.innerText = "FULL"

  document.body.append(fullBtn)
  fullBtn.addEventListener("click",() => {
    if (fullBtn.innerText === "EXIT"){
      fullBtn.innerText = "FULL"
      document.getElementById("dia").remove()
      return
    }
    const artHtml = document.getElementsByTagName("article")[0].innerHTML
    const dia = document.createElement("div")
    dia.setAttribute("style", "position:fixed;left:5px;right:5px;top:5px;bottom:5px;overflow:auto;z-index:999;background:rgba(255,255,255,.9);padding:10px;border:1px solid #aaa;")
    dia.setAttribute("id","dia")
    dia.innerHTML = artHtml
    document.body.append(dia)
    fullBtn.innerText = "EXIT"
  })
}

export default {
  init,
}
