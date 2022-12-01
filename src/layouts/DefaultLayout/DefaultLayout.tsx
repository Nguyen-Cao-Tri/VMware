/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './styles.css';
import { Allotment } from 'allotment';
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

  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div
        style={{
          minHeight: 200,
          minWidth: 200,
          height: '100vh',
          width: '100vw',
          border: '1px solid #ccc',
        }}
      >
        <Allotment minSize={100}>
          <Allotment.Pane minSize={200} maxSize={700}>
            <Sidebar
              propOnSelect={(value) => setInforSelect(value)}
              propOnExpand={(value) => setKeyExpand(value)}
              propVmPowerState={(value) => setVmPowerState(value)}
              propChildren={(value) => setChildren(value)}
            />
          </Allotment.Pane>
          <Allotment vertical>
            <Content
              inforSelect={inforSelect}
              vmData={vmPowerState}
              children={children}
              keyExpand={keyExpand}
              vmPowerState={vmPowerState}
            />
            <Footer />
          </Allotment>
        </Allotment>
      </div>
    </div>
  );
}
