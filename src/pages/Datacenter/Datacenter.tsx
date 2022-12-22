/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import './datacenter.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import background from './imgContent/background.png';
import bg from './imgContent/bg.png';

const Datacenter = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;
  const theme = inforContext?.theme;

  return (
    <>
      {key ? (
        <>
          <div className="text_item">
            <div className="text">
              <h3>Datacenter name: {title}</h3>
              <h4>Expand to know more information</h4>
            </div>
            <div className="bg">
              {theme === 'dark' ? <img src={bg} alt="bgDark" /> : <img src={background} alt="bgLight" />}
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
