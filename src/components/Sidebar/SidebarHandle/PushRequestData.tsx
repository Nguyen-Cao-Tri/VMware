import React from 'react';
import { DataNode } from '../Sidebar';
import { FolderOutlined, LaptopOutlined } from '@ant-design/icons';
export const PushRequestData = (data: object[], param: string) => {
  const children: DataNode[] = [];
  data.forEach((itemData: any) => {
    const obj = {
      title: itemData.name,
      key: itemData[param],
      icon: param === 'vm' ? <LaptopOutlined /> : <FolderOutlined />,
      isLeaf: param === 'vm',
    };
    children.push(obj);
  });
  return children;
};
