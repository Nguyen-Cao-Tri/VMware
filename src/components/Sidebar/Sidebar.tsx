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
import { Tree, Dropdown, Menu, Modal, TreeDataNode, Input } from 'antd';
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
const Sidebar = (props: {
  funSelect: (arg0: {
    event: 'select';
    selected: boolean;
    node: EventDataNode<TreeDataNode>;
    selectedNodes: TreeDataNode[];
    nativeEvent: MouseEvent;
  }) => void;
  funGetVM: (arg0: any) => void;
}) => {
  // const [listDatacenter, setListDatacenter] = useState<object[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [infor, setInfor] = useState<any>();
  const [isModalOpenRename, setIsModalOpenRename] = useState(false);
  const [rename, setRename] = useState<string>('');
  const [renameInput, setRenameInput] = useState<string>('');
  const [vm, setVm] = useState<any>();
  const [keySelect, setKeySelect] = useState<string>('');
  const [initData, setInitData] = useState<DataNode[]>([]);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { request } = useRequest();
  const navigate = useNavigate();
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
          case 'clone':
            handleClone();
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
          label: 'Clone',
          key: 'clone',
        },
        {
          label: 'Take Snapshot',
          key: 'snapshot',
        },
      ]}
    />
  );
  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[],
  ): DataNode[] =>
    list.map((node: any) => {
      if (node.key === key) {
        return {
          ...node,
          children: [...children],
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
  const initTreeData = (data: DataNode[]) => {
    const newData: DataNode[] = [];
    data?.forEach((item: any) => {
      const obj = {
        title: item.name,
        key: item.id,
      };
      newData.push(obj);
    });
    setTreeData(newData);
  };
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    const keysLength = keys[0].toString().length;
    setKeySelect(keys[0].toString());
    if (keysLength === 2) {
      getMock('folder', keys, info);
    }
    if (keysLength === 3) {
      getMock('vm', keys, info);
    }
    if (keysLength === 4) {
      console.log('vm sidebar', vm);

      props.funSelect(info);
    }
  };
  const onRightClick: DirectoryTreeProps['onRightClick'] = (info) => {
    console.log('info', info);
    setInfor(info);
    props.funGetVM(vm);
  };
  const onChange = (e: any) => {
    setRename(e.target.value);
    setRenameInput(e.target.value);
  };
  const onChangeUsername = (e: any) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleOkRename = () => {
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
    setIsModalOpenRename(false);
  };
  const handleOkLogin = () => {
    setIsModalOpenLogin(false);
    alert('Set user login success');
    console.log('password', password);
  };
  const handleCancelRename = () => {
    setIsModalOpenRename(false);
  };
  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };
  const handleRename = () => {
    setIsModalOpenRename(true);
    setRenameInput(infor.node.title);
  };
  const handleRefresh = () => {
    const data: DataNode[] = [];
    initData.forEach((item: any) => {
      const obj = {
        title: item.name,
        key: item.id,
      };
      data.push(obj);
      setTreeData(data);
    });
  };
  const setPowerVm = (item: string) => {
    const filterVm = vm.map((vmItem: { id: string; power_state: string }) => {
      if (vmItem.id === keySelect) {
        vmItem.power_state = item;
      }
      return vmItem;
    });
    setVm(filterVm);
    props.funGetVM(filterVm);
  };
  const handlePowerOn = () => {
    setPowerVm('POWER_ON');
  };
  const handlePowerOff = () => {
    setPowerVm('POWER_OFF');
  };
  const handlePowerSuspend = () => {
    setPowerVm('POWER_SUSPEND');
  };
  const handlePowerReset = () => {
    setPowerVm('POWER_RESET');
  };
  const handleLogin = () => {
    setIsModalOpenLogin(true);
  };
  const handleClone = () => {
    console.log('clone');
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
      initTreeData(res);
      setInitData(res);
    });
  }, []);
  const getMock = async (item: any, keys: any, info: any) => {
    try {
      const response = await request(`/api/vcenter/${item}`, 'GET');
      props.funSelect(info);
      props.funGetVM(response);
      setVm(response);
      const data: DataNode[] = [];
      response.forEach((item: any) => {
        if (item.id.includes(keys[0])) {
          const obj = {
            title: item.name,
            key: item.id,
          };
          data.push(obj);
        }
        setTreeData(updateTreeData(treeData, keys[0], data));
      });
    } catch (error) {
      console.log(error);
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
            open={isModalOpenRename}
            onOk={handleOkRename}
            onCancel={handleCancelRename}
          >
            <div className="input__name">
              <span>Enter the new name</span>
              <Input
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
          <Modal
            title="User login"
            open={isModalOpenLogin}
            onOk={handleOkLogin}
            onCancel={handleCancelLogin}
          >
            <div className="input__name">
              <div>
                Username
                <Input onChange={onChangeUsername}></Input>
              </div>
              <div>
                Password
                <Input.Password onChange={onChangePassword} />
              </div>
            </div>
          </Modal>
        </div>
      </Dropdown>
    </>
  );
};

export default Sidebar;
