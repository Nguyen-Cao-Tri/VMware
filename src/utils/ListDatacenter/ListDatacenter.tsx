/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Tree, Dropdown, Menu, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { useNavigate } from 'react-router-dom';
import { DirectoryTreeProps } from 'antd/es/tree';
import { PoweroffOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { info } from 'console';

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
const ListDatacenter: React.FC = () => {
  const items = (
    <Menu
      onClick={(key) => {
        console.log('key', key);

        switch (key.key) {
          case 'rename':
            handleRename();
            break;
          case 'refresh':
            handleRefresh();
            break;
          case 'powerOn':
            handlePowerOn();
            break;
          case 'powerOff':
            handlePowerOff();
            break;
          case 'powerSuspend':
            handlePowerSuspend();
            break;
          case 'powerReset':
            handlePowerReset();
            break;
          case 'snapshot':
            handleSnapshot();
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
          label: 'Take Snapshot',
          key: 'snapshot',
        },
      ]}
    />
  );
  const [listDatacenter, setListDatacenter] = useState<object[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>(initTreeData);
  const [infor, setInfor] = useState<any>();
  const [action, setAction] = useState<string>('off');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rename, setRename] = useState<string>('');
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
  const onRightClick: DirectoryTreeProps['onRightClick'] = (info) => {
    setInfor(info);
  };
  const onChange = (e: any) => {
    setRename(e.target.value);
  };
  const handleOk = () => {
    const findRename = (list: DataNode[]) => {
      list.forEach((item: any) => {
        if (item.key === infor.node.key) {
          item.title = rename;
          console.log('rename asd', item.title);
        }
        if (item.children) {
          findRename(item.children);
        }
      });
      console.log('list', list);
      setTreeData(list);
      setIsModalOpen(false);
    };
    findRename(treeData);
    console.log('treedata', treeData);
    console.log('infor', infor.node.key);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRename = () => {
    setIsModalOpen(true);
  };
  const handleRefresh = () => {
    console.log('refresh');
  };
  const handlePowerOn = () => {
    console.log('power on');
  };
  const handlePowerOff = () => {
    console.log('power off');
  };
  const handlePowerSuspend = () => {
    console.log('power suspend');
  };
  const handlePowerReset = () => {
    console.log('power reset');
  };
  const handleSnapshot = () => {
    console.log('snapshot');
  };

  useEffect(() => {
    const getApiKey = localStorage.getItem('apiKey');
    if (getApiKey === undefined || getApiKey === null) {
      navigate('/login');
    }
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setListDatacenter(res);
    });
  }, []);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('key select', keys);
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
    const keysLength = keys[0].toString().length;
    if (keysLength === 2) {
      getMock('folder');
      navigate(`/api/vcenter/datacenter?datacenter_id=${keys[0]}`);
    }
    if (keysLength === 3) {
      getMock('vm');
      navigate(
        `/api/vcenter/folder?datacenter_id=${keys[0]
          .toString()
          .slice(0, 2)}&folder_id=${keys[0]}`,
      );
    }
    if (keysLength === 4) {
      request(`/api/vcenter/vm/${keys[0]}/power?action=${action}`, 'POST');
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
      <Dropdown overlay={items} trigger={['contextMenu']}>
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
            onRightClick={onRightClick}
            onSelect={onSelect}
            treeData={treeData}
            style={{
              width: '200px',
              height: '500px',
              borderRightStyle: 'outset',
              paddingTop: '20px',
              borderBottomStyle: 'outset',
            }}
          />
        </div>
      </Dropdown>
      <Modal
        title="Rename"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="input__name">
          <span>Enter the new name</span>
          <input type="text" onChange={onChange} />
        </div>
      </Modal>
    </>
  );
};

export default ListDatacenter;
