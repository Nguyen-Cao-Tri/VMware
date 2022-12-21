/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import './datacenter.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

export const LayoutContent = () => {
  return (
    <div className="layout_content">
      <h3>Chose something or expand to know more information</h3>
      <div className="bg"></div>
    </div>
  );
};
const Datacenter = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;

  return (
    <>
      {key ? (
        <>
          <div className="text_item">
            <div className="text">
              <h3>Datacenter name: {title}</h3>
              <h4>Expand to know more information</h4>
            </div>
            <div className="bg"></div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Datacenter;
