import axios from 'axios';
import { removeCredentialItems, TOKEN_LOCAL_STORAGE_KEY } from './utils/login.utils';

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:3000/api',
});

export const post = <TBody, TResponse>(
  path: string, body: TBody,
): Promise<TResponse> => axiosInstance.post<TResponse>(path, body).then(r => r.data);

export const put = <TBody, TResponse>(
  path: string, body: TBody,
): Promise<TResponse> => axiosInstance.put<TResponse>(path, body).then(r => r.data);

export const get = <TResponse>(
  path: string,
): Promise<TResponse> => axiosInstance.get<TResponse>(path).then(r => r.data);


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);

  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

axiosInstance.interceptors.response.use(r => r, (response) => {
  const responseJSON = JSON.parse(JSON.stringify(response));

  console.log(responseJSON);

  if ([401, 403].includes(responseJSON.status)) {
    console.log(responseJSON.status);
    removeCredentialItems();
    window.location.href = '/login';
  }

  return response;
});
