/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import { LayoutContent } from '../../pages/Datacenter/Datacenter';

const Content = () => {
  const inforContext: any = useContext(InformationContext);
  return (
    <div className="content" style={{ height: '100%' }}>
      {inforContext.inforSelect.key === undefined && <LayoutContent />}
      <Outlet />
    </div>
  );
};

export default Content;
