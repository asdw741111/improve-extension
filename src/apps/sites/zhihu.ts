/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 14:31:24
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-19 15:10:08
 * @FilePath    : /improve/src/apps/sites/zhihu.ts
 */

import { enableCopy, waitUntilRender } from "../utils"
import $ from "jquery"

const checkLogin = () => {
  waitUntilRender({
    check: () => $("div:contains(验证码登录)").length > 0,
    maxWaitSecond: 5,
  }).then(() => {
    $(".Modal-closeButton").trigger("click")
  })

  waitUntilRender({
    check: () => $("div:contains(登录即可查看)").length > 0,
    maxWaitSecond: 30,
  }).then(() => {
    console.log("xx", $("div:contains(登录即可查看):last"))
    $("div:contains(登录即可查看):last").parent().parent().remove()
  })
}
/**
 * 链接去除跳转页面
 */
const plainLink = () => {
  const adoms = $("a[href^='https://link']")
  $.each(adoms, (i, dom) => {
    const href = $(dom).attr("href")
    const originUrl = decodeURIComponent(href.split("target=")[1])
    if (originUrl) {
      $(dom).attr("href", originUrl)
    }
  })
}

const removeAd = () => {
  // 侧边广告
  $(".Banner-link").remove()
  // 问题中间插入的广告
  $(".Pc-word").remove()
  // 取消复制后追加转载信息等垃圾内容
  const arr = document.getElementsByClassName("ztext")
  enableCopy(arr)
}

const addPanel = () => {
  const btn = $("<button type='button' class=\"Button Button--primary\" style=\"position: fixed;right: 20px;top: 10px;z-index:99999;\">清洁模式</button>")
  $(document.body).append(btn)
  btn.on("click", () => {
    plainLink()
    removeAd()
  })
}
/**
 * 示例：
 * 实现功能如下：
 * 1、移除登录
 */
const init = () => {
  console.log("extend zhihu")
  "use strict"
  checkLogin()
  plainLink()
  // removeAd()
  addPanel()
}

export default {
  init,
}
