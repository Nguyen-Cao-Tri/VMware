import React from 'react';
import { DataNode } from '../Sidebar';
import { FolderOutlined, LaptopOutlined } from '@ant-design/icons';
import PowerStart from '../../IconCustom/PowerStart';
export const PushRequestData = (data: object[], param: string) => {
  const children: DataNode[] = [];
  console.log('data', data);

  data.forEach((itemData: any) => {
    if (param === 'vm') {
      const obj = {
        title: itemData.name,
        key: itemData[param],
        icon:
          itemData.power_state === 'POWERED_ON' ? (
            <PowerStart />
          ) : (
            <LaptopOutlined />
          ),
        isLeaf: true,
      };
      children.push(obj);
    } else {
      const obj = {
        title: itemData.name,
        key: itemData[param],
        icon: <FolderOutlined />,
      };
      children.push(obj);
    }
  });
  return children;
};
