/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, MenuTheme, Space, Switch, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoginOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import { MdDarkMode, MdLightMode, MdOutlineLogout } from 'react-icons/md';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
interface PropsHeader {
  theme: (item: string) => void;
}
const Header = () => {
  const { handleTheme, curentTheme } = useInfo();
  const navigate = useNavigate();
  useEffect(() => {
    const chekedTheme = localStorage.getItem('theme');
    if (!chekedTheme) {
      localStorage.setItem('theme', 'dark');
    }
    if (handleTheme !== undefined && curentTheme !== undefined) handleTheme(curentTheme);
  }, []);
  const items: MenuProps['items'] = [
    {
      label: 'Switch Theme',
      key: 'switch',
      icon: curentTheme === 'light' ? <MdDarkMode /> : <MdLightMode />,
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: <MdOutlineLogout />,
    },
  ];
  const handleOnClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case 'switch':
        if (handleTheme !== undefined && curentTheme !== undefined)
          handleTheme(curentTheme === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', curentTheme === 'dark' ? 'light' : 'dark');
        break;
      case 'logout':
        localStorage.setItem('sessionId', '');
        navigate('/login');
        break;
    }
  };

  const menuProps = {
    items,
    onClick: handleOnClick,
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header_left">VMware Manager</div>
        <div className="header_right">
          <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
            <Tooltip title="Click on left button">
              <span> Trainee1</span>
            </Tooltip>
          </Dropdown.Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
