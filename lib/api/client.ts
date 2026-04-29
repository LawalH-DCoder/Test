import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../config';

function createApiClient(baseURL: string = BASE_URL) {
  const client: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available
      // const token = getAuthToken();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access');
      } else if (error.response?.status === 404) {
        console.error('Resource not found');
      } else if (error.response?.status >= 500) {
        console.error('Server error');
      }

      return Promise.reject(error);
    },
  );

  return {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
      client.get<T>(url, config),

    post: <T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> => client.post<T>(url, data, config),

    put: <T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> => client.put<T>(url, data, config),

    patch: <T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> => client.patch<T>(url, data, config),

    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
      client.delete<T>(url, config),
  };
}

export const apiClient = createApiClient();
export default createApiClient;
