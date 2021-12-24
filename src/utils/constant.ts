/**
 * HTTP 状态吗
 */
export const STATUS_OK = 200
export const STATUS_BAD_REQUEST = 400
export const STATUS_UNAUTHORIZED = 401
export const STATUS_FORBIDDEN = 403
export const STATUS_NOT_FOUND = 404
export const STATUS_REQUEST_TIMEOUT = 408
export const STATUS_NO_MORE = 410
export const STATUS_ENTITY_TWO_LARGE = 413
export const STATUS_INTERNAL_SERVER_ERROR = 500
export const STATUS_BAD_GATEWAY = 502
export const STATUS_SERVICE_UNAVAILABLE = 503
export const STATUS_GATEWAY_TIMEOUT = 504 // 网关超时, 一般是后台服务挂
export const STATUS_NETWOEK_ERROR = 0 // 没有网络

export const API_REQUEST_TIMEOUT = 60000 // API 超时时间，ms
export const API_REQUEST_CONTENT_TYPE = 'application/json' // API Content-Type 默认类型

export const EARN_CATEGORY_LIST = ['工资', '兼职']
export const COAST_CATEGORY_LIST = ['住房', '投资', '汽车', '交通', '餐饮', '长辈', '保险', '服饰', '数码', '份子钱', '美容', '宠物', '居家', '大餐', '日用', '娱乐', '社交', '日常洗护', '水电煤气', '零食', '水果', '旅行', '通讯', '烟酒', '其他', '医疗', '书籍', '快递', '礼物', '维修', '购物', '婚礼']
