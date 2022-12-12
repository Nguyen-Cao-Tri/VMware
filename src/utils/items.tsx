import React from 'react';
import {
  PoweroffOutlined,
  ReloadOutlined,
  UserOutlined,
  FileTextOutlined,
  CopyOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export const items = (vm: object[], keyRightClick: string): ItemType[] => {
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
      type: 'divider',
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
          icon: <PlayCircleOutlined />,
          disabled:
            powerState === 'start' ||
            powerState === 'POWERED_ON' ||
            powerState === 'reset',
        },
        {
          label: 'Power Off',
          icon: <StopOutlined />,
          key: 'stop',
          disabled: powerState === 'stop' || powerState === 'POWERED_OFF',
        },
        {
          label: 'Suspend',
          key: 'suspend',
          icon: <PauseCircleOutlined />,
          disabled:
            powerState === 'suspend' ||
            powerState === 'POWERED_OFF' ||
            powerState === 'stop',
        },
        {
          label: 'Reset',
          key: 'reset',
          icon: <RedoOutlined />,
          disabled:
            powerState === 'reset' ||
            powerState === 'POWERED_OFF' ||
            powerState === 'stop' ||
            powerState === 'suspend' ||
            powerState === 'SUSPEND',
        },
      ],
    },
    {
      label: 'Set user login',
      key: 'login',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      label: 'File',
      key: 'file',
      icon: <FileTextOutlined />,
      children: [
        {
          label: 'Get file from guest',
          key: 'getfile',
          icon: <UploadOutlined />,
          disabled: isDisable,
        },
        {
          label: 'Copy file to guest',
          icon: <CopyOutlined />,
          key: 'copyfile',
          disabled: isDisable,
        },
      ],
    },
    {
      type: 'divider',
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
