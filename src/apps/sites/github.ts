/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * 示例：
 * 实现功能如下：
 * 1、添加版本下载链接
 */
const init = () => {
  console.log("extend github")
  "use strict"
  const menu_rawFast = 0
  const download_url_us = [
      ["https://gh.h233.eu.org/https://github.com", "美国", ""],
      ["https://gh.ddlc.top/https://github.com", "美国", ""],
      ["https://dl.ghpig.top/https://github.com", "美国", ""],
      ["https://slink.ltd/https://github.com", "美国", ""],
      ["https://git.xfj0.cn/https://github.com", "美国", ""],
      ["https://gh.con.sh/https://github.com", "美国", ""],
      ["https://cors.isteed.cc/github.com", "美国", ""],
      ["https://hub.gitmirror.com/https://github.com", "美国", ""],
      ["https://sciproxy.com/github.com", "美国", ""],
      ["https://ghproxy.cc/https://github.com", "美国", "[美国 洛杉矶]"],
      ["https://cf.ghproxy.cc/https://github.com", "美国", ""],
      ["https://940740.xyz/https://github.com", "美国", ""],
      ["https://download.nuaa.cf", "美国", "[美国 洛杉矶]"],
      ["https://download.scholar.rr.nu", "美国", "[美国 纽约]"],
      ["https://download.yzuu.cf", "美国", "[美国 纽约]"]
    ], download_url = [
      ["https://mirror.ghproxy.com/https://github.com", "韩国", "[日本、韩国、德国等]（CDN 不固定）"],
      ["https://ghproxy.net/https://github.com", "日本", "[日本 大阪]"],
      ["https://kkgithub.com", "香港", "[中国香港、日本、新加坡等]"],
    ], raw_url = [
      ["https://raw.githubusercontent.com", "Github 原生", "[日本 东京]"],
      ["https://raw.kkgithub.com", "香港", "[中国香港、日本、新加坡等]"],
      ["https://mirror.ghproxy.com/https://raw.githubusercontent.com", "韩国", "[日本、韩国、德国等]（CDN 不固定）"],
      ["https://ghproxy.net/https://raw.githubusercontent.com", "日本 1", "[日本 大阪]"],
      ["https://fastly.jsdelivr.net/gh", "日本 2", "[日本 东京]"],
      ["https://fastraw.ixnic.net", "日本 3", "[日本 大阪]"],
      ["https://cdn.jsdelivr.us/gh", "其他 1", "[韩国、美国、马来西亚、罗马尼亚等]（CDN 不固定）"],
      ["https://jsdelivr.b-cdn.net/gh", "其他 2", "[中国香港、台湾、日本、新加坡等]（CDN 不固定）"],
      ["https://github.moeyy.xyz/https://raw.githubusercontent.com", "其他 3", ""],
      ["https://raw.cachefly.998111.xyz", "其他 4", ""],
    ], svg = [
      ""
    ], style = ["padding:0 6px; margin-right: -1px; border-radius: 2px; background-color: var(--XIU2-back-Color); border-color: rgba(27, 31, 35, 0.1); font-size: 11px; color: var(--XIU2-font-Color);"]

  setTimeout(addRawFile, 1000) // Raw 加速
  setTimeout(addRawDownLink, 2000) // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉

  if (!("onurlchange" in window)) addUrlChangeEvent()
  window.addEventListener("urlchange", () => {
    if (location.pathname.indexOf("/releases")) addRelease() // Release 加速
    setTimeout(addRawFile, 1000) // Raw 加速
    setTimeout(addRawDownLink, 2000) // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉
  })


  // Github Git Clone/SSH、Release、Download ZIP 改版为动态加载文件列表，因此需要监控网页元素变化
  const callback = (mutationsList, observer) => {
    if (location.pathname.indexOf("/releases") > -1) { // Release
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType !== 1) return
          if (target.tagName === "DIV" && target.dataset.viewComponent === "true" && target.classList[0] === "Box") addRelease()
        }
      }
    } else if (document.querySelector("#repository-container-header:not([hidden])")) { // 项目首页
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType !== 1) return
          if (target.tagName === "DIV" && target.parentElement.id === "__primerPortalRoot__") {
            addDownloadZIP(target)
          }
        }
      }
    }
  }
  const observer = new MutationObserver(callback)
  observer.observe(document, { childList: true, subtree: true })


  // download_url 随机 4 个美国加速源
  function get_New_download_url () {
    // return download_url_us.concat(download_url) // 全输出调试用
    let temp = [], index = 0, i = download_url_us.length
    const shuffled = download_url_us.slice(0), min = i - 4
    while (i-- > min) {index = Math.floor((i + 1) * Math.random()); temp = shuffled[index]; shuffled[index] = shuffled[i]; shuffled[i] = temp}
    return shuffled.slice(min).concat(download_url) // 随机洗牌 download_url_us 数组并取前 4 个，然后将其合并至 download_url 数组
  }

  // Release
  function addRelease () {
    const html = document.querySelectorAll(".Box-footer"); if (html.length == 0 || location.pathname.indexOf("/releases") == -1) return
    let divDisplay = "margin-left: -90px;"
    const new_download_url = get_New_download_url()
    if (document.documentElement.clientWidth > 755) {divDisplay = "margin-top: -3px;margin-left: 8px;display: inherit;"}; // 调整小屏幕时的样式
    for (const current of html) {
      if (current.querySelector(".XIU2-RS")) continue
      current.querySelectorAll("li.Box-row a").forEach((_this: HTMLAnchorElement) => {
        const href = _this.href.split(location.host)
        let url = "", _html = `<div class="XIU2-RS" style="${divDisplay}">`

        for (let i = 0;i < new_download_url.length;i++) {
          if (new_download_url[i][3] !== undefined && url.indexOf("/archive/") !== -1) {
            url = new_download_url[i][3] + href[1]
          } else {
            url = new_download_url[i][0] + href[1]
          }
          if (location.host !== "github.com") url = url.replace(location.host,"github.com")
          _html += `<a style="${style[0]}" class="btn" href="${url}" title="${new_download_url[i][2]}" rel="noreferrer noopener nofollow">${new_download_url[i][1]}</a>`
        }
        _this.parentElement.nextElementSibling.insertAdjacentHTML("beforeend", _html + "</div>")
      })
    }
  }


  // Download ZIP
  function addDownloadZIP (target) {
    const html = target.querySelector("ul[class^=List__ListBox-sc-] ul[class^=List__ListBox-sc-]>li:last-child");if (!html) return
    const href_script = document.querySelector("react-partial[partial-name=repos-overview]>script[data-target=\"react-partial.embeddedData\"]"),
      href_slice = href_script.textContent.slice(href_script.textContent.indexOf("\"zipballUrl\":\"") + 14),
      href = href_slice.slice(0, href_slice.indexOf("\"")),
      new_download_url = get_New_download_url()
    let url = "", _html = ""

    // 克隆原 Download ZIP 元素，并定位 <a> <span> 标签
    const html_clone = html.cloneNode(true),
      html_clone_a = html_clone.querySelector("a[href$=\".zip\"]"),
      html_clone_span = html_clone.querySelector("span[id]")

    for (let i = 0;i < new_download_url.length;i++) {
      // eslint-disable-next-line no-continue
      if (new_download_url[i][3] === "") continue

      if (new_download_url[i][3] !== undefined) {
        url = new_download_url[i][3] + href
      } else {
        url = new_download_url[i][0] + href
      }
      if (location.host !== "github.com") url = url.replace(location.host,"github.com")

      html_clone_a.href = url
      html_clone_a.setAttribute("title", new_download_url[i][2].replaceAll("&#10;","\n"))
      html_clone_span.textContent = "Download ZIP " + new_download_url[i][1]
      _html += html_clone.outerHTML
    }
    html.insertAdjacentHTML("afterend", _html)
  }

  // Raw
  function addRawFile () {
    const html = document.querySelector("a[data-testid=\"raw-button\"]");if (!html) return
    const href = location.href.replace(`https://${location.host}`,""),
      href2 = href.replace("/blob/","/")
    let url = "", _html = ""

    for (let i = 1;i < raw_url.length;i++) {
      if ((raw_url[i][0].indexOf("/gh") + 3 === raw_url[i][0].length) && raw_url[i][0].indexOf("cdn.staticaly.com") === -1) {
        url = raw_url[i][0] + href.replace("/blob/","@")
      } else {
        url = raw_url[i][0] + href2
      }
      _html += `<a href="${url}" title="${raw_url[i][2]}" target="_blank" role="button" rel="noreferrer noopener nofollow" data-size="small" class="${html.className} XIU2-RF">${raw_url[i][1].replace(/ \d/,"")}</a>`
    }
    if (document.querySelector(".XIU2-RF")) document.querySelectorAll(".XIU2-RF").forEach((e) => {e.remove()})
    html.insertAdjacentHTML("afterend", _html)
  }


  // Raw 单文件快捷下载（☁）
  function addRawDownLink () {
    // 如果不是项目文件页面，就返回，如果网页有 Raw 下载链接就返回
    const files = document.querySelectorAll("div.Box-row svg.octicon.octicon-file, .react-directory-filename-column>svg.color-fg-muted");if(files.length === 0) return;if (location.pathname.indexOf("/tags") > -1) return
    const files1 = document.querySelectorAll("a.fileDownLink");if(files1.length > 0) return

    // 循环添加
    files.forEach((fileElm) => {
      const trElm = fileElm.parentNode.parentNode,
        cntElm_a: HTMLElement = trElm.querySelector("[role=\"rowheader\"] > .css-truncate.css-truncate-target.d-block.width-fit > a, .react-directory-truncate>a"),
        Name = cntElm_a.innerText,
        href = cntElm_a.getAttribute("href"),
        href2 = href.replace("/blob/","/")
      let url = ""
      if ((raw_url[menu_rawFast][0].indexOf("/gh") + 3 === raw_url[menu_rawFast][0].length) && raw_url[menu_rawFast][0].indexOf("cdn.staticaly.com") === -1) {
        url = raw_url[menu_rawFast][0] + href.replace("/blob/","@")
      } else {
        url = raw_url[menu_rawFast][0] + href2
      }

      fileElm.insertAdjacentHTML("afterend", `<a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;">${svg[0]}</a>`)
    })
  }

  // 自定义 urlchange 事件（用来监听 URL 变化）
  function addUrlChangeEvent () {
    history.pushState = ( (f) => function pushState (){
      var ret = f.apply(this, arguments)
      window.dispatchEvent(new Event("pushstate"))
      window.dispatchEvent(new Event("urlchange"))
      return ret
    })(history.pushState)

    history.replaceState = ( (f) => function replaceState (){
      var ret = f.apply(this, arguments)
      window.dispatchEvent(new Event("replacestate"))
      window.dispatchEvent(new Event("urlchange"))
      return ret
    })(history.replaceState)

    window.addEventListener("popstate",() => { // 点击浏览器的前进/后退按钮时触发 urlchange 事件
      window.dispatchEvent(new Event("urlchange"))
    })
  }
}

export default {
  init,
}
