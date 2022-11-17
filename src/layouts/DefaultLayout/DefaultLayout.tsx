/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './styles.css';
// import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
export default function DefaultLayout() {
  const [infor, setInfor] = useState();
  const [vm, setVm] = useState();
  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="top__content">
        <Sidebar
          funSelect={(info: any) => {
            setInfor(info);
          }}
          funGetVM={(vm: any) => {
            setVm(vm);
          }}
        />
        <div className="top__content__content">
          <Content infors={infor} vm={vm} />
        </div>
      </div>
      <div className="bottom__content">
        <Footer />
      </div>
      <Outlet />
    </div>
  );
}
