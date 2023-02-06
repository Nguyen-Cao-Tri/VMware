import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="container_loading">
      <div className="wrap">
        <div className="item_loading">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
        <span className="text_loading">Loading</span>
      </div>
    </div>
  );
};

export default Loading;
