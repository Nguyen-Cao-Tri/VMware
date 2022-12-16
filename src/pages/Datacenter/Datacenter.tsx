/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import '../../components/Content/content.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

const Datacenter = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;
  return (
    <>
      {key ? (
        <>
          <div className="nav">
            <div className="title">
              <span>{title}</span>
            </div>
          </div>
          <div className="content_item">
            <div style={{ padding: '20px' }}>
              <h3>Datacenter name: {title}</h3>
              <h4>Expand to know more information</h4>
            </div>
          </div>
        </>
      ) : (
        <div className="bg">
          <h3 style={{ padding: '20px' }}>
            Chose something or expand to know more information
          </h3>
        </div>
      )}
    </>
  );
};

export default Datacenter;
