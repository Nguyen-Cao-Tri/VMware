import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

const Content = () => {
  const inforContext: any = useContext(InformationContext);
  return (
    <div className="content" style={{ height: '100%' }}>
      {inforContext.inforSelect.key === undefined && (
        <div className="bg">
          <h3 style={{ padding: '20px' }}>
            Chose something or expand to know more information
          </h3>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Content;
