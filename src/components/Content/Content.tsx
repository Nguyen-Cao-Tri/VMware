/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import bgLight from '../../pages/Datacenter/imgContent/bgLight.png';
import bgDark from '../../pages/Datacenter/imgContent/bgDark.png';
const Content = () => {
  const inforContext: any = useContext(InformationContext);
  return (
    // <div className={inforContext.curentTheme}>
    <div className="content">
      {inforContext.inforSelect.key === undefined && (
        <div className="layout_content">
          <div className="bg">
            <h3>Chose something or expand to know more information</h3>
            {inforContext.curentTheme === 'dark' ? (
              <div className="bgDark">
                <img src={bgDark} alt="" />
              </div>
            ) : (
              <div className="bgLight">
                <img src={bgLight} alt="" />
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
    // </div>
  );
};

export default Content;
