import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 토큰 관리를 위한 함수들
const getToken = (): string | null => localStorage.getItem('token');
const setToken = (token: string): void => localStorage.setItem('token', token);
const removeToken = (): void => localStorage.removeItem('token');

// axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error: AxiosError) => {
    // 요청 에러 처리
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('응답 성공');
    // 응답 성공 시 처리
    return response;
  },
  (error: AxiosError) => {
    //응답 에러 처리 (예: 토큰 만료 시 로그아웃 처리)
    console.error('Response interceptor error:', error);
    if (error.response?.status === 401) {
      removeToken(); // 토큰 제거
      console.log('토큰 제거');

      // 로그아웃 처리 혹은 로그인 페이지로 리다이렉트
      window.location.href = '/login'; 
      console.log('로그인 페이지로 입장');
    }
    return Promise.reject(error);
  }
);

// API 함수들
export const api = {
  get: <T>(url: string, config = {}) => 
    instance.get<T>(url, config).catch(error => {
      console.error('GET request error:', error);
      throw error;
    }),
  post: <T>(url: string, data = {}, config = {}) => 
    instance.post<T>(url, data, config).catch(error => {
      console.error('POST request error:', error);
      throw error;
    }),
  put: <T>(url: string, data = {}, config = {}) => 
    instance.put<T>(url, data, config).catch(error => {
      console.error('PUT request error:', error);
      throw error;
    }),
  delete: <T>(url: string, config = {}) => 
    instance.delete<T>(url, config).catch(error => {
      console.error('DELETE request error:', error);
      throw error;
    }),
};

export default api;