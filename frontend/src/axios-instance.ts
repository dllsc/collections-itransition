import axios from 'axios';
import { removeCredentialItems, TOKEN_LOCAL_STORAGE_KEY } from './utils/login.utils';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const post = <TBody, TResponse>(
  path: string, body: TBody,
): Promise<TResponse> => axiosInstance.post<TResponse>(path, body).then(r => r.data);

export const get = <TResponse>(
  path: string
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
    // TODO: go to login page
  }

  return response;
});
