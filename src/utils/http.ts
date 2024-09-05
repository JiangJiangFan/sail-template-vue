import instance, { ApiResponseData } from './request';

function get<T>(url: string, params?: {}): Promise<ApiResponseData<T>> {
  return instance.get(url, { params });
}

function post<T>(url: string, data?: {}): Promise<ApiResponseData<T>> {
  return instance.post(url, data);
}

function put<T>(url: string, data?: {}): Promise<ApiResponseData<T>> {
  return instance.put(url, data);
}

function getExcel<T>(url: string, params?: T): Promise<ApiResponseData<T>> {
  return instance.request({ url, method: 'GET', responseType: 'arraybuffer', params });
}

function getBlob<T>(url: string, params?: T): Promise<ApiResponseData<T>> {
  return instance.request({ url, method: 'POST', responseType: 'blob', params });
}

function del<T>(url: string, params?: {}): Promise<ApiResponseData<T>> {
  return instance.delete(url, { params });
}

export { get, post, put, getExcel, getBlob, del };
