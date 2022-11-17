/* eslint-disable react/prop-types */
import React from 'react';

const Children = (props) => {
  return (
    <div>
    <div>{props.data}</div>
    <button onClick={()=>props.funTest("gasgdh")} >test</button></div>
  );
};

export default Children;