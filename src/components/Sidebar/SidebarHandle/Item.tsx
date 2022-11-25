import React from 'react';
import { Menu } from 'antd';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';
import HandleRename from './HandleRename';
const Item = (
  <Menu
    onClick={(key) => {
      switch (key.key) {
        case 'rename':
          HandleRename();
          break;
        case 'refresh':
          break;
        case 'powerOn':
          break;
        case 'powerOff':
          break;
        case 'powerSuspend':
          break;
        case 'powerReset':
          break;
        case 'login':
          break;
        case 'clone':
          break;
        case 'getfile':
          break;
        case 'copyfile':
      }
    }}
    items={[
      {
        label: 'Rename...',
        key: 'rename',
      },
      {
        label: 'Refresh',
        key: 'refresh',
        icon: <ReloadOutlined />,
      },
      {
        label: 'Power',
        key: 'power',
        icon: <PoweroffOutlined />,
        children: [
          {
            label: 'Power On',
            key: 'powerOn',
          },
          {
            label: 'Power Off',
            key: 'powerOff',
          },
          {
            label: 'Suspend',
            key: 'powerSuspend',
          },
          {
            label: 'Reset',
            key: 'powerReset',
          },
        ],
      },
      {
        label: 'Set user login',
        key: 'login',
      },
      {
        label: 'Get file from guest',
        key: 'getfile',
      },
      {
        label: 'Copy file to guest',
        key: 'copyfile',
      },
      {
        label: 'Clone',
        key: 'clone',
      },
    ]}
  />
);
export default Item;
