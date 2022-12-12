/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Key, useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import { UpdateTreeData } from './SidebarHandle/UpdateTreeData';
import { InitTreeData } from './SidebarHandle/InitTreeData';
import useRequest from '../../hooks/useRequest/useRequest';
import { PushRequestData } from './SidebarHandle/PushRequestData';
import { items } from '../../utils/items';
import DropdownTree from './SidebarHandle/DropdownTree';
import ModalRename, { findRename } from '../Modal/ModalRename';
import ModalGetfile from '../Modal/ModalGetfile';
import ModalUserLogin from '../Modal/ModalUserLogin';
import ModalCopyfile from '../Modal/ModalCopyfile';
import ModalProcess from '../Modal/ModalProcess';
import ModalClone from '../Modal/ModalClone';
import { LaptopOutlined, LoadingOutlined } from '@ant-design/icons';
import { Action, useLog } from '../../hooks/logProvider/LogProvider';
import PowerStart from '../IconCustom/PowerStart';

export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
interface PropsSidebar {
  propOnSelect: (info: any) => void;
  propOnExpand: (info: any) => void;
  propVmPowerState: (vm: object[]) => void;
  propChildren: (children: object[]) => void;
  propTheme: any;
  propVm: (vm: any) => void;
  propTool: (tool: any) => void;
  propNetwork: (net: any) => void;
}
const Sidebar = (props: PropsSidebar) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [isModalRenameOpen, setIsModalRenameOpen] = useState<boolean>(false);
  const [isModalGetfileOpen, setIsModalGetfileOpen] = useState<boolean>(false);
  const [isModalUserLoginOpen, setIsModalUserLoginOpen] =
    useState<boolean>(false);
  const [isModalCopyfileOpen, setIsModalCopyfileOpen] =
    useState<boolean>(false);
  const [isModalProcessOpen, setIsModalProcessOpen] = useState<boolean>(false);
  const [isModalCloneOpen, setIsModalCloneOpen] = useState<boolean>(false);
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [inforSelect, setInforSelect] = useState<any>();
  const [keySelect, setKeySelect] = useState<React.Key>();
  const [renameInput, setRenameInput] = useState<string>('');
  const [keyExpanded, setKeyExpanded] = useState<React.Key[]>([]);
  const [vm, setVm] = useState<object[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const { request, isLoading } = useRequest();
  const [datacenter, setDatacenter] = useState<object[]>();
  const [folder, setFolder] = useState<object[]>();
  const [vmApi, setVmApi] = useState<object[]>();
  const { vmLog } = useLog();
  const [nameChange, setNameChange] = useState<string>('');
  const antIcon = (
    <LoadingOutlined className="loading" style={{ fontSize: 15 }} spin />
  );
  const [infoExpanded, setInfoExpanded] = useState<any>('');
  useEffect(() => {
    request('/api/vcenter/datacenter', 'GET', {
      action: Action.GET_LIST_DATACENTER,
    }).then((res: any) => {
      setDatacenter(res);
      setTreeData(InitTreeData(res));
    });
    request('/api/vcenter/folder').then((res: any) => setFolder(res));
    request('/api/vcenter/vm').then((res: any) => {
      setVmApi(res);
      res.map((item: any) => {
        request(`/api/vcenter/vm/${item.vm}`).then((infoVm) => {
          const obj = { idVm: item.vm, infor: infoVm };
          props.propVm(obj);
        });
        request(`/api/vcenter/vm/${item.vm}/tools`).then((vmTool) => {
          const obj = { idVm: item.vm, tool: vmTool };
          props.propTool(obj);
        });
        request(`/api/vcenter/vm/${item.vm}/guest/networking`).then(
          (network) => {
            const obj = { idVm: item.vm, network };
            props.propNetwork(obj);
          },
        );
      });
    });
  }, []);
  const updateIconStart = (list: DataNode[], icon: any, idVm: string) => {
    list.forEach((item: any) => {
      if (item.key === idVm) {
        item.icon = icon;
      }
      if (item.children) {
        updateIconStart(item.children, icon, idVm);
      }
    });
    return list;
  };
  const callApiPowerState = async (idVm: string, action: string) => {
    console.log(`${isLoading}`);

    if (isLoading)
      setTreeData([
        ...updateIconStart(treeData, <Spin indicator={antIcon} />, idVm),
      ]);
    await request(`/api/vcenter/vm/${idVm}/power?action=${action}`, 'POST', {
      action: `Power ${action}`,
      name: nameRightClick,
    })
      .then(() => {
        vm.forEach((itemVm: any) => {
          if (itemVm.vm === idVm) {
            itemVm.power_state = action;
            localStorage.setItem(itemVm.vm, action);
          }
          props.propVmPowerState([...vm]);
        });
        console.log(`${isLoading}`);

        setTreeData([
          ...updateIconStart(
            treeData,
            <>{action === 'stop' ? <LaptopOutlined /> : <PowerStart />}</>,
            idVm,
          ),
        ]);
      })
      .catch(() => {
        setTreeData([
          ...updateIconStart(
            treeData,
            <>{action === 'start' ? <LaptopOutlined /> : <PowerStart />}</>,
            idVm,
          ),
        ]);
      });
  };
  const handlePowerState = async (idVm: string, action: string) => {
    const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
    console.log('vmCheckKeys', vmCheckKeys);
    if (vmCheckKeys?.length > 0) {
      vmCheckKeys.map(
        async (item: any) => await callApiPowerState(item, action),
      );
    } else await callApiPowerState(idVm, action);
  };
  const item = () => {
    return (
      <Menu
        theme={props.propTheme}
        onClick={(key) => {
          switch (key.key) {
            case 'rename':
              setIsModalRenameOpen(true);
              setRenameInput(keyRightClick);
              break;
            case 'refresh':
              request('/api/vcenter/datacenter', 'GET', {
                action: Action.REFRESH,
                // name: nameRightClick,
              }).then((res: DataNode[]) => {
                setTreeData(InitTreeData(res));
              });
              setKeyExpanded([]);
              setLoadedKeys([]);
              setCheckedKeys([]);
              break;
            case 'login':
              setIsModalUserLoginOpen(true);
              break;
            case 'clone':
              setIsModalCloneOpen(true);
              break;
            case 'getfile':
              setIsModalGetfileOpen(true);
              break;
            case 'copyfile':
              setIsModalCopyfileOpen(true);
              break;
            case 'process':
              setIsModalProcessOpen(true);
              break;
            case key.key:
              void handlePowerState(keyRightClick, key.key);
              break;
          }
        }}
        items={items(vm, keyRightClick)}
      />
    );
  };
  const onLoadData = async ({ key }: any) => {
    if (key.includes('datacenter')) {
      const datacenterName: any = datacenter?.filter(
        (item: any) => item.datacenter === key,
      );
      const param = 'folder';
      setKeyDatacenter(key);
      await request(
        `/api/vcenter/${param}?names=vm&datacenters=${key}`,
        'GET',
        {
          action: Action.GET_LIST_FOLDER,
          name: nameChange || datacenterName[0].name,
        },
      ).then((res) => {
        setTreeData(() =>
          UpdateTreeData(treeData, key, PushRequestData(res, param)),
        );
        if (key === keySelect) props.propChildren(res);
      });
    }
    if (key.includes('group')) {
      const folderName: any = folder?.filter(
        (item: any) => item.folder === key,
      );
      const vmName: any = vmApi?.filter((item: any) => item.vm === key);
      const param = 'folder';
      await request(
        `/api/vcenter/${param}?parent_folders=${key}&datacenters=${keyDatacenter}`,
        'GET',
        {
          action: Action.GET_LIST_FOLDER,
          name: nameChange || folderName[0].name,
        },
      ).then((res: any) => {
        if (key === keySelect) {
          props.propOnSelect({
            title: inforSelect.node.title,
            key,
            children: res,
          });
        }
        setTreeData(() =>
          UpdateTreeData(treeData, key, PushRequestData(res, param)),
        );
      });
      await request(
        `/api/vcenter/vm?folders=${key}&datacenters=${keyDatacenter}`,
        'GET',
      ).then((res: any) => {
        if (res.length > 0) {
          if (key === keySelect) {
            props.propOnSelect({
              title: inforSelect.node.title,
              key,
              children: res,
            });
          }
          setTreeData(() =>
            UpdateTreeData(treeData, key, PushRequestData(res, 'vm')),
          );
          setVm(vm.concat(res));
        }
      });
    }
    setLoadedKeys(loadedKeys.concat([key]));
  };
  const handleOkClone = (cloneInput: string) => {
    setIsModalCloneOpen(false);
    const vmName: any = vmApi?.filter((item: any) => item.vm === keyRightClick);
    console.log('vmName', vmName);
    request(
      '/api/vcenter/vm?action=clone',
      'POST',
      {
        action: Action.CLONE_VM,
        name: vmName[0].name,
      },
      false,
      {
        name: cloneInput,
        source: keyRightClick,
      },
    );
  };
  return (
    <div id="dropTree">
      <DropdownTree
        theme={props.propTheme}
        onLoadData={onLoadData}
        treeData={treeData}
        item={item}
        onRightClick={(value) => {
          setKeyRightClick(value.node.key);
          setNameRightClick(value.node.title);
        }}
        onSelect={(value, info) => {
          setKeySelect(value[0]);
          setInforSelect(info);
          props.propOnSelect({
            title: info.node.title,
            key: value[0],
            children: info.node?.children,
          });
          props.propOnExpand(value);
          props.propVmPowerState(vm);
        }}
        onExpand={(value, info) => {
          props.propOnExpand(value);
          setKeyExpanded(value);
          setInfoExpanded(info);
        }}
        checkedKeys={checkedKeys}
        expandedKeys={keyExpanded}
        onCheck={(value, info) => {
          setCheckedKeys(value);
        }}
        loadedKeys={loadedKeys}
        updateTreeDrop={(info: any) => setTreeData(info)}
      ></DropdownTree>
      <ModalRename
        isModalOpen={isModalRenameOpen}
        handleOk={(value) => {
          setNameChange(value);
          if (vmLog !== undefined) {
            vmLog({
              executeTime: Date.now(),
              name: nameRightClick,
              action: `Changed name to ${value}`,
            });
          }
          setTreeData([...findRename(treeData, keyRightClick, value)]);
          setIsModalRenameOpen(false);
        }}
        handleCancel={() => setIsModalRenameOpen(false)}
        keyRightClick={keyRightClick}
        nameRightClick={nameRightClick}
      />
      <ModalGetfile
        nameRightClick={nameRightClick}
        isModalOpen={isModalGetfileOpen}
        handleCancel={() => setIsModalGetfileOpen(false)}
        keyRightClick={keyRightClick}
        checkedKeys={checkedKeys}
      />
      <ModalUserLogin
        nameRightClick={nameRightClick}
        isModalOpen={isModalUserLoginOpen}
        keyRightClick={keyRightClick}
        checkedKeys={checkedKeys}
        handleCancel={() => setIsModalUserLoginOpen(false)}
      />
      <ModalCopyfile
        nameRightClick={nameRightClick}
        isModalopen={isModalCopyfileOpen}
        handleCancel={() => setIsModalCopyfileOpen(false)}
        keyRightClick={keyRightClick}
      />
      <ModalProcess
        nameRightClick={nameRightClick}
        isModalOpen={isModalProcessOpen}
        handleCancel={() => setIsModalProcessOpen(false)}
        keyRightClick={keyRightClick}
      />
      <ModalClone
        isModalOpen={isModalCloneOpen}
        handleCancel={() => setIsModalCloneOpen(false)}
        listVm={vm}
        keyRightClick={keyRightClick}
        handleOk={(value) => handleOkClone(value)}
      />
    </div>
  );
};

export default Sidebar;
