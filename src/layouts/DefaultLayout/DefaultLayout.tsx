import React, { useEffect, useState } from 'react';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
import { ConfigProvider, Layout, theme } from 'antd';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import './layout.scss';

const HeaderAnt = Layout.Header;
const ContentAnt = Layout.Content;
const SiderAnt = Layout.Sider;
const FooterAnt = Layout.Footer;

export default function DefaultLayout() {
  const { curentTheme } = useInfo();
  const [sidebarSize, setSidebarSize] = useState('200');
  const [logSize, setLogSize] = useState('200');

  const onChangeSidebar = (value: any) => {
    const [firstPane] = value;
    localStorage.setItem('sizeSidebar', firstPane);
  };
  const onChangeLog = (value: any) => {
    const [, secondPane] = value;
    localStorage.setItem('sizeLog', secondPane);
  };
  useEffect(() => {
    const size = localStorage.getItem('sizeSidebar');
    if (size != null) setSidebarSize(size);

    const log = localStorage.getItem('sizeLog');
    if (log != null) setLogSize(log);
  }, []);
  const lightTheme = {
    colorPrimary: '#2997ce',
    colorText: '#666666',
    colorBgBase: '#f6f6f6',
  };
  const darkTheme = {
    colorPrimary: '#2997ce',
    colorBgBase: '#252d31',
  };
  return (
    <Layout className="layout" style={{ padding: 0 }}>
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
                    <Sidebar />
                  </SiderAnt>
                </Allotment.Pane>
                <Allotment.Pane>
                  <Allotment vertical onChange={onChangeLog}>
                    \{/* content */}
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
    </Layout>
  );
}
