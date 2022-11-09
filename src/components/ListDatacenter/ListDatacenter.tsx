/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Tree, Dropdown, Menu } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { useNavigate } from 'react-router-dom';
import { DirectoryTreeProps } from 'antd/es/tree';
import { PoweroffOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
}
const initTreeData: DataNode[] = [
  { title: 'Datacenter 1', key: '01' },
  { title: 'Datacenter 2', key: '02' },
  { title: 'Datacenter 3', key: '03' },
];
const menu = (
  <Menu
    items={[
      {
        label: 'Rename...',
        key: '1',
      },
      {
        label: 'Refresh',
        key: '2',
      },
      {
        label: 'Power',
        key: '3',
        icon: <PoweroffOutlined />,
        children: [
          {
            label: 'Power On',
            key: '3-1',
          },
          {
            label: 'Power Off',
            key: '3-2',
          },
          {
            label: 'Suspend',
            key: '3-3',
          },
          {
            label: 'Reset',
            key: '3-4',
          },
        ],
      },
      {
        label: 'Take Snapshot',
        key: '4',
      },
    ]}
  />
);
const ListDatacenter: React.FC = () => {
  const [listDatacenter, setListDatacenter] = useState<object[]>([]);
  const [listFolder, setListFolder] = useState<DataNode[]>([]);
  const [listVM, setListVM] = useState<object[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>(initTreeData);
  const { request } = useRequest();
  const navigate = useNavigate();
  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children?: DataNode[],
  ): DataNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children != null) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  useEffect(() => {
    const getApiKey = localStorage.getItem('apiKey');
    console.log('key api', getApiKey);

    if (getApiKey === undefined || getApiKey === null) {
      navigate('/login');
    }
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setListDatacenter(res);
    });
  }, []);
  console.log('tree data', treeData);
  console.log('folder', listFolder);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    const getMock = (item: any) => {
      request(`/api/vcenter/${item}`, 'GET').then((res: any) => {
        const obj = [...res];
        obj.forEach((item: any) => {
          if (item.id.includes(keys[0])) {
            setTreeData((treeData) =>
              updateTreeData(treeData, keys[0], [
                {
                  title: item.name,
                  key: item.id,
                },
              ]),
            );
          }
        });
      });
    };
    const datacenterNode = info.selectedNodes.map((item: any) =>
      item.title.includes('Datacenter'),
    );
    const folderNode = info.selectedNodes.map((item: any) =>
      item.title.includes('Folder'),
    );
    const vmNode = info.selectedNodes.map((item: any) =>
      item.title.includes('VM'),
    );
    if (datacenterNode[0]) {
      getMock('folder');
      navigate(`/api/vcenter/datacenter?datacenter_id=${keys[0]}`);
    }
    if (folderNode[0]) {
      getMock('vm');
      navigate(
        `/api/vcenter/folder?datacenter_id=${keys[0]
          .toString()
          .slice(0, 2)}&folder_id=${keys[0]}`,
      );
    }
    if (vmNode[0]) {
      navigate(
        `/api/vcenter/vm?datacenter_id=${keys[0]
          .toString()
          .slice(0, 2)}&folder_id=${keys[0].toString().slice(0, 3)}&vm_id=${
          keys[0]
        }`,
      );
    }
    console.log('Key Select', keys);
    console.log('Info Select', info);
  };
  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div
          className="site-dropdown-context-menu"
          style={{
            textAlign: 'center',
            height: 200,
            lineHeight: '200px',
            width: 200,
          }}
        >
          <DirectoryTree
            multiple
            onSelect={onSelect}
            treeData={treeData}
            style={{ width: '200px' }}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default ListDatacenter;
