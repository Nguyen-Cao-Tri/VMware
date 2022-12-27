/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useContext, useEffect, useRef } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import { WarningOutlined, IssuesCloseOutlined, ClearOutlined } from '@ant-design/icons';
import './footer.scss';
import { Button, List, Menu, Tooltip } from 'antd';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
// import { useInfo } from '../../layouts/DefaultLayout/DefaultLayout';
// import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
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
  const bottomRef = useRef<any>(null);
  const { logs = [], clearLog } = useLog();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  // const inforContext: any = useContext(InformationContext);
  const { curentTheme } = useInfo();

  return (
    <div className="container_footer">
      <div className="menu_footer">
        <Menu className="menu_item" mode="horizontal" defaultSelectedKeys={['log']}>
          <Menu.Item className="log" key="log">
            LOG
          </Menu.Item>
          <div className="icon_item" onClick={clearLog}>
            <Tooltip placement="bottom" title={'Clear'}>
              <Button type="text" icon={<ClearOutlined className="icon" />} />
            </Tooltip>
          </div>
        </Menu>
      </div>
      <div className={curentTheme}>
        <div className="footer">
          {logs.map((log, index) => {
            return (
              <div key={index} style={{ padding: 5 }}>
                {log.errorMessage != null ? (
                  <span style={{ color: 'red' }}>
                    <WarningOutlined /> [{execuTimeFormat(log.executeTime)}] {log.name} {log.action} {log.state}{' '}
                    {log.errorMessage}
                  </span>
                ) : (
                  <span>
                    <IssuesCloseOutlined style={{ color: '#75c02b' }} /> [{execuTimeFormat(log.executeTime)}] {log.name}{' '}
                    {log.action} {log.state}
                  </span>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
