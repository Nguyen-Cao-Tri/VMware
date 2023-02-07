export interface IDatacenter {
  name: string;
  datacenter: string;
}
export interface IFolder {
  folder: string;
  name: string;
  type: string;
}
export interface IVm {
  memory_size_MiB: number;
  vm: string;
  name: string;
  power_state: string;
  cpu_count: number;
}
export interface IGetPower {
  clean_power_off: boolean;
  state: string;
}
interface IFullName {
  args: any[];
  default_message: string;
  id: string;
}
export interface IGuest {
  full_name: IFullName;
  name: string;
  ip_address: string;
  family: string;
  host_name: string;
}
export interface ITools {
  auto_update_supported: boolean;
  upgrade_policy: string;
  install_attempt_count: number;
  version_status: string;
  version_number: number;
  run_state: string;
  version: string;
  install_type: string;
}
interface IIpAddress {
  ip_address: string;
  prefix_length: string;
  state: string;
}
interface IIp {
  ip_addresses: IIpAddress[];
}
export interface INetwork {
  mac_address: string;
  ip: IIp;
  nic: string;
}
export interface IMemory {
  hot_add_increment_size_MiB: number;
  size_MiB: number;
  hot_add_enabled: boolean;
  hot_add_limit_MiB: number;
}
export interface ICpu {
  hot_remove_enabled: boolean;
  count: number;
  hot_add_enabled: boolean;
  cores_per_socket: number;
}
