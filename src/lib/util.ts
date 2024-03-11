/*
 * 工具集合
 * 2021/8/2
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:57:08
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2023-03-22 21:01:16
 * @FilePath    : /sentinel/src/lib/util.ts
 */

/**
 * 拖动
 * @param {Element} dom
 */
const draggable = (dom: HTMLElement) => {
  dom.onmousedown = function (e) {
    const disx = e.pageX - dom.offsetLeft
    const disy = e.pageY - dom.offsetTop

    const oldMoveFn = document.onmousemove
    const oldUpFn = document.onmouseup
    document.onmousemove = function (em) {
      dom.style.left = em.pageX - disx + "px"
      dom.style.top = em.pageY - disy + "px"
    }
    // 释放鼠标按钮，将事件清空，否则始终会跟着鼠标移动
    document.onmouseup = function () {
      document.onmousemove = oldMoveFn
      document.onmouseup = oldUpFn
    }
  }
}

const ACTIVE_DOM_ID = "plugin_active_id"
/**
 * 显示启动标记
 */
export const showActive = () => {


  // 添加已启动的按钮
  var dom = document.createElement("button")
  dom.id = ACTIVE_DOM_ID
  dom.setAttribute("style", "width: 140px;height:36px;z-index: 9999;position: absolute;top: 55px;right: 24px;background: red;color: #fff;border-radius: 2px;border: none;")
  dom.textContent = "插件已启动"

  document.body.appendChild(dom)
  draggable(dom)
}
/**
 * 隐藏活动标记
 */
export const hiveActive = () => {
  const dom = document.getElementById(ACTIVE_DOM_ID)
  if (dom) {
    dom.remove()
  }
}
/**
 * 获取cookie
 * @param {string} name cookie名称
 * @returns cookie值
 */
export const getCookie = (name) => {
  var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)") // 匹配字段
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
/**
 * 获取二进制流
 * @param {json} {method, url}
 * @returns
 */
export const getBinary = ({
  method, url,
}) => new Promise<Blob>((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open((method || "GET").toUpperCase(), url, true)
  xhr.responseType = "blob"
  xhr.send()
  xhr.onload = function (e) {
    if (this.status == 200) {
      const blob = this.response
      resolve(blob)
    } else {
      reject(e)
    }
  }
})

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}
