/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import background from '../../pages/Datacenter/imgContent/background.png';
import bg from '../../pages/Datacenter/imgContent/bg.png';
const Content = () => {
  const inforContext: any = useContext(InformationContext);
  return (
    <div className="content" style={{ height: '100%' }}>
      {inforContext.inforSelect.key === undefined && (
        <div className="layout_content">
          <h3>Chose something or expand to know more information</h3>
          <div className="bg">
            {inforContext.theme === 'dark' ? <img src={bg} alt="bgDark" /> : <img src={background} alt="bgLight" />}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Content;
