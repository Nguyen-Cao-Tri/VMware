/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Switch } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
// import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
// interface PropsHeader {
//   theme: (item: string) => void;
// }
const Header = () => {
  // const inforContext: any = useContext(InformationContext);
  const { handleTheme } = useInfo();

  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.setItem('sessionId', '');
    navigate('/login');
  };
  const [theme, setTheme] = useState<any>(localStorage.getItem('theme') ?? 'dark');
  useEffect(() => {
    const chekedTheme = localStorage.getItem('theme');
    if (!chekedTheme) {
      localStorage.setItem('theme', 'dark');
    }
    if (handleTheme) handleTheme(theme);
  }, []);
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
    localStorage.setItem('theme', value ? 'dark' : 'light');
    if (handleTheme) handleTheme(value ? 'dark' : 'light');
  };
  return (
    <div className="container">
      <div className="header">
        <div className="header_left">VMware Manager</div>
        <div className="header_right">
          <Switch checked={theme === 'dark'} onChange={changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
          <Button style={{ borderRadius: 15, display: 'flex', marginLeft: 10 }} onClick={handleOnClick}>
            <LoginOutlined style={{ marginTop: 5, marginRight: 5 }} />
            <div>Log out</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
