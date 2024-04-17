/*
 * 站点信息，后边会改为通过接口获取，远程拉取+本地缓存模式
 * 注意：此处配置应当只用于debug，发布的时候需要配置到数据库
 *
 * 说明：
 *  match: 正则匹配站点
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:57:08
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-19 18:30:28
 * @FilePath    : /improve/src/apps/config.ts
 */
import csdn from "./sites/csdn"
import zhihu from "./sites/zhihu"
import baidu from "./sites/baidu"
import github from "./sites/github"
import bing from "./sites/bing"

const sites = [
  {id: 1, name: "zhihu", match: "https://zhuanlan.zhihu.com/p/.+", enable: true, version: "1.0.0", mod: zhihu},
  {id: 2, name: "zhihu2", match: "https://www.zhihu.com/question/.+", enable: true, version: "1.0.0", mod: zhihu},
  {id: 3, name: "csdn", match: "https://blog.csdn.net/.+/article/details/.+", enable: true, version: "1.0.0", mod: csdn},
  {id: 4, name: "baidu", match: "https://www.baidu.com/s?.+", enable: true, version: "1.0.0", mod: baidu},
  {id: 5, name: "github", match: "https://github.com/.+", enable: true, version: "1.0.0", mod: github},
  {id: 6, name: "bing", match: "https://cn.bing.com/search[?]q=.+", enable: true, version: "1.0.0", mod: bing},
] as SitePluginConfigType[]


/* ____________________ 脚本，应当从远程获取，目前先从本地加载 ______________________*/


export {
  sites,
}
