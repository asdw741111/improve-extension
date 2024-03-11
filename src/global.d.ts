/*
* 文件描述信息
* @author      : 池宗洋 chizongyang@mininglamp.com
* @date        : 2023-01-17 15:58:30
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:34:14
 * @FilePath    : /improve/src/global.d.ts
*/
/* eslint-disable no-unused-vars */

interface Date {
  format: (fmt: string) => string
}
/**
 * 当前环境 development或者production
 */
declare const NODE_ENV: "production" | "development"
declare const BUILD_MODE: "iife" | "es"

declare type LoadScriptPayloadType = {
  login?: boolean
  title?: string
  uri: string
  userAgent?: string
  userId?: string
  userName?: string
}

/**
 * http请求参数类型
 */
type HttpRequestContentType = "multipart/form-data" | "application/json;charset=UTF-8" | "application/x-www-form-urlencoded"

/**
 * 站点插件配置数据
 */
type SitePluginConfigType = {
  id: number
  name: string
  version: string
  match: string
  devMatch?: string
  enable?: boolean
  mod?: any
  url?: string
  /** 帮助文档信息，可以是url或者markdown格式 */
  readme?: string
}

