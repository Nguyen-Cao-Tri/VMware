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
  arrayFormatTreeData?: object[];
  handleTheme?: (value: string) => void;
  setOnSelect?: (value: any) => void;
  setOnExpand?: (value: any) => void;
  setVmPowerStates?: (value: object) => void;
  setChildrens?: (value: object[]) => void;
  setVms?: (value: object) => void;
  setNetwork?: (value: object) => void;
  setTool?: (value: object) => void;
  setParentKey?: (value: string[]) => void;
  setArrayTreeData?: (value: any) => void;
}
