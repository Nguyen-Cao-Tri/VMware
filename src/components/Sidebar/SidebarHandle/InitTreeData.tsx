import React from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import { DataNode } from 'hooks/infoProvider/TypeInfo';

export const InitTreeData = (data: DataNode[]) => {
  const newData: DataNode[] = [];
  data?.forEach((item: any) => {
    const obj = {
      title: item.name,
      key: item.datacenter,
      children: [],
      icon: <DatabaseOutlined />,
      isLeaf: false,
    };
    newData.push(obj);
  });
  return newData;
};
