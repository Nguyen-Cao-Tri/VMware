export const listDatacenter = [
  {
    datacenter: 'datacenter-3',
    name: 'ABC',
  },
];

export const listFolder = [
  {
    folder: 'group-v22',
    name: 'Demo Virtual Machine',
    type: 'VIRTUAL_MACHINE',
    parentId: 'datacenter-3',
  },
  {
    folder: 'group-v23',
    name: 'Windows VM',
    type: 'VIRTUAL_MACHINE',
    parentFolder: 'group-v22',
  },
  {
    folder: 'group-v24',
    name: 'Linux VM',
    type: 'VIRTUAL_MACHINE',
    parentFolder: 'group-v22',
  },
  {
    folder: 'group-v4',
    name: 'vm',
    type: 'VIRTUAL_MACHINE',
  },
];
export const folderChildrenDatacenter = [
  {
    folder: 'group-v4',
    name: 'vm',
    type: 'VIRTUAL_MACHINE',
  },
];
export const listVM = [
  {
    memory_size_MiB: 8192,
    vm: 'vm-17',
    name: 'Windows 11',
    power_state: 'POWERED_OFF',
    cpu_count: 4,
  },
  {
    memory_size_MiB: 4096,
    vm: 'vm-35',
    name: 'Ubuntu',
    power_state: 'POWERED_ON',
    cpu_count: 2,
  },
];
