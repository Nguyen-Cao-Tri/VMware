/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Switch } from 'antd';
import React, { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import './styles.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.setItem('sessionId', '');
    navigate('/login');
  };
  const [theme, setTheme] = useState<boolean>(true);
  return (
    <div className="container">
      <h1>VMware Manager</h1>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          marginRight: 20,
        }}
      >
        <Switch
          style={{ marginRight: 20 }}
          // checked={theme === 'dark'}
          onChange={() => setTheme(!theme)}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Button
          style={{ borderRadius: 15, display: 'flex' }}
          onClick={handleOnClick}
        >
          <LoginOutlined style={{ marginTop: 5, marginRight: 5 }} />
          <div>Log out</div>
        </Button>
      </div>
    </div>
  );
};

export default Header;
