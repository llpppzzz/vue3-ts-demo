/**
 * 判断是否是 undefined
 * @param val
 * @return {boolean}
 */
export function isUndefined(val) {
  return typeof val === 'undefined'
}

/**
 * 判断是否为函数
 * @param value
 * @return {boolean}
 */
export function isFunction(value) {
  return typeof value === 'function' && value.constructor === Function
}

/**
 * 判断是否 Object 类型，且排除 null 值
 * @param value
 * @return {boolean}
 */
export function isObject(value) {
  return value !== null && typeof value === 'object'
}

/**
 * 判断是否为数值
 * @param value
 * @return {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && value.constructor === Number
}

/**
 * 判断是否为字符串
 * @param value
 * @return {boolean}
 */
export function isString(value) {
  return typeof value === 'string' && value.constructor === String
}

/**
 * 判断是否为布尔值
 * @param value
 * @return {boolean}
 */
export function isBoolean(value) {
  return typeof value === 'boolean' && value.constructor === Boolean
}

/**
 * 判断是否为 DOM 元素
 * @param value
 * @return {boolean}
 */
export function isElement(value) {
  return isObject(value) && value.nodeType === 1 && isString(value.nodeName)
}

/**
 * 判断是否为空，包括空字符串、undefined、null、空对象、空数组
 * @param value
 * @return {boolean}
 */
export function isEmpty(value) {
  return (
    value === '' ||
    value === undefined ||
    value === null ||
    (isObject(value) && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
  )
}

/**
 * 判断是否是有效的 Date 对象
 * @param value
 * @return {boolean}
 */
export function isValidDate(value) {
  return value instanceof Date && !isNaN(value.getTime())
}

/**
 * 判断是否百分比
 * @param {string} value - 判断的值
 * @return {boolean}
 */
export function isPercent(value) {
  return /^-?\d+(\.\d+)?%$/.test(value)
}

/**
 * JSON 字符串转 JSON 对象
 * 转换失败时，返回 null
 * @param str
 * @return {null|any}
 */
export function safeParse(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

/**
 * URL 格式化，将 URL 中的 {key} 替换成对应变量
 * @param url
 * @param map
 * @return String
 */
export function formatURL(url, map) {
  map = map || {}
  return url.replace(/{(\w+)}/g, (match, key) => {
    const value = map[key]
    return typeof value !== 'undefined' ? encodeURIComponent(value + '') : match
  })
}

/**
 * 用于安全创建一个正则表达式
 * 本质上就是通过 new RegExp() 来创建
 * 只不过创建之前，先将正则的关键字符转义一次
 * @param pattern
 * @param flags
 */
export function createRegExp(pattern, flags) {
  pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(pattern, flags)
}

/**
 * 驼峰转短横线
 * @param {string} str
 */
export function camelToKebab(str) {
  return str.replace(/[A-Z]/g, ($1) => {
    return '-' + $1.toLowerCase()
  })
}

/**
 * 短横线转驼峰
 * @param {string} str
 */
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, ($0, $1) => {
    return $1.toUpperCase()
  })
}

/**
 * 中横线转首字母大写
 * @param {string} str
 */
export function kebabToPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, ($0, $1) => {
    return $1.replace('-', '').toUpperCase()
  })
}

/**
 * 首字母转大写
 * @param {string} str
 */
export function firstCharToUpperCase(str) {
  return str.replace(/^\w/, ($1) => $1.toUpperCase())
}

/**
 * 首字母转小写
 * @param {string} str
 */
export function firstCharToLowerCase(str) {
  return str.replace(/^\w/, ($1) => $1.toLowerCase())
}

/**
 * hex 颜色转 RGBA
 * @param hex
 * @param opacity
 * @returns {string}
 */
export function hexToRGBA(hex, opacity = 1) {
  const regex = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i
  const matched = (hex || '').match(regex)
  if (matched) {
    const red = parseInt(matched[1], 16)
    const green = parseInt(matched[2], 16)
    const blue = parseInt(matched[3], 16)
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
  }
}

/**
 * 简单快速拷贝，不考虑原型链，function 之类的
 */
export function quickCopy(value) {
  if (isObject(value) || Array.isArray(value)) {
    return JSON.parse(JSON.stringify(value))
  }
  return value
}
