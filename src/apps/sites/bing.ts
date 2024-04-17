/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 * 站点应用
 */

import $ from "jquery"

const removeAd = () => {
  $(".b_ad").remove()
}


/**
 * 示例：
 * 实现功能如下：
 * 1、移除结果的广告
 */
const init = () => {
  console.log("extend bing")
  "use strict"
  setInterval(() => {
    removeAd()
  }, 200)
}

export default {
  init,
}
