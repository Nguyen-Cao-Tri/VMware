/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import { WarningOutlined } from '@ant-design/icons';
import './footer.scss';
const Footer = (props: any) => {
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
  const bottomRef = useRef<any>(null);
  const { logs = [] } = useLog();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  return (
    <div className={`footer__${props.theme}`}>
      {logs.map((log, index) => {
        return (
          <div
            key={index}
            style={{
              padding: 5,
              color: props.theme === 'dark' ? 'white' : 'black',
            }}
          >
            {/* <span style={{ marginRight: 5 }}>
              {log.errorMessage != null ? <WarningOutlined /> : null}
            </span>
            <span
              style={{
                color: log.errorMessage != null ? 'red' : 'black',
              }}
            >
              [{execuTimeFormat(log.executeTime)}] {log.name} {log.action}{' '}
              {log.state} {log.errorMessage}
            </span> */}
            {log.errorMessage != null ? (
              <span style={{ color: 'red' }}>
                <WarningOutlined /> [{execuTimeFormat(log.executeTime)}]{' '}
                {log.name} {log.action} {log.state} {log.errorMessage}
              </span>
            ) : (
              <span>
                [{execuTimeFormat(log.executeTime)}] {log.name} {log.action}{' '}
                {log.state}
              </span>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Footer;
