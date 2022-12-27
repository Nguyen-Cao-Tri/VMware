/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
// import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

const Datacenter = () => {
  // const inforContext: any = useContext(InformationContext);
  const { inforSelect } = useInfo();

  console.log('inforSelect', inforSelect);
  const title = inforSelect.title;
  const key = inforSelect.key;

  return (
    <>
      {key ? (
        <>
          <div className="layout_content">
            <h3>Datacenter name: {title}</h3>
            <h4>Expand to know more information</h4>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Datacenter;
