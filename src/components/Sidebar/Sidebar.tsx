/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import 'antd/dist/antd.min.css';
import { Tree, Dropdown, Menu, Modal, TreeDataNode } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { useNavigate } from 'react-router-dom';
import { DirectoryTreeProps, EventDataNode } from 'antd/es/tree';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
const initTreeData: DataNode[] = [
  { title: 'Datacenter 1', key: '01' },
  { title: 'Datacenter 2', key: '02' },
  { title: 'Datacenter 3', key: '03' },
];
const Sidebar = (props: {
  funSelect: (
    arg0: {
      event: 'select';
      selected: boolean;
      node: EventDataNode<TreeDataNode>;
      selectedNodes: TreeDataNode[];
      nativeEvent: MouseEvent;
    },
    arg1: object[],
  ) => void;
}) => {
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
            break;
          case 'login':
            handleLogin();
            break;
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
  const [renameInput, setRenameInput] = useState<string>('');
  const [expand, setExpand] = useState<string[]>([]);
  const [vm, setVm] = useState<any>();
  const [keySelect, setKeySelect] = useState<string>('');
  const { request } = useRequest();
  const navigate = useNavigate();
  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[],
  ): DataNode[] =>
    list.map((node: any) => {
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
    console.log('info', info);
    setInfor(info);
  };
  const onChange = (e: any) => {
    setRename(e.target.value);
    setRenameInput(e.target.value);
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
      return list;
    };
    setTreeData([...findRename(treeData)]);
    setRename('');
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRename = () => {
    setIsModalOpen(true);
    setRenameInput(infor.node.title);
  };
  const handleRefresh = () => {
    setTreeData(initTreeData);
    setExpand([]);
    navigate('/');
  };
  const handlePowerOn = () => {
    setVm(() => {
      vm.forEach((item: { id: string; power_state: string }) => {
        if (item.id === keySelect) {
          item.power_state = 'POWER_ON';
        }
      });
      return vm;
    });
  };
  const handlePowerOff = () => {
    setAction('Off');
  };
  const handlePowerSuspend = () => {
    setAction('Suspend');
  };
  const handlePowerReset = () => {
    setAction('Reset');
  };
  const handleLogin = () => {
    console.log('login');
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
  const getMock = async (item: any, keys: any, info: any) => {
    try {
      const response = await request(`/api/vcenter/${item}`, 'GET');
      setVm(response);
      response.forEach((item: any) => {
        if (item.id.includes(keys[0])) {
          props.funSelect(info, item);
          setTreeData(
            updateTreeData(treeData, keys[0], [
              {
                title: item.name,
                key: item.id,
              },
            ]),
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    const keysLength = keys[0].toString().length;
    console.log('key select', keys);
    console.log('info select', info);
    setKeySelect(keys[0].toString());
    if (keysLength === 2) {
      getMock('folder', keys, info);
      // navigate(`/api/vcenter/datacenter?datacenter_id=${keys[0]}`);
    }
    if (keysLength === 3) {
      getMock('vm', keys, info);
      // navigate(
      //   `/api/vcenter/folder?datacenter_id=${keys[0]
      //     .toString()
      //     .slice(0, 2)}&folder_id=${keys[0]}`,
      // );
    }
    if (keysLength === 4) {
      props.funSelect(info, vm);
      // navigate(`/api/vcenter/datacenter?datacenter_id=${keys[0]}`);
    }
  };
  return (
    <>
      <Dropdown autoFocus overlay={items} trigger={['contextMenu']}>
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
            defaultExpandedKeys={expand}
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
          <Modal
            title="Rename"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="input__name">
              <span>Enter the new name</span>
              <input
                value={renameInput}
                style={{
                  marginLeft: '10px',
                  borderRadius: '10px',
                  width: '200px',
                  borderStyle: 'ridge',
                  paddingLeft: '8px',
                }}
                type="text"
                onChange={onChange}
              />
            </div>
          </Modal>
        </div>
      </Dropdown>
    </>
  );
};

export default Sidebar;
