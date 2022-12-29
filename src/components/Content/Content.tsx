import React from 'react';
import { Outlet } from 'react-router-dom';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
const Content = () => {
  const { curentTheme, inforSelect } = useInfo();
  console.log(curentTheme);

  return (
    <div className={curentTheme}>
      <div className="content">
        {inforSelect.key === undefined && (
          <div className="layout_content">
            <h3>Chose something or expand to know more information</h3>
          </div>
        )}
        <Outlet />
        <div className="circle">
          <span>VM</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
