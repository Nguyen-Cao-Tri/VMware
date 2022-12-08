/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, MenuTheme, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import './header.scss';
import { useNavigate } from 'react-router-dom';
interface PropsHeader {
  theme: (item: string) => void;
}
const Header = (props: PropsHeader) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.setItem('sessionId', '');
    navigate('/login');
  };
  const [theme, setTheme] = useState<any>(
    localStorage.getItem('theme') ?? 'dark',
  );
  useEffect(() => {
    const chekedTheme = localStorage.getItem('theme');
    if (!chekedTheme) {
      localStorage.setItem('theme', 'dark');
    }
    props.theme(theme);
  }, []);
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
    localStorage.setItem('theme', value ? 'dark' : 'light');
    props.theme(value ? 'dark' : 'light');
  };
  return (
    <div className={`container__${theme}`}>
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
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Button
          style={{ borderRadius: 15, display: 'flex', marginLeft: 10 }}
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
