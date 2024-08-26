import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
    data: T
    message: string
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
