/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { LaptopOutlined, LoadingOutlined } from '@ant-design/icons';
import { PushRequestData } from './SidebarHandle/PushRequestData';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
import { UpdateTreeData } from './SidebarHandle/UpdateTreeData';
import { Action } from '../../hooks/logProvider/LogProvider';
import { InitTreeData } from './SidebarHandle/InitTreeData';
import useRequest from '../../hooks/useRequest/useRequest';
import DropdownTree from './SidebarHandle/DropdownTree';
import ModalUserLogin from '../Modal/ModalUserLogin';
import ModalCopyfile from '../Modal/ModalCopyfile';
import PowerStart from '../IconCustom/PowerStart';
import ModalGetfile from '../Modal/ModalGetfile';
import ModalProcess from '../Modal/ModalProcess';
import ModalRename from '../Modal/ModalRename';
import ModalClone from 'components/Modal/ModalClone';
import { Input, Spin } from 'antd';
import { vcenterAPI } from 'api/vcenterAPI';
import { useAPI } from 'hooks/useAPI/useAPI';

export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
  username?: string;
  password?: string;
}
export const SidebarContext = createContext({});
export const Sidebar = () => {
  const [isModalUserLoginOpen, setIsModalUserLoginOpen] = useState<boolean>(false);
  const [isModalCopyfileOpen, setIsModalCopyfileOpen] = useState<boolean>(false);
  const [isModalGetfileOpen, setIsModalGetfileOpen] = useState<boolean>(false);
  const [isModalProcessOpen, setIsModalProcessOpen] = useState<boolean>(false);
  const [isModalRenameOpen, setIsModalRenameOpen] = useState<boolean>(false);
  const [isModalCloneOpen, setIsModalCloneOpen] = useState<boolean>(false);
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [keyExpanded, setKeyExpanded] = useState<React.Key[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [keySelected, setKeySelected] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [alternativeTreeData, setAlternativeTreeData] = useState<DataNode[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const antIcon = <LoadingOutlined className="loading" style={{ fontSize: 15 }} spin />;

  const { inforSelect, curentTheme, setOnSelect, setVmPowerStates, setChildrens, setArrayTreeData } = useInfo();
  useEffect(() => {
    vcenterAPI.getDatacenters().then((datacenter: any) => {
      setTreeData(InitTreeData(datacenter));
    });
    const keySelectParam: any = searchParams.get('selected')?.split(',');
    const keyExpandParam: any = searchParams.get('expanded')?.split(',');
    setKeyExpanded(keyExpandParam);
    setKeySelected(keySelectParam);
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
    setTreeData([...updateIconStart(treeData, <Spin indicator={antIcon} />, idVm)]);
    await vcenterAPI
      .postPower(idVm, action)
      .then(async () => {
        checkUpdateIcon(action, idVm);
      })
      .catch((err: any) => {
        `${err}`.includes('Failed to fetch') ? setTreeData([...treeData]) : checkUpdateIcon(action, idVm);
      });
    await vcenterAPI.getPower(idVm).then(powerState => {
      const obj = {
        idVm,
        powerState,
      };
      if (setVmPowerStates) setVmPowerStates(obj);
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
  const formatTreeData = (list: DataNode[], arr: object[], idParent: string) => {
    let id = 0;
    list.forEach((itemTreeData: any) => {
      id++;
      const obj = {
        key: itemTreeData.key,
        idParent: `${idParent}-${id}`,
      };
      arr.push([obj]);
      if (itemTreeData.children) formatTreeData(itemTreeData.children, arr, `${idParent}-${id}`);
    });
    localStorage.setItem('idParent', JSON.stringify(arr));
    return arr;
  };
  const handleOnSelect = async (value: any[], info: { node: { title: any; children: any } }) => {
    if (value[0] !== undefined) {
      await vcenterAPI.getPower(value[0]).then(powerState => {
        const obj = {
          idVm: value[0],
          powerState,
        };
        if (setVmPowerStates) setVmPowerStates(obj);
      });
      if (setArrayTreeData) setArrayTreeData(formatTreeData(treeData, [], '1'));
      ['datacenter', 'group', 'vm'].forEach((item: any) => navigateSelect(item, value[0]));
      setKeySelected(value);
      localStorage.setItem('keySelect', JSON.stringify(value));
      const obj = {
        title: info.node.title,
        key: value[0],
        children: info.node?.children,
      };
      if (setOnSelect) setOnSelect(obj);
      localStorage.setItem('setOnSelect', JSON.stringify(obj));
    }
  };
  const updateTreeOnLoadData = (list: DataNode[], key: string, data: any, param: string) => {
    setTreeData(() => UpdateTreeData(treeData, key, PushRequestData(data, param)));
    sessionStorage.setItem('treeData', JSON.stringify(UpdateTreeData(treeData, key, PushRequestData(data, param))));
    sessionStorage.setItem('sessionLogin', JSON.stringify(UpdateTreeData(treeData, key, PushRequestData(data, param))));
    localStorage.setItem('localLogin', JSON.stringify(UpdateTreeData(treeData, key, PushRequestData(data, param))));
    setAlternativeTreeData(() => UpdateTreeData(treeData, key, PushRequestData(data, param)));
  };
  const onLoadData = async ({ key }: any) => {
    if (key.includes('datacenter')) {
      setKeyDatacenter(key);
      await vcenterAPI.getFoldersByIdParent(key, '').then(folder => {
        updateTreeOnLoadData(treeData, key, folder, 'folder');
        if (key === keySelected) {
          if (setChildrens) setChildrens(folder);
        }
      });
    }
    if (key.includes('group')) {
      await vcenterAPI.getFoldersByIdParent(keyDatacenter, key).then(folder => {
        if (keySelected !== undefined && key === keySelected[0].toString())
          if (setOnSelect) {
            setOnSelect({
              title: inforSelect.title,
              key,
              children: folder,
            });
          }
        updateTreeOnLoadData(treeData, key, folder, 'folder');
      });
      await vcenterAPI.getVmsByIdParent(key, keyDatacenter).then(vm => {
        if (vm.length > 0) {
          if (keySelected !== undefined && key === keySelected[0].toString()) {
            if (setOnSelect) {
              setOnSelect({
                title: inforSelect.title,
                key,
                children: vm,
              });
            }
          }
          updateTreeOnLoadData(treeData, key, vm, 'vm');
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
    treeData,
    loadedKeys,
    keyExpanded,
    keySelected,
    checkedKeys,
    keyRightClick,
    nameRightClick,
    isModalCloneOpen,
    isModalRenameOpen,
    isModalGetfileOpen,
    isModalProcessOpen,
    isModalCopyfileOpen,
    isModalUserLoginOpen,
    onLoadData,
    setTreeData,
    setLoadedKeys,
    handleOnSelect,
    setCheckedKeys,
    setKeyExpanded,
    setKeyRightClick,
    handlePowerState,
    setNameRightClick,
    setIsModalCloneOpen,
    setIsModalRenameOpen,
    setIsModalProcessOpen,
    setIsModalGetfileOpen,
    setIsModalCopyfileOpen,
    setIsModalUserLoginOpen,
  };
  return (
    <SidebarContext.Provider value={value}>
      <div className={curentTheme}>
        <div className="search">
          <Input.Search placeholder="Search" bordered={false} onChange={e => handleOnChange(e.target.value)} />
        </div>
        <div className="drop_tree">
          <DropdownTree />
          {/* <ModalRename /> */}
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
