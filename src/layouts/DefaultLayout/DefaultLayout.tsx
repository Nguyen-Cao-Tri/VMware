/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Allotment } from 'allotment';
import './layout.scss';
import 'allotment/dist/style.css';
import { ConfigProvider, Layout, theme as themeAnt } from 'antd';
const HeaderAnt = Layout.Header;
const ContentAnt = Layout.Content;
const SiderAnt = Layout.Sider;
const FooterAnt = Layout.Footer;
const { useToken } = themeAnt;

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

  const handleTheme = (value: any) => {
    setTheme(value);
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
    theme,
    handleTheme,
    onSelect,
  };
  const lightTheme = {
    colorPrimary: '#10b7a4',
    // colorPrimaryBg: '#fafafa',
    // colorBgBase: '#fafafa',
    // colorTextBase: '#565656',
  };

  const darkTheme = {
    colorPrimary: '#10b7a4',
    colorBgBase: '#44475a',
    // colorTextBase: '#fafafa',
  };
  // const { darkAlgorithm, compactAlgorithm } = themeAnt;
  const { token } = useToken();
  // const { defaultAlgorithm, defaultSeed } = themeAnt;
  // console.log('gg', defaultAlgorithm);

  // const mapToken = defaultAlgorithm(defaultSeed);

  return (
    <Layout>
      <InformationContext.Provider value={value}>
        <ConfigProvider
          theme={{
            token: theme === 'dark' ? darkTheme : lightTheme,
            // token: mapToken,
            // token: { colorPrimary: '#62a51f' },
            algorithm: theme === 'dark' ? themeAnt.darkAlgorithm : themeAnt.defaultAlgorithm,
            // algorithm: [darkAlgorithm, compactAlgorithm],
          }}
        >
          <div>
            <HeaderAnt className="container_header">
              <Header />
            </HeaderAnt>
            <Layout>
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
