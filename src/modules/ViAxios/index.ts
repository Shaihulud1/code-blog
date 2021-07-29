import store from '@/store'
import axios from 'axios'
import { RequestConfig, ViAxiosResponse } from './types'
import router from '@/router'


axios.interceptors.request.use(config => {
  const token: string = store.getters.getRefreshToken
  if (token && config.url != '/api/internal/auth/login') {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(function (response) {
  if (response?.data?.accessToken) {
    store.dispatch('setRefreshToken', response?.data?.accessToken)
  }
  return response;
});


const ViAxios = async <T>(requestConfig: RequestConfig): Promise<ViAxiosResponse> => {
  let headers = { 'Content-Type': 'application/json' }
  if (requestConfig.headers) {
    headers = Object.assign(headers, requestConfig.headers)
  }
  let url = requestConfig.url
  if (requestConfig.params) {
    url += '?'
    for (const [key, value] of Object.entries(requestConfig.params)) {
      url += `&${key}=${value}`
    }
  }
  const options = {
    method: requestConfig.method,
    baseURL: 'http://localhost:3001',
    url: url,
    headers: headers,
    data: requestConfig.body ? JSON.stringify(requestConfig.body) : ''
  }
  let isSuccess = true
  const response = await axios(options).catch(error => {
    if (error.response.status === 401) {
      router.push('/')
    }
    isSuccess = false
    error.code = error.response.status
    error.message = error.response.message
    return error.response
  })
    type ViAxiosResponse1 = {
        success: boolean;
        response: T;
        error?: {
            message: string,
            code: string,
        },
        code: number;
    }
    const returnData: ViAxiosResponse1 = {
      success: isSuccess,
      response: response.data as T,
      error: !isSuccess ? { code: response.data.code, message: response.data.message } : undefined,
      code: response.status
    }
    return returnData
}

export default ViAxios
