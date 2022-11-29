import React from 'react';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';

export const items = (vm: object[], keyRightClick: string) => {
  const vmItem: any = vm.filter((itemVm: any) => itemVm.vm === keyRightClick);
  const powerState = vmItem[0]?.power_state;
  console.log('vm', vm);

  console.log('power state', powerState);

  return [
    {
      label: 'Rename...',
      key: 'rename',
    },
    {
      label: 'Refresh',
      key: 'refresh',
      icon: <ReloadOutlined />,
    },
    {
      label: 'Power',
      key: 'power',
      icon: <PoweroffOutlined />,
      children: [
        {
          label: 'Power On',
          key: 'powerOn',
          disabled: powerState === 'start' || powerState === 'POWERED_ON',
        },
        {
          label: 'Power Off',
          key: 'powerOff',
          disabled: powerState === 'stop' || powerState === 'POWERED_OFF',
        },
        {
          label: 'Suspend',
          key: 'powerSuspend',
          disabled: powerState === 'suspend' || powerState === 'POWERED_OFF',
        },
        {
          label: 'Reset',
          key: 'powerReset',
          disabled: powerState === 'reset' || powerState === 'POWERED_OFF',
        },
      ],
    },
    {
      label: 'Set user login',
      key: 'login',
    },
    {
      label: 'Get file from guest',
      key: 'getfile',
    },
    {
      label: 'Copy file to guest',
      key: 'copyfile',
    },
    {
      label: 'Clone',
      key: 'clone',
    },
  ];
};
