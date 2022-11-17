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
import { Tree, Dropdown, Menu, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { useNavigate } from 'react-router-dom';
import { DirectoryTreeProps } from 'antd/es/tree';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
interface IContext {
  onRightClick: DirectoryTreeProps['onRightClick'];
  onSelect?: DirectoryTreeProps['onSelect'];
  treeData?: DataNode[];
}
const initTreeData: DataNode[] = [
  { title: 'Datacenter 1', key: '01' },
  { title: 'Datacenter 2', key: '02' },
  { title: 'Datacenter 3', key: '03' },
];
const ListDatacenterContext = createContext<IContext>({
  onRightClick: () => {},
});
const ListDatacenter: React.FC = (props: PropsWithChildren<any>) => {
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
    setAction('On');
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
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('key select', keys);
    const getMock = (item: any) => {
      request(`/api/vcenter/${item}`, 'GET').then((res: any) => {
        console.log('res', res);
        res.forEach((item: any) => {
          if (item.id.includes(keys[0])) {
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
    // console.log('Key Select', keys);
    // console.log('Info Select', info);
  };
  const value: IContext = {
    onRightClick,
    onSelect,
    treeData,
  };
  return (
    <>
      <ListDatacenterContext.Provider value={value}>
        {props.children}
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
      </ListDatacenterContext.Provider>
    </>
  );
};

export default ListDatacenter;
