import React from 'react';
import Children from './Children';

const Parent = () => {
  return (
    <Children data="abc" funTest={(value)=>console.log("value",value)} />
  );
};

export default Parent;