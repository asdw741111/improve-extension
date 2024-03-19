/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 14:31:24
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-19 15:41:42
 * @FilePath    : /improve/src/apps/sites/baidu.ts
 */

import { waitUntilRender } from "../utils"
import $ from "jquery"

const removeAd = () => {
  $("#content_left > div:contains(广告)").remove()
  $(".ad-widget").remove()
}

const registEvent = () => {
  waitUntilRender({
    check: () => $("#_mask").length > 0,
  }).then(() => {
    console.log("等待请求数据后移除广告")
    waitUntilRender({
      check: () => !$("#_mask").length,
      maxWaitSecond: 5,
    }).then(() => {
      setTimeout(() => {
        console.log("请求结束 移除广告", $("#content_left > div").length)
        removeAd()
      }, 100)
    })
  })
}

/**
 * 示例：
 * 实现功能如下：
 * 1、移除结果的广告
 */
const init = () => {
  console.log("extend baidu")
  "use strict"
  setInterval(() => {
    removeAd()
  }, 200)
}

export default {
  init,
}
