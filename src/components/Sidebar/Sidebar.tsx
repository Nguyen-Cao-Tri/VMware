/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Key, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { UpdateTreeData } from './SidebarHandle/UpdateTreeData';
import { InitTreeData } from './SidebarHandle/InitTreeData';
import useRequest from '../../hooks/useRequest/useRequest';
import { PushRequestData } from './SidebarHandle/PushRequestData';
import { items } from '../../utils/items';
import DropdownTree from './SidebarHandle/DropdownTree';
import ModalRename, { findRename } from '../Modal/ModalRename';
import ModalGetfile from '../Modal/ModalGetfile';
import ModalUserLogin from '../Modal/ModalUserLogin';

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
}
const Sidebar = (props: PropsSidebar) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [isModalRenameOpen, setIsModalRenameOpen] = useState<boolean>(false);
  const [isModalGetfileOpen, setIsModalGetfileOpen] = useState<boolean>(false);
  const [isModalUserLoginOpen, setIsModalUserLoginOpen] =
    useState<boolean>(false);
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
  useEffect(() => {
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setTreeData(InitTreeData(res));
    });
  }, []);
  const callApiPowerState = (idVm: string, action: string) => {
    void request(`/api/vcenter/vm/${idVm}/power?action=${action}`, 'POST').then(
      () => {
        vm.forEach((itemVm: any) => {
          if (itemVm.vm === idVm) {
            itemVm.power_state = action;
          }
          props.propVmPowerState([...vm]);
        });
      },
    );
  };
  const handlePowerState = (idVm: string, action: string) => {
    const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
    console.log('vmCheckKeys', vmCheckKeys);
    if (vmCheckKeys?.length > 0) {
      vmCheckKeys.map((item: any) => callApiPowerState(item, action));
    } else callApiPowerState(idVm, action);
  };
  const item = () => {
    const text = 'asd';
    return (
      <Menu
        onClick={(key) => {
          switch (key.key) {
            case 'rename':
              setIsModalRenameOpen(true);
              setRenameInput(keyRightClick);
              break;
            case 'refresh':
              request('/api/vcenter/datacenter').then((res: DataNode[]) => {
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
              break;
            case 'getfile':
              setIsModalGetfileOpen(true);
              break;
            case 'copyfile':
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
      const param = 'folder';
      setKeyDatacenter(key);
      await request(`/api/vcenter/${param}?names=vm&datacenters=${key}`).then(
        (res) => {
          setTreeData(() =>
            UpdateTreeData(treeData, key, PushRequestData(res, param)),
          );
          if (key === keySelect) props.propChildren(res);
        },
      );
    }
    if (key.includes('group')) {
      const param = 'folder';
      await request(
        `/api/vcenter/${param}?parent_folders=${key}&datacenters=${keyDatacenter}`,
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
  return (
    <>
      <DropdownTree
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
        }}
        checkedKeys={checkedKeys}
        expandedKeys={keyExpanded}
        onCheck={(value, info) => {
          setCheckedKeys(value);
        }}
        loadedKeys={loadedKeys}
      ></DropdownTree>
      <ModalRename
        isModalOpen={isModalRenameOpen}
        handleOk={(value) => {
          setTreeData([...findRename(treeData, keyRightClick, value)]);
          setIsModalRenameOpen(false);
        }}
        handleCancel={() => setIsModalRenameOpen(false)}
        keyRightClick={keyRightClick}
        nameRightClick={nameRightClick}
      />
      <ModalGetfile
        isModalOpen={isModalGetfileOpen}
        handleCancel={() => setIsModalGetfileOpen(false)}
        keyRightClick={keyRightClick}
        checkedKeys={checkedKeys}
      />
      <ModalUserLogin
        isModalOpen={isModalUserLoginOpen}
        keyRightClick={keyRightClick}
        checkedKeys={checkedKeys}
        handleCancel={() => setIsModalUserLoginOpen(false)}
      />
    </>
  );
};

export default Sidebar;
