import React, { useEffect, useRef } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';

const Footer = () => {
  const execuTimeFormat = (time: number) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dates = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${dates} ${hours}:${minutes}:${seconds}`;
  };
  console.log(execuTimeFormat(Date.now()));
  const bottomRef = useRef<any>(null);
  const { logs = [] } = useLog();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  return (
    <div className="footer">
      {' '}
      {logs.map((log, index) => (
        <div key={index}>
          {execuTimeFormat(log.executeTime)} {log.title} {log.action}{' '}
          {log.state} {log.errorMessage}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Footer;
