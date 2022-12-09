/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import {
  WarningOutlined,
  IssuesCloseOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import './footer.scss';
import { Menu } from 'antd';
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
  const { logs = [], clearLog } = useLog();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  return (
    <>
      <div
        style={{
          height: 45,
          display: 'flex',
          width: '100%',
        }}
      >
        <Menu
          style={{ height: '100%', width: '75%' }}
          theme={props.theme}
          mode="horizontal"
          defaultSelectedKeys={['log']}
        >
          <Menu.Item id="log" key="log">
            LOG
          </Menu.Item>
        </Menu>
        <div className="menu">
          <div className="icon" onClick={clearLog}>
            <ClearOutlined />
          </div>
        </div>
      </div>
      <div className="footer">
        {logs.map((log, index) => {
          return (
            <div
              key={index}
              style={{
                padding: 5,
                color: props.theme === 'dark' ? 'white' : 'black',
              }}
            >
              {log.errorMessage != null ? (
                <span style={{ color: 'red' }}>
                  <WarningOutlined /> [{execuTimeFormat(log.executeTime)}]
                  {log.name} {log.action} {log.state} {log.errorMessage}
                </span>
              ) : (
                <span>
                  <IssuesCloseOutlined style={{ color: '#71A73B' }} /> [
                  {execuTimeFormat(log.executeTime)}]{log.name} {log.action}{' '}
                  {log.state}
                </span>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default Footer;
