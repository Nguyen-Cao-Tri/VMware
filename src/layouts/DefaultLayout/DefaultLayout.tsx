import React from 'react';
import { Outlet } from 'react-router-dom';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './styles.css';
export default function DefaultLayout() {
  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="top__content">
        <Sidebar />
        <Content />
      </div>
      <div className="bottom__content">
        <Footer />
      </div>

      <Outlet />
    </div>
  );
}
