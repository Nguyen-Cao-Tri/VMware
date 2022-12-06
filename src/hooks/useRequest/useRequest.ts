/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLog, VMLogState } from '../logProvider/LogProvider';

export default function useVcenter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { vmLog } = useLog();

  const request = async (
    url: string,
    method?: string,
    data?: Record<string, unknown> | FormData,
    header?: HeadersInit,
    isFullUrl = false,
    metadata?: {
      action?: string;
      object?: string;
      indirectObject?: string;
    },
  ) => {
    setIsLoading(true);
    const baseURL = process.env.REACT_APP_API_URL ?? '';
    // lay session
    const sessionId = localStorage.getItem('sessionId');
    // check url
    const requestUrl = isFullUrl ? url : `${baseURL}${url}`;

    // log action begin
    if (vmLog !== undefined) {
      vmLog({
        executeTime: Date.now(),
        name: metadata?.object,
        action: metadata?.action,
        state: VMLogState.BEGIN,
      });
    }

    return await fetch(requestUrl, {
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
          if (vmLog !== undefined) {
            vmLog({
              executeTime: Date.now(),
              name: metadata?.object,
              action: metadata?.action,
              state: VMLogState.SUCCESS,
            });
          }
          return data;
        }
        if (response.status === 401) {
          localStorage.removeItem('sessionId');
          navigate('/login');
          throw data;
        } else throw data;
      })
      .catch((error) => {
        console.log(error);

        setError(error);

        if (vmLog !== undefined) {
          vmLog({
            executeTime: Date.now(),
            name: metadata?.object,
            action: metadata?.action,
            state: VMLogState.ERROR,
            errorMessage: error.messages[0].default_message,
          });
        }
        throw error;
      })
      .finally(() => setIsLoading(false));
  };
  return { request, isLoading, error };
}
