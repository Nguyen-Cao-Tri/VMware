/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Tree } from 'antd';
import Item from './SidebarHandle/Item';
import { UpdateTreeData } from './SidebarHandle/UpdateTreeData';
import { InitTreeData } from './SidebarHandle/InitTreeData';
import useRequest from '../../hooks/useRequest/useRequest';
import { PushRequestData } from './SidebarHandle/PushRequestData';

export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
const Sidebar = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [datacenter, setDatacenter] = useState<object[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const { request } = useRequest();
  useEffect(() => {
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setDatacenter(res);
      setTreeData(InitTreeData(res));
    });
  }, []);
  const onLoadData = ({ key }: any) => {
    return new Promise<void>((resolve) => {
      console.log('key', key);
      setTimeout(() => {
        if (key.includes('datacenter')) {
          const param = 'folder';
          setKeyDatacenter(key);
          request(
            `/api/vcenter/${param}?names=vm&datacenters=${key}`,
            'GET',
          ).then((res: any) => {
            setTreeData(() =>
              UpdateTreeData(treeData, key, PushRequestData(res, param)),
            );
          });
        }
        if (key.includes('group')) {
          const param = 'folder';
          request(
            `/api/vcenter/${param}?parent_folders=${key}&datacenters=${keyDatacenter}`,
            'GET',
          ).then((res: any) => {
            setTreeData(() =>
              UpdateTreeData(treeData, key, PushRequestData(res, param)),
            );
          });
          request(
            `/api/vcenter/vm?folders=${key}&datacenters=${keyDatacenter}`,
            'GET',
          ).then((res: any) => {
            if (res.length > 0) {
              setTreeData(() =>
                UpdateTreeData(treeData, key, PushRequestData(res, 'vm')),
              );
            }
          });
        }
        resolve();
      }, 1000);
    });
  };
  return (
    <>
      <Dropdown autoFocus overlay={Item} trigger={['contextMenu']}>
        <div
          className="site-dropdown-context-menu"
          style={{
            textAlign: 'center',
            height: 200,
            lineHeight: '200px',
            width: 200,
          }}
        >
          <Tree
            checkable
            showIcon={true}
            defaultExpandParent={true}
            loadData={onLoadData}
            treeData={treeData}
            showLine={true}
            style={{
              width: '350px',
              height: '500px',
              paddingTop: '20px',
            }}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default Sidebar;
