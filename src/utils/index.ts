/*
 * 工具
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2023-05-05 14:22:23
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-03-11 10:30:12
 * @FilePath    : /improve/src/utils/index.ts
 */


/**
 * 是否生产环境
 */
export const IS_PROD = NODE_ENV === "production"
export const IS_IIFE = BUILD_MODE === "iife"

/**
 * 从url获取query值
 * @param name 参数名
 * @returns string | null
 */
export function queryURL (name: string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i")
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 定时任务，采用setTime方式，防止某些情况下例如插件内使用setInterval无效问题
 */
export class Looper {
  private loopCount: number
  private running: boolean
  private secMs: number
  private cb: (me: Looper, count?: number) => void
  private timeoutId: ReturnType<typeof setTimeout>

  constructor (cb: (me: Looper, count?: number) => void, intMS?: number, initialRunning = false) {
    this.running = initialRunning
    this.secMs = intMS || 1000
    this.cb = cb
    this.loopCount = 0

    if (initialRunning) {
      this.start()
    }
  }

  doLoop () {
    if (!this.running) {
      return
    }
    try {
      this.cb(this, this.loopCount++)
    } catch (e) {console.error("execute error", e)}
    this.timeoutId = setTimeout(() => this.doLoop(), this.secMs)
  }

  start () {
    this.running = true
    this.doLoop()
    return this
  }

  stop () {
    this.running = false
    clearTimeout(this.timeoutId)
    return this
  }
}

export const isDomVisible = (dom: HTMLElement) => dom.style.display !== "none" && dom.style.visibility !== "hidden"

export const qs = {
  stringify: (obj: any) => {
    if (typeof(obj) !== "object") {
      return ""
    }
    const str = Object.entries(obj).map(([k, v]) => Array.isArray(v) ? v.map((sv, i) => `${k}[${i}]=${sv}`).join("&") : `${k}=${v}`).join("&")
    return encodeURI(str)
  },
}
/**
 * 列表转为树形结构
 * @param array 数组
 * @param id id的字段名，用于对象pid
 * @param pid 上级id的字段名，用于构成children
 * @param children 下一级字段名称
 * @returns any[]
 */
export function arrayToTree <T> (array: T[], id: keyof T = "id" as any, pid: keyof T = "pid" as any, children = "children") {
  const data = structuredClone(array)
  const result = []
  const hash: Record<string | number, T> = {}
  data.forEach((item, index) => {
    hash[data[index][id] as string | number] = data[index]
  })

  data.forEach((item) => {
    const hashVP = hash[item[pid] as string | number]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 分组
 * @param list 数据
 * @param by 根据哪个字段分组
 * @returns any
 */
export const groupBy = <T, B extends keyof T> (list: T[], by: B) => {
  type GK = string | number | symbol
  const g: Record<GK, T[]> = {}
  list.forEach((t) => {
    const bd = t[by] as GK
    const l = g[bd] || []
    l.push(t)
    g[bd] = l
  })
  return g
}
/**
 * 全局通用数据存储
 */
export const store = {
  _data: new Map<string, any>(),
  setItem: (key: string, value: any) => store._data.set(key, value),
  getItem: (key: string) => store._data.get(key),
  removeItem: (key: string) => {
    store._data.delete(key)
  },
}

const COMPARE_RESULT = {
  GT: 1,
  EQ: 0,
  LT: -1,
}
/**
 * 比较两个版本号
 * @param {string} v1 版本号1
 * @param {string} v2 版本号2
 * @returns {number} 比较结果 如果v1 > v2 返回1 v1=v2 返回 0 v1 < v2 返回-1
 */
export const versionCompare = (v1: string, v2: string) => {
  if (!v1 && !v2) return COMPARE_RESULT.EQ
  if (!v1) return COMPARE_RESULT.LT
  if (!v2) return COMPARE_RESULT.GT
  const arr1 = v1.split(".")
  const arr2 = v2.split(".")
  const len = Math.min(arr1.length, arr2.length)
  for(let i = 0;i < len; i++) {
    const str1 = arr1[i]
    const str2 = arr2[i]
    if (!str1 || !str2) {
      return versionCompare(str1, str2)
    }
    if (str1 !== str2) {
      const resultInt = parseInt(str1) - parseInt(str2)
      return resultInt === 0 ? 0 : resultInt / Math.abs(resultInt)
    }
  }
  return arr1.length === arr2.length ? COMPARE_RESULT.EQ : (arr1.length < arr2.length ? COMPARE_RESULT.LT : COMPARE_RESULT.GT)
}
