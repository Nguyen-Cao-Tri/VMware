import axios from 'axios';
import { useState } from 'react';

export default function useRequest(): any {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const request = async (url: string, method?: string, data?: object) => {
    setIsLoading(true);
    const createRequest = axios({
      method,
      url,
      data,
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
