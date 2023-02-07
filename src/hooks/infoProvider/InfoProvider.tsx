/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICpu, IGuest, IMemory, INetwork, ITools } from 'api/TypeAPI';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DataNode, IInfoContext, IModal } from './TypeInfo';

export const InforContext = createContext<IInfoContext>({
  inforSelect: {},
  keyExpand: {},
  children: [{}],
  vm: [{}],
  vmPowerState: [],
  curentTheme: '',
  parentId: [''],
  vmNetwork: [],
  alternativeTreeData: [],
  nameRightClick: '',
  keyDatacenter: '',
  keyRightClick: '',
  loadedKeys: [''],
  keySelect: {},
  treeData: [],
  checkedKeys: {},
  vmKey: [{}],
  isModal: {
    UserLoginOpen: false,
    CopyfileOpen: false,
    GetfileOpen: false,
    ProcessOpen: false,
    RenameOpen: false,
    CloneOpen: false,
  },

  setOnSelect: () => {},
  handleTheme: () => {},
  setOnExpand: () => {},
  setVmPowerStates: () => {},
  setChildrens: () => {},
  setVms: () => {},
  setNetwork: () => {},
  setTool: () => {},
  setParentKey: () => {},

  setAlternative: () => {},
  setNameClick: () => {},
  setKeyDatacenters: () => {},
  setKeyClick: () => {},
  setLoadedKey: () => {},
  setKeySelected: () => {},
  setDatacenters: () => {},
  setTreeDatas: () => {},
  setVmKeys: () => {},
  setCheckedKey: () => {},
  setIsModal: () => {},
  setArrayTreeData: () => {},
  setGuestOS: () => {},
});

export const InfoProvider = (props: PropsWithChildren<IInfoContext>) => {
  const [isModal, setIsModal] = useState<IModal>({
    UserLoginOpen: false,
    CopyfileOpen: false,
    GetfileOpen: false,
    ProcessOpen: false,
    RenameOpen: false,
    CloneOpen: false,
  });
  const [inforSelect, setInforSelect] = useState<any>({});
  const [vmPowerState, setVmPowerState] = useState();
  const [vm, setVm] = useState<object[]>([]);
  const [keyExpand, setKeyExpand] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string[]>([]);
  const [children, setChildren] = useState<object[]>([]);
  const [vmNetwork, setVmNetwork] = useState<INetwork[]>([]);
  const [vmTools, setVmTools] = useState<ITools>();
  const [curentTheme, setCurrentTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');
  const [alternativeTreeData, setAlternativeTreeData] = useState<DataNode[]>([]);
  const [nameRightClick, setNameRightClick] = useState<string>('');
  const [keyDatacenter, setKeyDatacenter] = useState<string>('');
  const [keyRightClick, setKeyRightClick] = useState<string>('');
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [keySelect, setKeySelect] = useState<React.Key[]>();
  const [datacenter, setDatacenter] = useState<object[]>();
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [vmKey, setVmKey] = useState<object[]>([]);
  const [arrayFormatTreeData, setArrayFormatTreeData] = useState<object[]>([]);
  const [guest, setGuest] = useState<IGuest>();
  const [memoryVm, setMemoryVm] = useState<IMemory>();
  const [cpuVm, setCpuVm] = useState<ICpu>();
  const [inforLogin, setInforLogin] = useState<string[]>([]);
  const setInforLoginModal = (value: string[]) => {
    setInforLogin(value);
  };
  const handleTheme = (value: string) => {
    setCurrentTheme(value);
  };
  const setOnSelect = (value: any) => {
    setInforSelect(value);
  };
  const setOnExpand = (value: any) => {
    setKeyExpand(value);
  };
  const setVmPowerStates = (value: any) => {
    setVmPowerState(value);
  };
  const setChildrens = (value: object[]) => {
    setChildren(value);
  };
  const setVms = (value: any) => {
    setVm(prev => [...prev, value]);
  };
  const setNetwork = (value: INetwork[]) => {
    setVmNetwork(value);
  };
  const setTool = (value: ITools) => {
    setVmTools(value);
  };
  const setParentKey = (value: string[]) => {
    setParentId(value);
  };
  const setAlternative = (value: DataNode[]) => {
    setAlternativeTreeData(value);
  };
  const setNameClick = (value: string) => {
    setNameRightClick(value);
  };
  const setKeyDatacenters = (value: string) => {
    setKeyDatacenter(value);
  };
  const setKeyClick = (value: string) => {
    setKeyRightClick(value);
  };
  const setLoadedKey = (value: string[]) => {
    setLoadedKeys(value);
  };
  const setKeySelected = (value: any) => {
    setKeySelect(value);
  };
  const setDatacenters = (value: object[]) => {
    setDatacenter(value);
  };
  const setTreeDatas = (value: any) => {
    setTreeData(value);
  };
  const setCheckedKey = (value: any) => {
    setCheckedKeys(value);
  };
  const setVmKeys = (value: any) => {
    setVmKey(value);
  };
  const setArrayTreeData = (value: object[]) => {
    setArrayFormatTreeData(value);
  };
  const setGuestOS = (value: IGuest) => {
    setGuest(value);
  };
  const setMemory = (value: IMemory) => {
    setMemoryVm(value);
  };
  const setCpu = (value: ICpu) => {
    setCpuVm(value);
  };

  const value = {
    vm,
    cpuVm,
    guest,
    vmKey,
    vmTools,
    isModal,
    memoryVm,
    treeData,
    children,
    parentId,
    keySelect,
    vmNetwork,
    keyExpand,
    loadedKeys,
    checkedKeys,
    inforSelect,
    curentTheme,
    vmPowerState,
    keyDatacenter,
    keyRightClick,
    nameRightClick,
    alternativeTreeData,
    arrayFormatTreeData,

    setVms,
    setTool,
    setVmKeys,
    setGuestOS,
    setIsModal,
    setNetwork,
    setKeyClick,
    handleTheme,
    setOnSelect,
    setOnExpand,
    setChildrens,
    setNameClick,
    setLoadedKey,
    setParentKey,
    setTreeDatas,
    setCheckedKey,
    setKeySelected,
    setDatacenters,
    setAlternative,
    setVmPowerStates,
    setKeyDatacenters,
    // handlePowerState,
    setArrayTreeData,
    setMemory,
    setCpu,
  };
  return <InforContext.Provider value={value}>{props.children} </InforContext.Provider>;
};
export const useInfo = (): IInfoContext => useContext(InforContext);
