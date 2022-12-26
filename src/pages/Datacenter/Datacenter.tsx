/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import './datacenter.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import bgLight from '../../pages/Datacenter/imgContent/bgLight.png';
import bgDark from '../../pages/Datacenter/imgContent/bgDark.png';

const Datacenter = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;
  const curentTheme = inforContext?.curentTheme;

  return (
    <>
      {key ? (
        <>
          <div className="layout_content">
            <div className="bg">
              <h3>Datacenter name: {title}</h3>
              <h4>Expand to know more information</h4>
              {curentTheme === 'dark' ? (
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
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Datacenter;
