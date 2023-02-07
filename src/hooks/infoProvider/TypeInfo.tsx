// export interface IInfoContext {
//   inforSelect?: any;
//   keyExpand?: any;
//   vmPowerState?: any;
//   vm?: any;
//   children?: object;
//   vmNetwork?: any;
//   vmTools?: any;
//   curentTheme?: string;
//   parentId?: string[];
//   arrayFormatTreeData?: object[];
//   handleTheme?: (value: string) => void;
//   setOnSelect?: (value: any) => void;
//   setOnExpand?: (value: any) => void;
//   setVmPowerStates?: (value: object) => void;
//   setChildrens?: (value: object[]) => void;
//   setVms?: (value: object) => void;
//   setNetwork?: (value: object) => void;
//   setTool?: (value: object) => void;
//   setParentKey?: (value: string[]) => void;
//   setArrayTreeData?: (value: any) => void;
// }
import { ICpu, IGuest, IMemory, INetwork, ITools } from 'api/TypeAPI';
export interface IInfoContext {
  inforSelect?: any;
  keyExpand?: any;
  vmPowerState?: any;
  vm?: any;
  children?: object;
  vmNetwork?: INetwork[];
  vmTools?: ITools;
  curentTheme?: string;
  parentId?: string[];

  nameRightClick?: string;
  alternativeTreeData?: any;
  keyDatacenter?: string;
  keyRightClick?: string;
  loadedKeys?: string[];
  keySelect?: any;
  treeData?: any;
  checkedKeys?: any;
  vmKey?: object[];
  isModal?: IModal;
  guest?: IGuest;
  memoryVm?: IMemory;
  cpuVm?: ICpu;
  arrayFormatTreeData?: object[];

  handleTheme?: (value: string) => void;
  setOnSelect?: (value: any) => void;
  setOnExpand?: (value: any) => void;
  setVmPowerStates?: (value: any) => void;
  setChildrens?: (value: object[]) => void;
  setVms?: (value: object) => void;
  setTool?: (value: ITools) => void;
  setGuestOS?: (value: IGuest) => void;
  setNetwork?: (value: INetwork[]) => void;
  setParentKey?: (value: string[]) => void;

  setAlternative?: (value: any) => void;
  setNameClick?: (value: string) => void;
  setKeyDatacenters?: (value: string) => void;
  setKeyClick?: (value: string) => void;
  setLoadedKey?: (value: string[]) => void;
  setKeySelected?: (value: any) => void;
  setDatacenters?: (value: object[]) => void;
  setCheckedKey?: (value: any) => void;
  setTreeDatas?: (value: any) => void;
  setVmKeys?: (value: object[]) => void;
  setIsModal?: (value: IModal) => void;
  setArrayTreeData?: (value: object[]) => void;
  setMemory?: (value: IMemory) => void;
  setCpu?: (value: ICpu) => void;

  // handlePowerState?: (value: IPower) => void;
}
export interface IModal {
  UserLoginOpen?: boolean;
  CopyfileOpen?: boolean;
  GetfileOpen?: boolean;
  ProcessOpen?: boolean;
  RenameOpen?: boolean;
  CloneOpen?: boolean;
}
export interface DataNode {
  title: string;
  key: string;
  children?: DataNode[];
  isLeaf?: boolean;
  username?: string;
  password?: string;
}
