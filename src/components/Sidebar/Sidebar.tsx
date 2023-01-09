/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { PushRequestData } from 'components/Sidebar/SidebarHandle/PushRequestData';
import { UpdateTreeData } from 'components/Sidebar/SidebarHandle/UpdateTreeData';
import { InitTreeData } from 'components/Sidebar/SidebarHandle/InitTreeData';
import DropdownTree from 'components/Sidebar/SidebarHandle/DropdownTree';
import { LaptopOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalUserLogin from 'components/Modal/ModalUserLogin';
import ModalCopyfile from 'components/Modal/ModalCopyfile';
import PowerStart from 'components/IconCustom/PowerStart';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import ModalGetfile from 'components/Modal/ModalGetfile';
import ModalProcess from 'components/Modal/ModalProcess';
import ModalRename from 'components/Modal/ModalRename';
import { Action } from 'hooks/logProvider/LogProvider';
import ModalClone from 'components/Modal/ModalClone';
import useRequest from 'hooks/useRequest/useRequest';
import { Spin, Input } from 'antd';
export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
export const SidebarContext = createContext({});
export const Sidebar = () => {
  const [isModal, setIsModal] = useState({
    UserLoginOpen: false,
    CopyfileOpen: false,
    GetfileOpen: false,
    ProcessOpen: false,
    RenameOpen: false,
    CloneOpen: false,
  });
  const [alternativeTreeData, setAlternativeTreeData] = useState<DataNode[]>([]);
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [keyExpanded, setKeyExpanded] = useState<React.Key[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [renameInput, setRenameInput] = useState<string>('');
  const [infoExpanded, setInfoExpanded] = useState<any>('');
  const [inforSelected, setInforSelected] = useState<any>();
  const [keySelect, setKeySelect] = useState<React.Key[]>();
  const [datacenter, setDatacenter] = useState<object[]>();
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [nameChange, setNameChange] = useState<string>('');
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [vmKey, setVmKey] = useState<object[]>([]);
  const [folder, setFolder] = useState<object[]>();
  const [vmApi, setVmApi] = useState<object[]>();
  const { request, isLoading } = useRequest();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const antIcon = <LoadingOutlined className="loading" style={{ fontSize: 15 }} spin />;

  const {
    inforSelect,
    vm,
    curentTheme,
    setOnSelect,
    setVmPowerStates,
    setChildrens,
    setVms,
    setNetwork,
    setParentKey,
    setTool,
  } = useInfo();
  useEffect(() => {
    const keySelectParam: any = searchParams.get('selected')?.split(',');
    const keyExpandParam: any = searchParams.get('expanded')?.split(',');
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
        request(`/api/vcenter/vm/${item.vm}`).then(infoVm => {
          const obj = { idVm: item.vm, infor: infoVm };
          if (setVms) setVms(obj);
        });
        request(`/api/vcenter/vm/${item.vm}/tools`).then(vmTool => {
          const obj = { idVm: item.vm, tool: vmTool };
          if (setTool) setTool(obj);
        });
        request(`/api/vcenter/vm/${item.vm}/guest/networking`).then(vmNetwork => {
          const obj = { idVm: item.vm, network: vmNetwork };
          if (setNetwork) setNetwork(obj);
        });
      });
    });
    setKeyExpanded(keyExpandParam);
    setKeySelect(keySelectParam);
  }, []);
  const checkUpdateIcon = (action: string, idVm: string) => {
    if (action === 'start') {
      setTreeData([...updateIconStart(treeData, <PowerStart />, idVm)]);
    }
    if (action === 'stop') {
      setTreeData([...updateIconStart(treeData, <LaptopOutlined />, idVm)]);
    }
  };
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
    if (isLoading) {
      // if (action === 'start') {
      setTreeData([...updateIconStart(treeData, <Spin indicator={antIcon} />, idVm)]);
      // }
    }
    await request(`/api/vcenter/vm/${idVm}/power?action=${action}`, 'POST', {
      action: `Power ${action}`,
      name: nameRightClick,
    })
      .then(async () => {
        vm.forEach((itemVm: any) => {
          if (itemVm.vmKey === idVm) {
            itemVm.power_state = action;
            localStorage.setItem(itemVm.vmKey, action);
          }
          if (setVmPowerStates) setVmPowerStates([...vm]);
        });
        checkUpdateIcon(action, idVm);
      })
      .catch((err: any) => {
        `${err}`.includes('Failed to fetch') ? setTreeData([...treeData]) : checkUpdateIcon(action, idVm);
      });
  };
  const handlePowerState = async (idVm: string, action: string) => {
    const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys?.length > 0) {
      vmCheckKeys.map(async (item: any) => await callApiPowerState(item, action));
    } else await callApiPowerState(idVm, action);
  };

  const navigateSelect = (param: string, value: string) => {
    if (value?.includes(param)) {
      navigate(`/${param}?${param}_id=${value}`);
    }
  };
  const findNodeTreeData = (list: DataNode[], nodeKey: string, arr: string[], keySelected: string) => {
    console.log('treeData list', list);

    list?.map((itemTreeData: any) => {
      if (itemTreeData.key === nodeKey) {
        const checkNode = JSON.stringify(itemTreeData.children)?.indexOf(keySelected);
        if (checkNode !== -1) {
          return arr.push(itemTreeData.key);
        } else findNodeTreeData(itemTreeData.children, nodeKey, arr, keySelected);
      } else findNodeTreeData(itemTreeData.children, nodeKey, arr, keySelected);
    });
    return arr;
  };
  const handleOnSelect = (value: any[], info: { node: { title: any; children: any } }) => {
    const arr: string[] = [];
    keyExpanded?.map((item: any) => {
      if (setParentKey) setParentKey(findNodeTreeData(treeData, item, arr, value[0]));
    });
    ['datacenter', 'group', 'vm'].forEach((item: any) => navigateSelect(item, value[0]));
    setKeySelect(value);
    setInforSelected(info);
    if (setOnSelect)
      setOnSelect({
        title: info.node.title,
        key: value[0],
        children: info.node?.children,
      });
    if (setVmPowerStates) setVmPowerStates(vmKey);
  };
  const onLoadData = async ({ key }: any) => {
    if (key.includes('datacenter')) {
      const datacenterName: any = datacenter?.filter((item: any) => item.datacenter === key);
      const param = 'folder';
      setKeyDatacenter(key);
      await request(`/api/vcenter/${param}?names=vm&datacenters=${key}`, 'GET', {
        action: Action.GET_LIST_FOLDER,
        name: nameChange || datacenterName[0].name,
      }).then(res => {
        setTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, param)));
        setAlternativeTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, param)));
        if (key === keySelect) {
          if (setChildrens) setChildrens(res);
        }
      });
    }
    if (key.includes('group')) {
      const folderName: any = folder?.filter((item: any) => item.folder === key);
      const vmName: any = vmApi?.filter((item: any) => item.vmKey === key);
      const param = 'folder';
      await request(`/api/vcenter/${param}?parent_folders=${key}&datacenters=${keyDatacenter}`, 'GET', {
        action: Action.GET_LIST_FOLDER,
        name: nameChange || folderName[0].name,
      }).then((res: any) => {
        if (keySelect !== undefined && key === keySelect[0].toString())
          if (setOnSelect) {
            setOnSelect({
              title: inforSelect.title,
              key,
              children: res,
            });
          }
        setTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, param)));
        setAlternativeTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, param)));
      });
      await request(`/api/vcenter/vm?folders=${key}&datacenters=${keyDatacenter}`, 'GET').then((res: any) => {
        if (res.length > 0) {
          if (keySelect !== undefined && key === keySelect[0].toString()) {
            if (setOnSelect) {
              setOnSelect({
                title: inforSelect.title,
                key,
                children: res,
              });
            }
          }
          setTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, 'vm')));
          setAlternativeTreeData(() => UpdateTreeData(treeData, key, PushRequestData(res, 'vm')));
          setVmKey(vmKey.concat(res));
        }
      });
    }
    setLoadedKeys(loadedKeys.concat([key]));
  };
  const searchTree = (list: DataNode[], value: string) => {
    list.map((itemList: any) => {
      if (itemList.title.toLocaleLowerCase().includes(value)) return setTreeData([itemList]);
      else if (itemList.children) searchTree(itemList.children, value);
    });
  };
  const handleOnChange = (value: string) => {
    console.log('alternativeTreeData', alternativeTreeData);
    const inputValue = value.toLocaleLowerCase();
    searchTree(alternativeTreeData, inputValue);
  };

  const value = {
    vmKey,
    treeData,
    loadedKeys,
    keyExpanded,
    checkedKeys,
    keyRightClick,
    nameRightClick,
    isModal,
    onLoadData,
    setTreeData,
    setLoadedKeys,
    setRenameInput,
    handleOnSelect,
    setCheckedKeys,
    setKeyExpanded,
    setInfoExpanded,
    setKeyRightClick,
    handlePowerState,
    setNameRightClick,
    setIsModal,
  };
  return (
    <SidebarContext.Provider value={value}>
      <div className={curentTheme}>
        <div className="search">
          <Input.Search placeholder="Search" bordered={false} onChange={e => handleOnChange(e.target.value)} />
        </div>
        <div className="drop_tree">
          <DropdownTree />
          <ModalRename />
          <ModalGetfile />
          <ModalUserLogin />
          <ModalCopyfile />
          <ModalProcess />
          <ModalClone />
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
