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
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [infor, setInfor] = useState<any>();
  const [isModalOpenRename, setIsModalOpenRename] = useState(false);
  const [rename, setRename] = useState<string>('');
  const [renameInput, setRenameInput] = useState<string>('');
  const [vm, setVm] = useState<any>();
  const [keySelect, setKeySelect] = useState<string>('');
  const [initData, setInitData] = useState<DataNode[]>([]);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  const [isModalOpenGetfile, setIsModalOpenGetfile] = useState<boolean>(false);
  const [isModalOpenCopyfile, setIsModalOpenCopyfile] =
    useState<boolean>(false);
  const [isModalOpenClone, setIsModalOpenClone] = useState<boolean>(false);
  const [valueGetFile, setValueGetFile] = useState<string>('');
  const [copyFileInput, setCopyFileInput] = useState<string>('');
  const [selectFileInput, setSelectFileInput] = useState<string>('');
  const [cloneValue, setCloneValue] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userLogin, setUserLogin] = useState<object[]>([]);
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
            break;
          case 'getfile':
            handleGetFile();
            break;
          case 'copyfile':
            handleCopyFile();
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
          label: 'Get file from guest',
          key: 'getfile',
        },
        {
          label: 'Copy file to guest',
          key: 'copyfile',
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
    // const obj = {
    //   id: infor?.node.key,
    //   username: userName,
    //   password: password,
    // };
    // localStorage.setItem(`username ${infor.node.key}`, `${obj.username}`);
    // localStorage.setItem(`password ${infor.node.key}`, `${obj.password}`);
  };
  const handleCancelRename = () => {
    setIsModalOpenRename(false);
  };
  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };
  const handleCancelGetFile = () => {
    setIsModalOpenGetfile(false);
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
    setUserName('');
    setPassword('');
  };
  const handleGetFile = () => {
    setIsModalOpenGetfile(true);
  };
  const handleCopyFile = () => {
    setIsModalOpenCopyfile(true);
  };
  const handleOkCopyfile = () => {
    setIsModalOpenCopyfile(false);
    const vm = 'vm-17';
    request(`/api/vcenter/vm/${vm}/guest/filesystem?action=create`, 'POST', {
      spec: {
        path: copyFileInput,
      },
    })
      .then((response: any) => {
        console.log(response);
        const formData = new FormData();
        formData.append('file', selectFileInput);
        request(
          response.link,
          'PUT',
          {
            body: formData,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
          .then((res: any) => {
            console.log(res);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log('Oops errors!', error);
      });
  };
  const handleCancelCopyfile = () => {
    setIsModalOpenCopyfile(false);
  };
  const onChangeClone = (e: any) => {
    setCloneValue(e.target.value);
  };
  const onChangeGetFile = (e: any) => {
    setValueGetFile(e.target.value);
  };
  const handleOkGetfile = () => {
    setIsModalOpenGetfile(false);
    const vm: any = userLogin.filter((item: any) => item.id === infor.node.key);
    const vmId = vm[0].id;
    const vmUsername = vm[0].username;
    const vmPassword = vm[0].password;
    request(`/api/vcenter/vm/${vmId}/guest/filesystem?action=create`, 'POST', {
      credentials: {
        interactive_session: false,
        user_name: vmUsername,
        password: vmPassword,
        type: 'USERNAME_PASSWORD',
      },
      spec: {
        path: valueGetFile,
      },
    })
      .then((response: any) => {
        console.log(response.link);
        if (response.link) {
          request(response.link, 'GET')
            .then((res: any) => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', ' file.zip');
              document.body.appendChild(link);
              link.click();
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
        setIsModalOpenGetfile(false);
      })
      .catch((error: any) => {
        console.log('Oops errors!', error);
        setIsModalOpenGetfile(false);
      });
  };
  const onChangeCopyfile = (e: any) => {
    // console.log(e.target.value);
    setCopyFileInput(e.target.value);
  };
  const handleChangeFile = (e: any) => {
    // console.log(e.target.file[0]);
    setSelectFileInput(e.target.files[0]);
  };
  const handleClone = () => {
    setIsModalOpenClone(true);
  };
  const handleOkClone = () => {
    setIsModalOpenClone(false);
    // const idRandom = new Date().getMilliseconds();
    // const idVmCLone = `${infor.node.key.slice(0, 3)}${idRandom}`;
    // request('/api/vcenter/vm?action=clone', 'POST', {
    //   name: cloneValue,
    //   source: idVmCLone,
    // })
    //   .then((res: any) => console.log('res clone', res))
    //   .catch((e: any) => console.log('error clone', e));
    // console.log('tree data', treeData);
    // const vmItem = vm.filter((item: any) =>
    //   item.id.includes(infor.node.key.slice(0, 3)),
    // );
    // const cloneVm = () => {};
    // console.log('vm item clone 1', vmItem);
    // const vmItemClone = [
    //   ...vmItem,
    //   (vmItem[0].id = idVmCLone),
    //   (vmItem[0].name = cloneValue),
    // ];
  };
  const handleCancelClone = () => {
    setIsModalOpenClone(false);
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
                <Input value={userName} onChange={onChangeUsername}></Input>
              </div>
              <div>
                Password
                <Input.Password value={password} onChange={onChangePassword} />
              </div>
            </div>
          </Modal>
          <Modal
            title="GetFile"
            open={isModalOpenGetfile}
            onOk={handleOkGetfile}
            onCancel={handleCancelGetFile}
          >
            <div className="inputGetfile">
              <span>Path:</span>
              <Input placeholder="Enter ..." onChange={onChangeGetFile} />
            </div>
          </Modal>
          <Modal
            title="CopyFile"
            open={isModalOpenCopyfile}
            onOk={handleOkCopyfile}
            onCancel={handleCancelCopyfile}
          >
            <div className="inputCopyfile">
              <div className="path">
                <span>Path:</span>
                <Input placeholder="Enter ..." onChange={onChangeCopyfile} />
              </div>
              <div>
                <span>File:</span>
                <Input
                  type="file"
                  placeholder="Enter ..."
                  onChange={handleChangeFile}
                />
              </div>
            </div>
          </Modal>
          <Modal
            title="Clone"
            open={isModalOpenClone}
            onOk={handleOkClone}
            onCancel={handleCancelClone}
          >
            <Input placeholder="Input VM name" onChange={onChangeClone}></Input>
          </Modal>
        </div>
      </Dropdown>
    </>
  );
};

export default Sidebar;
