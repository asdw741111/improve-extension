/*
 * 本地存储操作(基于localStorage)
 * @author      : 池宗洋 chizongyang@mininglamp.com
 * @date        : 2024-01-18 10:25:51
 * @LastAuthor  : 池宗洋 chizongyang@mininglamp.com
 * @lastTime    : 2024-01-18 11:22:09
 * @FilePath    : /sentinel/src/lib/store.ts
 */
/**
 * localStorage存储key和数据对应类型
 */
declare interface LocalStorageKeyType {
  /**
   * token
   */
  token: string
}
// 前缀
const LOCAL_STORAGE_KEY_PREFIX = "local_key_"
/**
 * localstorage设置数据
 * @param key key
 * @param data 数据
 */
export const localSet = <K extends keyof LocalStorageKeyType>(key: K, data: LocalStorageKeyType[K]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(data))
}
/**
 * 移除数据
 * @param key key
 */
export const localRemove = <K extends keyof LocalStorageKeyType>(key: K) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_PREFIX + key)
}
/**
 * localstorage获取数据
 * @param key key
 * @param defaultValue 默认数据
 * @returns 数据
 */
export const localGet = <K extends keyof LocalStorageKeyType>(key: K, defaultValue?: LocalStorageKeyType[K]): LocalStorageKeyType[K] => {
  const str = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key)
  if (str === "undefined") {
    return str as any
  }
  if (str) {
    try {
      return JSON.parse(str) as LocalStorageKeyType[K]
    } catch (e) {
      return str as any
    }
  }
  return defaultValue as any
}
