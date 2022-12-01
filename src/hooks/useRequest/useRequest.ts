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
    data?: any,
    header?: HeadersInit,
  ) => {
    setIsLoading(true);
    const baseURL = process.env.REACT_APP_API_URL ?? '';
    const sessionId = localStorage.getItem('sessionId');
    const createRequest = fetch(`${baseURL}${url}`, {
      method: method ?? 'GET',
      body: data,
      headers: {
        ...header,
        'vmware-api-session-id': sessionId ?? '',
      },
      credentials: 'omit',
    })
      .then((response: any) => {
        if (response.status >= 300) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        setError(error);
        if (!(error instanceof Error)) {
          switch (error.status) {
            case 401: {
              navigate('/login');
              break;
            }
            default: {
              throw error;
            }
          }
        } else {
          throw error;
        }
        throw error;
      })
      .finally(() => setIsLoading(false));
    return await createRequest;
  };
  return { request, isLoading, error };
}
