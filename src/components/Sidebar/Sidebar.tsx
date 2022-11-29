/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Key, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Tree } from 'antd';
import { UpdateTreeData } from './SidebarHandle/UpdateTreeData';
import { InitTreeData } from './SidebarHandle/InitTreeData';
import useRequest from '../../hooks/useRequest/useRequest';
import { PushRequestData } from './SidebarHandle/PushRequestData';
import { items } from '../../utils/items';
import DropdownTree from './SidebarHandle/DropdownTree';
import ModalRename, { findRename } from '../Modal/ModalRename';

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
}
const Sidebar = (props: PropsSidebar) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [isModalRenameOpen, setIsModalRenameOpen] = useState<boolean>(false);
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [inforSelect, setInforSelect] = useState<any>();
  const [keySelect, setKeySelect] = useState<React.Key>();
  const [renameInput, setRenameInput] = useState<string>('');
  const [keyExpanded, setKeyExpanded] = useState<React.Key[]>([]);
  const [vm, setVm] = useState<object[]>([]);
  const { request } = useRequest();
  useEffect(() => {
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setTreeData(InitTreeData(res));
    });
  }, []);
  const handlePowerState = async (idVm: string, action: string) => {
    await request(
      `/api/vcenter/vm/${idVm}/power?action=${action}`,
      'POST',
    ).then(() => {
      vm.forEach((itemVm: any) => {
        if (itemVm.vm === keyRightClick) {
          itemVm.power_state = action;
        }
      });
    });
    props.propVmPowerState(vm);
  };
  const item = () => {
    return (
      <Menu
        onClick={(key) => {
          switch (key.key) {
            case 'rename':
              setIsModalRenameOpen(true);
              setRenameInput(keyRightClick);
              break;
            case 'refresh':
              request('/api/vcenter/datacenter', 'GET').then(
                (res: DataNode[]) => {
                  setTreeData(InitTreeData(res));
                },
              );
              setKeyExpanded([]);
              break;
            case 'powerOn':
              void handlePowerState(keyRightClick, 'start');
              break;
            case 'powerOff':
              void handlePowerState(keyRightClick, 'stop');
              break;
            case 'powerSuspend':
              void handlePowerState(keyRightClick, 'suspend');
              break;
            case 'powerReset':
              void handlePowerState(keyRightClick, 'reset');
              break;
            case 'login':
              break;
            case 'clone':
              break;
            case 'getfile':
              break;
            case 'copyfile':
          }
        }}
        items={items(vm, keyRightClick)}
      />
    );
  };
  const onLoadData = ({ key }: any) => {
    return new Promise<void>((resolve) => {
      // setTimeout(() => {
      if (key?.includes('datacenter')) {
        const param = 'folder';
        setKeyDatacenter(key);
        request(
          `/api/vcenter/${param}?names=vm&datacenters=${key}`,
          'GET',
        ).then((res: any) => {
          setTreeData(() =>
            UpdateTreeData(treeData, key, PushRequestData(res, param)),
          );
        });
      }
      if (key.includes('group')) {
        const param = 'folder';
        request(
          `/api/vcenter/${param}?parent_folders=${key}&datacenters=${keyDatacenter}`,
          'GET',
        ).then((res: any) => {
          setTreeData(() =>
            UpdateTreeData(treeData, key, PushRequestData(res, param)),
          );
        });
        request(
          `/api/vcenter/vm?folders=${key}&datacenters=${keyDatacenter}`,
          'GET',
        ).then((res: any) => {
          if (res.length > 0) {
            setTreeData(() =>
              UpdateTreeData(treeData, key, PushRequestData(res, 'vm')),
            );
            setVm(vm.concat(res));
          }
          props.propOnSelect(inforSelect);
        });
      }
      resolve();
      // }, 1000);
    });
  };
  const handleOkRename = (value: string) => {
    setTreeData([...findRename(treeData, keyRightClick, value)]);
    setIsModalRenameOpen(false);
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
          props.propOnSelect(info);
        }}
        onExpand={(value, info) => {
          props.propOnExpand(info);
          setKeyExpanded(value);
          // void onLoadData({ key: value[value.length - 1] });
        }}
        expandedKeys={keyExpanded}
        onCheck={(value, info) => {
          console.log('value', value);
          console.log('info', info);
        }}
        loadedKeys={[]}
      ></DropdownTree>
      <ModalRename
        isModalOpen={isModalRenameOpen}
        handleOk={(value) => handleOkRename(value)}
        handleCancel={() => setIsModalRenameOpen(false)}
        keyRightClick={keyRightClick}
        nameRightClick={nameRightClick}
      />
    </>
  );
};

export default Sidebar;
