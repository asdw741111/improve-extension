import { Looper } from "@/utils"

/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2023-03-22 18:30:46
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 15:11:01
 * @FilePath    : /improve/src/apps/utils.ts
 */
const isProd = NODE_ENV === "production"

const loadJS = (url: string) => {
  const dom = document.createElement("script")
  dom.setAttribute("src", url)
  dom.setAttribute("type", "module")
  document.head.appendChild(dom)
}
/**
 * 远程加载模块。必须是es module，默认挂载到id=app的元素上。
 * 可以直接使用h5工程
 * @param url 应用地址，指定到目录即可，会自动加载url/index.js和url/style.css
 */
export const loadLib = (url: string) => {
  if (!isProd) {
    // loadJS("http://127.0.0.1:5173/@vite/client")
    loadJS("http://127.0.0.1:5173/src/main.ts")
    return
  }
  const t = new Date().getTime()
  loadJS(url + "/index.js?t=" + t)

  const css = document.createElement("link")
  css.setAttribute("href", url + "/style.css?t=" + t)
  css.setAttribute("rel", "stylesheet")
  document.head.appendChild(css)
}

/**
 * 计算元素的xpath
 * @param element 当前元素
 * @returns xpath
 */
export const getXPath = (element: HTMLElement) => {
  if (element.id !== "")
    return `//*[@id="${element.id}"]`
  if (element === document.body)
    return element.tagName.toLowerCase()

  var ix = 0
  var siblings = element.parentNode?.childNodes
  if (!siblings?.length) {
    console.error("无法获取元素路径", element)
    return ""
  }
  const addIdx = siblings.length > 1
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i] as HTMLElement
    if (sibling === element)
      return getXPath(element.parentNode as HTMLElement) + "/" + element.tagName.toLowerCase() + (addIdx ? "[" + (ix + 1) + "]" : "")
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
      ix++
  }
}

type WaitUntilRenderOption = {
  check: () => boolean
  /** 毫秒数 检查间隔 默认100 */
  interval?: number
  maxWaitSecond?: number
}
/**
 * 检测是否满足条件
 * @param param0 参数
 * @returns Promise<number>
 */
export const waitUntilRender = ({ check, interval = 100, maxWaitSecond = 0 }: WaitUntilRenderOption) => new Promise<number>((resolve, reject) => {
  const maxCount = maxWaitSecond > 0 ? (maxWaitSecond * 1000 / interval) : Number.MAX_VALUE
  new Looper((l, count = 0) => {
    if (count > maxCount) {
      reject("超出最大检测时间")
      l.stop()
      return
    }
    if (check()) {
      l.stop()
      resolve(count * interval)
    }
  }, interval, true).start()
})

