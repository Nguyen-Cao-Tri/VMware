// /* eslint-disable @typescript-eslint/no-unused-vars */
// // import axios, { AxiosBasicCredentials, RawAxiosRequestHeaders } from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function useRequest() {
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState<string>('');
// const navigate = useNavigate();
// const request = async (
// url: string,
// method?: string,
// data?: any,
// header?: HeadersInit,
// // { headers?: RawAxiosRequestHeaders; auth?: AxiosBasicCredentials }
// ) => {
// setIsLoading(true);
// const baseURL = process.env.REACT_APP_API_URL ?? '';
// const sessionId = localStorage.getItem('sessionId');
// const createRequest = fetch(`${baseURL}${url}`, {
// method: method ?? 'get',
// body: data,
// // ...config,
// // headers: {
// // ...config?.headers,
// // ...(sessionId != null && { 'vmware-api-session-id': sessionId }),
// // },
// headers: {
// 'vmware-api-session-id': sessionId ?? '',
// ...header,
// },
// credentials: 'omit',
// })
// .then((response) => response.json())
// .then((data) => {
// console.log(data);
// return data;
// })
// .catch((e) => {
// setError(e);
// if (e.response.status === 401) {
// navigate('/login');
// }
// throw e;
// })
// .finally(() => setIsLoading(false));
// return await createRequest;
// };
// return { request, isLoading, error };
// }

import axios from 'axios';
import { useState } from 'react';

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const request = async (
    url: string,
    method?: string,
    data?: object,
    config?: object,
  ) => {
    setIsLoading(true);
    const baseURL = process.env.REACT_APP_API_URL ?? '';
    const createRequest = axios({
      method,
      url: `${baseURL}${url}`,
      data,
      headers: {
        'vmware-api-session-id': '8a7e9491ee5cef2858dd56ce163e4e6a',
        ...config,
      },
      withCredentials: false,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e: any) => {
        setError(e.response.data.message);
        throw e.response.data.message;
      })
      .finally(() => setIsLoading(false));
    return await createRequest;
  };
  return { request, isLoading, error };
}
