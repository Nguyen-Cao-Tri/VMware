/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Allotment } from 'allotment';
import './layout.scss';
import 'allotment/dist/style.css';
interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
export default function DefaultLayout() {
  const [inforSelect, setInforSelect] = useState({});
  const [keyExpand, setKeyExpand] = useState<string[]>([]);
  const [vmPowerState, setVmPowerState] = useState<object[]>();
  const [children, setChildren] = useState<object[]>([]);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') ?? 'dark',
  );
  const [sidebarSize, setSidebarSize] = useState('200');
  const [logSize, setLogSize] = useState('200');
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
  return (
    <div className={`${theme}`}>
      <div className="header">
        <Header theme={(value) => setTheme(value)} />
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
              propOnSelect={(value) => setInforSelect(value)}
              propOnExpand={(value) => setKeyExpand(value)}
              propVmPowerState={(value) => setVmPowerState(value)}
              propChildren={(value) => setChildren(value)}
            />
          </Allotment.Pane>
          <Allotment.Pane>
            <Allotment vertical onChange={onChangeLog}>
              <Allotment.Pane>
                <Content
                  inforSelect={inforSelect}
                  vmData={vmPowerState}
                  children={children}
                  keyExpand={keyExpand}
                  vmPowerState={vmPowerState}
                />
              </Allotment.Pane>
              <Allotment.Pane preferredSize={logSize}>
                <Footer theme={theme} />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}
