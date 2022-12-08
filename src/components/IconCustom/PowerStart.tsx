import React from 'react';
import { CaretRightOutlined, LaptopOutlined } from '@ant-design/icons';
import './styles.css';
const PowerStart = () => {
  return (
    <div className="powerStart">
      <div className="powerStart__icon">
        <LaptopOutlined />
        <div
          className="powerStart__icon powerStart__icon__start"
          style={{ color: 'green' }}
        >
          {' '}
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  );
};

export default PowerStart;
