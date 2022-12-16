import React from 'react';
import { CaretRightOutlined, LaptopOutlined } from '@ant-design/icons';
import './powerOn.scss';
const PowerOn = () => {
  return (
    <div className="powerOn">
      <div className="powerOn__icon">
        <LaptopOutlined />
        <div
          className="powerOn__icon powerOn__icon__start"
          style={{ color: 'green' }}
        >
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  );
};

export default PowerOn;
