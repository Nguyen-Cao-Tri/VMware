import axios from 'axios';
import { useState } from 'react';

export default function useRequest(): any {
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
        '': '',
        ...config,
      },
      withCredentials: false,
    })
      .then((data) => {
        return data.data;
      })
      .catch((e) => {
        setError(e.response.data.message);
        throw e.response.data.message;
      })
      .finally(() => setIsLoading(false));
    return await createRequest;
  };
  return { request, isLoading, error };
}
