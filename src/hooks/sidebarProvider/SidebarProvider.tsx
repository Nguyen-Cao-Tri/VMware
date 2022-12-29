/* eslint-disable @typescript-eslint/no-unused-vars */
import { SiderContext } from 'antd/es/layout/Sider';
import React, { useState, createContext, useContext, PropsWithChildren } from 'react';
import { findRename } from '../../components/Modal/ModalRename';
import { useInfo } from '../infoProvider/InfoProvider';
import { useLog } from '../logProvider/LogProvider';
export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
}
export interface ISidebarContext {
  vmKey?: object[];
  checkedKeys?: any;
  treeData?: DataNode[];
  setTreeData?: DataNode[];
  loadedKeys?: string[];
  keyRightClick?: string;
  nameRightClick?: string;
  keyExpanded?: React.Key[];
  isModalCloneOpen?: boolean;
  isModalRenameOpen?: boolean;
  isModalGetfileOpen?: boolean;
  isModalProcessOpen?: boolean;
  isModalCopyfileOpen?: boolean;
  isModalUserLoginOpen?: boolean;

  onRightClick?: (value: any) => void;
  onCheck?: (value: any) => void;
  updateTreeDrop?: (info: any) => void;
  handleCancel?: () => void;

  //   inforSelected?: React.Key[];
  //   keySelect?: string;
  //   renameInput?: string;
  //   vmKey?: object[];
  //   folder?: object[];
  //   vmApi?: object[];
  //   datacenter?: object[];
  //   nameChange?: string;
  //   infoExpanded?: any;
  //   keyDatacenter?: string;
}
const InforContext = createContext<ISidebarContext>({
  treeData: [],
  keyExpanded: [],
  checkedKeys: {},
  loadedKeys: [''],
  keyRightClick: '',
  nameRightClick: '',
  isModalCloneOpen: false,
  isModalRenameOpen: false,
  isModalGetfileOpen: false,
  isModalProcessOpen: false,
  isModalCopyfileOpen: false,
  isModalUserLoginOpen: false,

  //   inforSelected: [],
  //   keySelect: '',
  //   renameInput: 'string',
  //   vmKey: [{}],
  //   folder: [{}],
  //   vmApi: [{}],
  //   datacenter: [{}],
  //   nameChange: '',
  //   infoExpanded: {},
  //   keyDatacenter: '',

  onRightClick: () => {},
});
export const SidebarProvider = (props: PropsWithChildren<ISidebarContext>) => {
  const { setOnSelect, setOnExpand, setVmPowerStates, setChildrens, setVms, setNetwork, setParentKey, setTool } =
    useInfo();
  const [isModalUserLoginOpen, setIsModalUserLoginOpen] = useState<boolean>(false);
  const [isModalCopyfileOpen, setIsModalCopyfileOpen] = useState<boolean>(false);
  const [isModalProcessOpen, setIsModalProcessOpen] = useState<boolean>(false);
  const [isModalGetfileOpen, setIsModalGetfileOpen] = useState<boolean>(false);
  const [isModalRenameOpen, setIsModalRenameOpen] = useState<boolean>(false);
  const [isModalCloneOpen, setIsModalCloneOpen] = useState<boolean>(false);
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [keyExpanded, setKeyExpanded] = useState<React.Key[]>([]);
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [nameChange, setNameChange] = useState<string>('');
  const [infoExpanded, setInfoExpanded] = useState<any>('');
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [vmKey, setVmKey] = useState<object[]>([]);
  const { vmLog } = useLog();
  const [a, setA] = useState<string>('');

  //   const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  //   const [inforSelected, setInforSelected] = useState<any>();
  //   const [keySelect, setKeySelect] = useState<React.Key[]>();
  //   const [renameInput, setRenameInput] = useState<string>('');
  //   const [datacenter, setDatacenter] = useState<object[]>();
  //   const [folder, setFolder] = useState<object[]>();
  //   const [vmApi, setVmApi] = useState<object[]>();

  const onRightClick = (value: any) => {
    setKeyRightClick(value.node.key);
    setNameRightClick(value.node.title);
  };
  const onExpand = (value: React.Key[], info: any) => {
    if (setOnExpand != null) setOnExpand(value);
    setKeyExpanded(value);
    setInfoExpanded(info);
  };
  const onCheck = (value: any) => {
    setKeyExpanded(value);
  };
  const updateTreeDrop = (info: any) => {
    setTreeData(info);
  };
  const handleCancel = () => setIsModalCloneOpen(false);
  const handleOk = (value: string) => {
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
  };
  const value = {
    vmKey,
    treeData,
    keyExpanded,
    checkedKeys,
    loadedKeys,
    keyRightClick,
    nameRightClick,
    isModalCloneOpen,
    isModalRenameOpen,
    isModalGetfileOpen,
    isModalProcessOpen,
    isModalCopyfileOpen,
    isModalUserLoginOpen,
    onRightClick,
    onExpand,
    onCheck,
    updateTreeDrop,
    handleOk,
    handleCancel,
  };

  return <InforContext.Provider value={value}>{props.children}</InforContext.Provider>;
};
export const useSidebar = (): ISidebarContext => useContext(InforContext);
