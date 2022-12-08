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
  ERROR = 'Error: ',
}

export const Action = {
  GET_LIST_DATACENTER: 'Get list datacenter',
  GET_LIST_FOLDER: 'Get list folder',
  GET_LIST_VM: 'Get list vm',
  CLONE_VM: 'Clone VM',
  COPY_FILE: 'Copy file',
  GET_FILE: 'Get file',
  RUN_PROCCESS: 'Run process',
  RENAME: 'Rename',
  REFRESH: 'Refresh',
  SET_USER_LOGIN: 'Set user login',
  PUT_COPY_FILE: 'Put copy file',
  OPEN_FILE_NEWTAB: 'Open file on new tab',
};

export interface IData {
  executeTime: number;
  name?: string;
  action?: string;
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
