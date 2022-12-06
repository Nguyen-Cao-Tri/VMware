import React from 'react';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';

export const items = (vm: object[], keyRightClick: string) => {
  const vmItem: any = vm.filter((itemVm: any) => itemVm.vm === keyRightClick);
  const powerState = vmItem[0]?.power_state;
  const isDisable =
    keyRightClick.includes('datacenter') || keyRightClick.includes('group');
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
          key: 'start',
          disabled:
            powerState === 'start' ||
            powerState === 'POWERED_ON' ||
            powerState === 'reset',
        },
        {
          label: 'Power Off',
          key: 'stop',
          disabled: powerState === 'stop' || powerState === 'POWERED_OFF',
        },
        {
          label: 'Suspend',
          key: 'suspend',
          disabled:
            powerState === 'suspend' ||
            powerState === 'POWERED_OFF' ||
            powerState === 'stop',
        },
        {
          label: 'Reset',
          key: 'reset',
          disabled:
            powerState === 'reset' ||
            powerState === 'POWERED_OFF' ||
            powerState === 'stop',
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
      disabled: isDisable,
    },
    {
      label: 'Copy file to guest',
      key: 'copyfile',
      disabled: isDisable,
    },
    {
      label: 'Clone',
      key: 'clone',
      disabled:
        isDisable || powerState === 'start' || powerState === 'POWERED_ON',
    },
    {
      label: 'Run process',
      key: 'process',
      disabled: isDisable,
    },
  ];
};
