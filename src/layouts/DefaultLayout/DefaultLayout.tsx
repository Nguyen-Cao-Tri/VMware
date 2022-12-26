/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Allotment } from 'allotment';
import './layout.scss';
import 'allotment/dist/style.css';
import { ConfigProvider, Layout, theme } from 'antd';
const HeaderAnt = Layout.Header;
const ContentAnt = Layout.Content;
const SiderAnt = Layout.Sider;
const FooterAnt = Layout.Footer;

export const InformationContext = createContext({});

export default function DefaultLayout() {
  const [inforSelect, setInforSelect] = useState<any>({});
  const [keyExpand, setKeyExpand] = useState<string[]>([]);
  const [vmPowerState, setVmPowerState] = useState<object[]>();
  const [vm, setVm] = useState<object[]>([]);
  const [children, setChildren] = useState<object[]>([]);
  const [vmNetwork, setVmNetwork] = useState<object[]>([]);
  const [vmTools, setVmTools] = useState<object[]>([]);

  const [curentTheme, setCurrentTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');
  const [sidebarSize, setSidebarSize] = useState('200');
  const [logSize, setLogSize] = useState('200');

  const handleTheme = (value: any) => {
    setCurrentTheme(value);
  };
  const onChangeSidebar = (value: any) => {
    const [firstPane] = value;
    localStorage.setItem('sizeSidebar', firstPane);
  };
  const onChangeLog = (value: any) => {
    const [firstPane, secondPane] = value;
    localStorage.setItem('sizeLog', secondPane);
  };
  const onSelect = (value: any) => {
    setInforSelect(value);
    console.log('aaa', value);
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
    curentTheme,
    handleTheme,
    onSelect,
  };
  const lightTheme = {
    colorPrimary: '#2997ce',
    // colorBgBase: '#F4F4F4',
  };
  const darkTheme = {
    colorPrimary: '#2997ce',
    colorBgBase: '#252d31',
  };
  return (
    <Layout className="layout" style={{ padding: 0 }}>
      <InformationContext.Provider value={value}>
        <ConfigProvider
          theme={{
            token: curentTheme === 'dark' ? darkTheme : lightTheme,
            algorithm: curentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <div>
            <HeaderAnt
              className="container_header"
              style={{
                background: '#2997ce',
              }}
            >
              <Header />
            </HeaderAnt>

            <Layout className="layout_item">
              <div
                style={{
                  minHeight: 200,
                  minWidth: 200,
                  height: '93vh',
                  width: '100vw',
                }}
              >
                <Allotment minSize={100} onChange={onChangeSidebar}>
                  {/* sidebar */}
                  <Allotment.Pane preferredSize={sidebarSize}>
                    <SiderAnt className="container_sidebar">
                      <Sidebar
                        // propOnSelect={value => setInforSelect(value)}
                        propOnExpand={value => setKeyExpand(value)}
                        propVmPowerState={value => setVmPowerState(value)}
                        propChildren={value => setChildren(value)}
                        propVm={value => setVm(prev => [...prev, value])}
                        propNetwork={value => setVmNetwork(prev => [...prev, value])}
                        propTool={value => setVmTools(prev => [...prev, value])}
                      />
                    </SiderAnt>
                  </Allotment.Pane>
                  <Allotment.Pane>
                    <Allotment vertical onChange={onChangeLog}>
                      {/* content */}
                      <Allotment.Pane>
                        <ContentAnt className="container_content">
                          <Content />
                        </ContentAnt>
                      </Allotment.Pane>

                      {/* footer */}
                      <Allotment.Pane preferredSize={logSize}>
                        <FooterAnt id="container_footer">
                          <Footer />
                        </FooterAnt>
                      </Allotment.Pane>
                    </Allotment>
                  </Allotment.Pane>
                </Allotment>
              </div>
            </Layout>
          </div>
        </ConfigProvider>
      </InformationContext.Provider>
    </Layout>
  );
}
