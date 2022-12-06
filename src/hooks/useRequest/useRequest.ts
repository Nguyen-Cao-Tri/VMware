/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const request = async (
    url: string,
    method?: string,
    data?: Record<string, unknown> | FormData,
    header?: HeadersInit,
  ) => {
    setIsLoading(true);
    const baseURL = process.env.REACT_APP_API_URL ?? '';
    const sessionId = localStorage.getItem('sessionId');
    const createRequest = fetch(`${baseURL}${url}`, {
      method: method ?? 'GET',
      body: JSON.stringify(data),
      headers: {
        'vmware-api-session-id': sessionId ?? '',
        'content-type': 'application/json',
        ...header,
      },
      credentials: 'omit',
    })
      .then(async (response) => {
        const isJson =
          response.headers.get('content-type')?.includes('application/json') ??
          false;
        const data = isJson ? await response.json() : await response.text();
        if (response.ok) {
          return data;
        }
        if (response.status === 401) {
          navigate('/login');
          throw data;
        } else throw data;
      })
      .catch((error) => {
        setError(error);
        throw error;
      })
      .finally(() => setIsLoading(false));
    return await createRequest;
  };
  return { request, isLoading, error };
}
