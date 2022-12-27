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
  handleTheme?: (value: string) => void;
  onSelect?: (value: any) => void;
  onExpand?: (value: any) => void;
  VmPowerState?: (value: object) => void;
  Children?: (value: object[]) => void;
  Vm?: (value: object) => void;
  network?: (value: object) => void;
  tool?: (value: object) => void;
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
  handleTheme: () => {},
  onSelect: () => {},
  onExpand: () => {},
  VmPowerState: () => {},
  Children: () => {},
  Vm: () => {},
  network: () => {},
  tool: () => {},
});

export const InfoProvider = (props: PropsWithChildren<IInfoContext>) => {
  const [inforSelect, setInforSelect] = useState<any>({});
  const [keyExpand, setKeyExpand] = useState<any>([]);
  const [vmPowerState, setVmPowerState] = useState<object[]>([]);
  const [vm, setVm] = useState<object[]>([]);
  console.log('vmm', vm);

  const [children, setChildren] = useState<object[]>([]);
  const [vmNetwork, setVmNetwork] = useState<object[]>([]);
  const [vmTools, setVmTools] = useState<object[]>([]);
  const [curentTheme, setCurrentTheme] = useState<string>(localStorage.getItem('theme') ?? 'dark');

  const handleTheme = (value: string) => {
    setCurrentTheme(value);
  };
  const onSelect = (value: any) => {
    setInforSelect(value);
    console.log('aaa', value);
  };
  const onExpand = (value: any) => {
    setKeyExpand(value);
  };
  const VmPowerState = (value: any) => {
    setVmPowerState(value);
  };
  const Children = (value: object[]) => {
    setChildren(value);
  };
  const Vm = (value: any) => {
    setVm(prev => [...prev, value]);
  };
  const network = (value: any) => {
    setVmNetwork(prev => [...prev, value]);
  };
  const tool = (value: any) => {
    setVmTools(prev => [...prev, value]);
  };

  const value = {
    inforSelect,
    keyExpand,
    vmTools,
    vmNetwork,
    vm,
    vmPowerState,
    children,
    curentTheme,
    handleTheme,
    onSelect,
    onExpand,
    VmPowerState,
    Children,
    Vm,
    network,
    tool,
  };
  return <InforContext.Provider value={value}>{props.children} </InforContext.Provider>;
};
export const useInfo = (): IInfoContext => useContext(InforContext);
// import React from 'react';

// const InfoProvider = () => {
//   return <div>InfoProvider</div>;
// };

// export default InfoProvider;
