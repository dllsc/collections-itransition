import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const post = <TBody, TResponse>(
  path: string, body: TBody,
): Promise<TResponse> => axiosInstance.post<TResponse>(path, body).then(r => r.data);

export const get = <TResponse>(
  path: string
): Promise<TResponse> => axiosInstance.get<TResponse>(path).then(r => r.data);

export const tokenKey = 'access_token';


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenKey);

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
  console.log(JSON.parse(JSON.stringify(response)));
  const responseJSON = JSON.parse(JSON.stringify(response));
  console.log(responseJSON.status);
  if (responseJSON.status >= 400 && responseJSON.status < 404) {
    // localStorage.removeItem(tokenKey);
    // window.location.href = '/login';
    // TODO: go to login page
  }

  return response;
});
