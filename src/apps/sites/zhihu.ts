/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 14:31:24
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 15:25:46
 * @FilePath    : /improve/src/apps/sites/zhihu.ts
 */

import { waitUntilRender } from "../utils"
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
}

export default {
  init,
}
