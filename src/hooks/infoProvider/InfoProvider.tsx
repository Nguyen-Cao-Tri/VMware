import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface IInfoContext {
  inforSelect?: any;
  keyExpand?: any;
  vmPowerState?: any;
  vm?: any;
  children?: object;
  vmNetwork?: any;
  vmTools?: any;
  curentTheme?: string;
  parentId?: string[];
  handleTheme?: (value: string) => void;
  setOnSelect?: (value: any) => void;
  setOnExpand?: (value: any) => void;
  setVmPowerStates?: (value: object) => void;
  setChildrens?: (value: object[]) => void;
  setVms?: (value: object) => void;
  setNetwork?: (value: object) => void;
  setTool?: (value: object) => void;
  setParentKey?: (value: string[]) => void;
}

export const InforContext = createContext<IInfoContext>({
  inforSelect: {},
  keyExpand: {},
  children: [{}],
  vmTools: [{}],
  vm: [{}],
  vmNetwork: [{}],
  vmPowerState: [],
  curentTheme: '',
  parentId: [''],
  handleTheme: () => {},
  setOnSelect: () => {},
  setOnExpand: () => {},
  setVmPowerStates: () => {},
  setChildrens: () => {},
  setVms: () => {},
  setNetwork: () => {},
  setTool: () => {},
  setParentKey: () => {},
});

export const InfoProvider = (props: PropsWithChildren<IInfoContext>) => {
  const [inforSelect, setInforSelect] = useState<any>({});
  const [keyExpand, setKeyExpand] = useState<any>([]);
  const [vmPowerState, setVmPowerState] = useState<object[]>([]);
  const [vm, setVm] = useState<object[]>([]);
  const [parentId, setParentId] = useState<string[]>([]);
  console.log('vmm', vm);

  const [children, setChildren] = useState<object[]>([]);
  const [vmNetwork, setVmNetwork] = useState<object[]>([]);
  const [vmTools, setVmTools] = useState<object[]>([]);
  const [curentTheme, setCurrentTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');

  const handleTheme = (value: string) => {
    setCurrentTheme(value);
  };
  const setOnSelect = (value: any) => {
    setInforSelect(value);
    console.log('aaa', value);
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
  const setNetwork = (value: any) => {
    setVmNetwork(prev => [...prev, value]);
  };
  const setTool = (value: any) => {
    setVmTools(prev => [...prev, value]);
  };
  const setParentKey = (value: string[]) => {
    setParentId(value);
  };
  const value = {
    parentId,
    inforSelect,
    keyExpand,
    vmTools,
    vmNetwork,
    vm,
    vmPowerState,
    children,
    curentTheme,
    handleTheme,
    setOnSelect,
    setOnExpand,
    setVmPowerStates,
    setChildrens,
    setVms,
    setNetwork,
    setParentKey,
    setTool,
  };
  return <InforContext.Provider value={value}>{props.children} </InforContext.Provider>;
};
export const useInfo = (): IInfoContext => useContext(InforContext);
