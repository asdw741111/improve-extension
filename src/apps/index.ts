/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:57:08
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:33:29
 * @FilePath    : /improve/src/apps/index.ts
 */
import { IS_IIFE, } from "@/utils"
import { sites } from "./config"
import { loadLib } from "./utils"

const activeApp = (scriptInfo: typeof sites[0]) => {
  console.log(">>>>>", scriptInfo)
  if (!scriptInfo) {
    return
  }
  if (!scriptInfo.enable) {
    console.log("检测到站点对应脚本，当前未启用，退出")
    return
  }
  console.log("匹配到应用", scriptInfo.name, "开始执行")
  if (scriptInfo.mod) {
    if (IS_IIFE) {
      scriptInfo.mod.init()
    } else {
      import(`./sites/${scriptInfo.mod}.ts`).then(({ default: DefaultExport}) => DefaultExport.init())
    }
    console.log("load mod", scriptInfo.mod)
  } else if (scriptInfo.url) {
    loadLib(scriptInfo.url)
  }
}

// 处理match，如果是开发环境优先取devMatch
const configSites = sites.map((o) => ({...o, match: (NODE_ENV === "development" ? o.devMatch : o.match) || o.match}))

const loadScript = (payload: LoadScriptPayloadType) => {
  const { uri, } = payload
  // log
  if (!uri || !uri.match(/^http(s):\/\//)) {
    console.warn("只有http和https站点执行脚本，当前不满足退出")
    return
  }
  const apps = configSites.filter((o) => uri.match(o.match))
  if (apps.length) {
    apps.forEach(activeApp)
  }
}


export {
  loadScript,
}
