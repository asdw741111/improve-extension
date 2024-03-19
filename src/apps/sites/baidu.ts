/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 14:31:24
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-19 16:35:16
 * @FilePath    : /improve/src/apps/sites/baidu.ts
 */

import $ from "jquery"

const removeAd = () => {
  $("#content_left > div:contains(广告)").remove()
  $(".ad-widget").remove()
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
