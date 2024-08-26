/**
 * 所有api接口的响应数据格式
 */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}
