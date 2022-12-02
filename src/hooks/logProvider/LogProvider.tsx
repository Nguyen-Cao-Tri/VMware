import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import { IData, ILogContext } from '../types/types';
export enum VMLogState {
  BEGIN = 'Begin!',
  SUCCESS = 'Success!',
  ERROR = 'Error:',
}
export interface IData {
  executeTime: number;
  title: string;
  action: string;
  state: VMLogState;
  errorMessage?: string;
}
export type Handler = (data: any) => void;

export interface ILogContext {
  handler: Handler;
  log?: (data: any) => void;
  vmLog?: (data: IData) => void;
  logs?: IData[];
}

const LogContext = createContext<ILogContext>({
  handler: () => {},
  vmLog: () => {},
  logs: [],
});

export default function LogProvider(props: PropsWithChildren<ILogContext>) {
  const [logs, setLogs] = useState<IData[]>([]);

  const handler = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const listener = (e: any) => {
      console.log('call', props.handler);
      props.handler(e);
    };
    return listener;
  }, [props.handler]);

  const log = (data: any) => {
    handler(data);
  };
  const vmLog = (data: IData): void => {
    setLogs((prev) => [...prev, data]);
  };

  useEffect(() => {
    window.addEventListener('error', handler);
    return () => {
      window.removeEventListener('error', handler);
    };
  }, [handler]);

  const value: ILogContext = {
    handler: props.handler,
    log,
    vmLog,
    logs,
  };

  return (
    <LogContext.Provider value={value}>{props.children}</LogContext.Provider>
  );
}
export const useLog = (): ILogContext => useContext(LogContext);
