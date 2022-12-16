/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('VM HardWare', 'parent', null, [
    getItem('CPU', 'sub1', null, [
      getItem('Utilization', '1'),
      getItem('Shares', '2'),
      getItem('Reservation', '3'),
      getItem('Limit', '4'),
    ]),
    getItem('Memory', 'sub2', null, [
      getItem('Utilization', '5'),
      getItem('VM overhead consumed', '6'),
    ]),
    getItem('Order', 'sub4', null, [
      getItem('Controllers', '9'),
      getItem('SCSI Adapters', '10'),
      getItem('Input Devices', '11'),
    ]),
  ]),
];

const TableContent: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
      style={{
        border: '1px solid #d3d3d3',
        boxShadow: '1px 1px 4px 0 rgb(0 0 0 / 10%)',
        borderRadius: '3px',
      }}
    />
  );
};

export default TableContent;
