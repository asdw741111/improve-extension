/*
 * 站点信息，后边会改为通过接口获取，远程拉取+本地缓存模式
 * 注意：此处配置应当只用于debug，发布的时候需要配置到数据库
 *
 * 说明：
 *  match: 正则匹配站点
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2022-02-23 17:57:08
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:26:00
 * @FilePath    : /improve/src/apps/config.ts
 */
// import admonitor from "./sites/admonitor"
import { IS_IIFE } from "@/utils"
import csdn from "./sites/csdn"

const sites = [
  {id: 2, name: "csdn", match: "https://blog.csdn.net/.+/article/details/.+", enable: true, version: "1.0.0", mod: IS_IIFE ? csdn : "csdn"},
] as SitePluginConfigType[]


/* ____________________ 脚本，应当从远程获取，目前先从本地加载 ______________________*/


export {
  sites,
}
