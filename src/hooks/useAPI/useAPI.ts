/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

interface IUseAPI<T> {
  request: () => Promise<void>;
  data: T | [];
  isLoading: boolean;
  error: string;
}

export const useAPI = <T>(func: () => Promise<T>): IUseAPI<T> => {
  const [data, setData] = useState<T | []>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = () => {
    setIsLoading(true);
    return func()
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  };
  return { request, data, isLoading, error };
};
