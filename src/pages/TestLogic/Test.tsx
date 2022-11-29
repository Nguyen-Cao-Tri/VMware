/* eslint-disable @typescript-eslint/no-misused-promises */
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
// }props: {
//   funSelect: (arg0: {
//     event: 'select';
//     selected: boolean;
//     node: EventDataNode<TreeDataNode>;
//     selectedNodes: TreeDataNode[];
//     nativeEvent: MouseEvent;
//   }) => void;
//   funGetVM: (arg0: any) => void;
// }
const Sidebar = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [infor, setInfor] = useState<any>();
  const [isModalOpenRename, setIsModalOpenRename] = useState(false);

  const [rename, setRename] = useState<string>('');
  const [renameInput, setRenameInput] = useState<string>('');
  const [initData, setInitData] = useState<DataNode[]>([]);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  const [isModalOpenGetfile, setIsModalOpenGetfile] = useState<boolean>(false);
  const [isModalOpenCopyfile, setIsModalOpenCopyfile] =
    useState<boolean>(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [isModalOpenClone, setIsModalOpenClone] = useState<boolean>(false);
  const [valueGetFile, setValueGetFile] = useState<string>('');
  const [copyFileInput, setCopyFileInput] = useState<string>('');
  const [selectFileInput, setSelectFileInput] = useState<string>('');
  const [cloneValue, setCloneValue] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [datacenter, setDatacenter] = useState<object[]>([]);
  const [folder, setFolder] = useState<object[]>([]);
  const [vm, setVm] = useState<object[]>([]);
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
            handlePowerState('POWER_ON');
            break;
          case 'powerOff':
            handlePowerState('POWER_OFF');
            break;
          case 'powerSuspend':
            handlePowerState('POWER_SUSPEND');
            break;
          case 'powerReset':
            handlePowerState('POWER_RESET');
            break;
          case 'login':
            handleLogin();
            break;
          case 'clone':
            handleClone();
            break;
          case 'getfile':
            setIsModalOpenGetfile(true);
            Modal.confirm({
              content: <div></div>,
            });
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
        key: item.datacenter,
        children: [],
        isLeaf: false,
      };
      newData.push(obj);
    });
    setDatacenter(newData);
    setTreeData(newData);
  };
  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      console.log('key on loaddata', key);
      console.log('children on loaddata', children);

      setTimeout(() => {
        resolve();
      }, 1000);
    });
  const getData = async (param: string, keys: any, info: any) => {
    try {
      const response = await request(`/api/vcenter/${param}`, 'GET');
      if (param === 'folder') {
        setFolder(response);
      }
      if (param === 'vm') {
        // props.funGetVM(response);
        setVm(response);
      }
      setTimeout(() => {
        // setVm(response);
        const data: DataNode[] = [];
        response.forEach((item: any) => {
          if (item[param].includes(keys)) {
            const obj = {
              title: item.name,
              key: item[param],
              isLeaf: param === 'vm',
            };
            data.push(obj);
          }
          setTreeData(updateTreeData(treeData, keys, data));
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const onExpand = (expandedKeysValue: React.Key[], info: any) => {
    // setExpandedKeys(expandedKeysValue);
    const keyExpand = expandedKeysValue[expandedKeysValue.length - 1];
    console.log('key', keyExpand);
    if (keyExpand.toString().includes('datacenter')) {
      request(
        `/api/vcenter/folder/?type=VIRTUAL_MACHINE&parent_folders=${keyExpand}`,
      ).then((res: object[]) => {
        const data: DataNode[] = [];
        res.forEach((itemRes: any) => {
          if (itemRes?.parentId === keyExpand) {
            const obj = {
              title: itemRes.name,
              key: itemRes.folder,
              isLeaf: false,
            };
            data.push(obj);
          }
          setTreeData(updateTreeData(treeData, keyExpand, data));
        });
      });
    }

    // const keySelectedLength = `${
    //   expandedKeysValue[expandedKeysValue.length - 1]
    // }`.length;
    // if (keySelectedLength === 2) {
    //   getData('folder', keys, info);
    // }
    // if (keySelectedLength === 3) {
    //   getData('vm', keys, info);
    // }
    // if (keySelectedLength === 4) {
    //   props.funSelect(info);
    // }
  };
  const onCheck = (checkedKeysValue: any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    console.log('onSelect key', selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
    // props.funSelect(info);
    // props.funGetVM(vm);
  };
  const onRightClick: DirectoryTreeProps['onRightClick'] = (info) => {
    console.log('info', info);
    setInfor(info);
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
        }
        if (item.children) {
          findRename(item.children);
        }
      });
      return list;
    };
    setTreeData([...findRename(treeData)]);
    setRename('');
    setIsModalOpenRename(false);
  };
  const handleOkLogin = () => {
    setIsModalOpenLogin(false);
    const obj = {
      id: infor?.node.key,
      username: userName,
      password,
    };
    localStorage.setItem(`username ${infor.node.key}`, `${obj.username}`);
    localStorage.setItem(`password ${infor.node.key}`, `${obj.password}`);
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
        key: item.datacenter,
        isLeaf: false,
      };
      data.push(obj);
    });
    setTreeData(data);
    setExpandedKeys([]);
  };
  const setPowerVm = (item: string) => {
    console.log('vm sidebar', vm);

    const filterVm = vm.map((vmItem: any) => {
      if (vmItem.vm === infor.node.key) {
        vmItem.power_state = item;
      }
      return vmItem;
    });
    setVm(filterVm);
    // props.funGetVM(filterVm);
  };
  const handlePowerState = (state: string) => {
    setPowerVm(state);
  };
  const handleLogin = () => {
    setIsModalOpenLogin(true);
    const getUsername = localStorage.getItem(`username ${infor.node.key}`);
    if (getUsername === undefined || getUsername === null) {
      setIsModalOpenLogin(true);
    } else {
      setIsModalOpenLogin(false);
      alert('User logged in!');
    }
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
    const vmId = infor.node.key;
    const vmUsername = localStorage.getItem(`username ${infor.node.key}`);
    const vmPassword = localStorage.getItem(`password ${infor.node.key}`);
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
    setCloneValue('');
    setIsModalOpenClone(true);
  };
  const handleOkClone = () => {
    setIsModalOpenClone(false);
    const idRandom = new Date().getMilliseconds();
    const idVmClone = `${infor.node.key.slice(0, 3)}${idRandom}`;
    request('/api/vcenter/vm?action=clone', 'POST', {
      name: cloneValue,
      source: idVmClone,
    })
      .then((res: any) => console.log('res clone', res))
      .catch((e: any) => console.log('error clone', e));
    console.log('tree data', treeData);
    console.log('datacenter', datacenter);
    console.log('folder', folder);
    console.log('vm', vm);
    console.log('name clone', cloneValue);
    console.log('id clone', idVmClone);
    const cloneItemVm = vm.filter(
      (itemVm: any) => itemVm.vm === infor.node.key,
    );
    const cloneVmValue: { key: string; title: string; isLeaf: boolean } = {
      key: idVmClone,
      title: cloneValue,
      isLeaf: true,
    };
    const setVmValue: { name: string; vm: string } = {
      ...cloneItemVm[0],
      name: cloneValue,
      vm: idVmClone,
    };
    setVm([...vm, setVmValue]);
    const findClone = (list: DataNode[]) => {
      list?.forEach((itemList: any) => {
        if (itemList.key === infor.node.key.slice(0, 3)) {
          itemList.children.push(cloneVmValue);
        } else {
          findClone(itemList.children);
        }
      });
      return list;
    };
    setTreeData([...findClone(treeData)]);
  };

  const handleCancelClone = () => {
    setIsModalOpenClone(false);
  };
  useEffect(() => {
    // const getApiKey = localStorage.getItem('apiKey');
    // if (getApiKey === undefined || getApiKey === null) {
    // navigate('/login');
    // }
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      initTreeData(res);
      setInitData(res);
    });
  }, []);
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
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            onRightClick={onRightClick}
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
            <Input
              placeholder="Input VM name"
              onChange={onChangeClone}
              value={cloneValue}
            ></Input>
          </Modal>
        </div>
      </Dropdown>
    </>
  );
};

export default Sidebar;
