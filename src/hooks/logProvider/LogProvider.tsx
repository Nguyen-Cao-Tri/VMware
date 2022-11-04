import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';

export type Handler = (data: any) => void;

interface ILogContext {
  handler: Handler;
  log?: Handler;
}

const LogContext = createContext<ILogContext>({
  handler: () => {},
});

export default function LogProvider(props: PropsWithChildren<ILogContext>) {
  const handler = useMemo(() => {
    const listener = (e: any) => {
      console.log('call', props.handler);
      props.handler(e);
    };
    return listener;
  }, [props.handler]);

  const log = (data: any) => {
    handler(data);
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
  };

  return (
    <LogContext.Provider value={value}>{props.children}</LogContext.Provider>
  );
}
export const useLog = () => useContext(LogContext);
