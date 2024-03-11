/*
 * 文件描述信息
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-03-11 10:07:22
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:36:36
 * @FilePath    : /improve/src/lib/extension.ts
 */
/**
 * 基于websocket做接口数据请求和返回，流程为：
 * 1、和插件后台服务建立websocket连接，传入页面信息，包含用户信息
 * 2、调用插件服务的execute方法执行查询，会通过websocket发送到对应页面并将返回结果返回
 *
 * 忽略网路延迟，经测试execute方法比在页面直接请求接口增加延迟小于100ms，平均10ms，和数据量有关
 */
import { loadScript, } from "../apps/index"
import $ from "jquery"

const page = {
  init (){
    /**
     * 针对当前站点加载脚本js
     */
    $(() => {
      loadScript({ uri: location.href, })
    })
  },
}

export default page
