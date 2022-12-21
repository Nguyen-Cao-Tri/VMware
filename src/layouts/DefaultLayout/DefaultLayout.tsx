/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Allotment } from 'allotment';
import './layout.scss';
import 'allotment/dist/style.css';
import { ConfigProvider } from 'antd';

export const InformationContext = createContext({});

export default function DefaultLayout() {
  const [inforSelect, setInforSelect] = useState<any>({});
  const [keyExpand, setKeyExpand] = useState<string[]>([]);
  const [vmPowerState, setVmPowerState] = useState<object[]>();
  const [vm, setVm] = useState<object[]>([]);
  const [children, setChildren] = useState<object[]>([]);
  const [vmNetwork, setVmNetwork] = useState<object[]>([]);
  const [vmTools, setVmTools] = useState<object[]>([]);

  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');
  const [sidebarSize, setSidebarSize] = useState('200');
  const [logSize, setLogSize] = useState('200');
  const lightTheme = {
    colorPrimary: '#71A73B',
  };

  const darkTheme = {
    colorPrimary: '#44475a',
    colorBgBase: '#44475a',
    colorTextBase: '#fff',
  };
  const onChangeSidebar = (value: any) => {
    const [firstPane] = value;
    localStorage.setItem('sizeSidebar', firstPane);
  };
  const onChangeLog = (value: any) => {
    const [firstPane, secondPane] = value;
    localStorage.setItem('sizeLog', secondPane);
  };
  useEffect(() => {
    const size = localStorage.getItem('sizeSidebar');
    if (size != null) setSidebarSize(size);

    const log = localStorage.getItem('sizeLog');
    if (log != null) setLogSize(log);
  }, []);
  const value = {
    inforSelect,
    keyExpand,
    vmTools,
    vmNetwork,
    vm,
    vmPowerState,
    children,
  };
  return (
    <InformationContext.Provider value={value}>
      <ConfigProvider
        theme={{
          token: theme === 'dark' ? darkTheme : lightTheme,
        }}
      >
        <div className={`${theme}`}>
          <div className="header">
            <Header theme={value => setTheme(value)} />
          </div>
          <div
            style={{
              minHeight: 200,
              minWidth: 200,
              height: '93vh',
              width: '100vw',
            }}
          >
            <Allotment minSize={100} onChange={onChangeSidebar}>
              <Allotment.Pane preferredSize={sidebarSize}>
                <Sidebar
                  propTheme={theme}
                  propOnSelect={value => setInforSelect(value)}
                  propOnExpand={value => setKeyExpand(value)}
                  propVmPowerState={value => setVmPowerState(value)}
                  propChildren={value => setChildren(value)}
                  propVm={value => setVm(prev => [...prev, value])}
                  propNetwork={value => setVmNetwork(prev => [...prev, value])}
                  propTool={value => setVmTools(prev => [...prev, value])}
                />
              </Allotment.Pane>
              <Allotment.Pane>
                <Allotment vertical onChange={onChangeLog}>
                  <Allotment.Pane>
                    <Content />
                  </Allotment.Pane>
                  <Allotment.Pane preferredSize={logSize}>
                    <Footer theme={theme} />
                  </Allotment.Pane>
                </Allotment>
              </Allotment.Pane>
            </Allotment>
          </div>
        </div>
      </ConfigProvider>
    </InformationContext.Provider>
  );
}
