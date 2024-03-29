import React, { useState } from 'react';
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
  DesktopOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FaEdit } from 'react-icons/fa';
import PowerOn from './customIconStart/PowerOn';
import { vcenterAPI } from 'api/vcenterAPI';

export const items = (keyRightClick: string, title: string): ItemType[] => {
  const [powerState, setPowerState] = useState<string>('');

  void vcenterAPI.getPower(keyRightClick).then(powerState => setPowerState(powerState.state));

  const iconRightclick = () => {
    if (keyRightClick.includes('datacenter')) return <DatabaseOutlined />;
    if (keyRightClick.includes('group')) return <FolderOutlined />;
    if (keyRightClick.includes('vm')) return <LaptopOutlined />;
  };
  const isDisable = keyRightClick.includes('datacenter') || keyRightClick.includes('group');
  return [
    {
      label: `Action - ${title} `,
      key: 'action',
      icon: powerState === 'POWERED_ON' ? <PowerOn /> : iconRightclick(),
    },
    {
      label: 'Rename...',
      key: 'rename',
      icon: <UserOutlined className="icon_items" />,
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
          disabled: powerState === 'POWERED_ON' || powerState === 'RESET',
        },
        {
          label: 'Power Off',
          icon: <StopOutlined />,
          key: 'stop',
          disabled: powerState === 'POWERED_OFF',
        },
        {
          label: 'Suspend',
          key: 'suspend',
          icon: <PauseCircleOutlined />,
          disabled: powerState === 'SUSPEND' || powerState === 'POWERED_OFF',
        },
        {
          label: 'Reset',
          key: 'reset',
          icon: <RedoOutlined />,
          disabled:
            powerState === 'RESET' ||
            powerState === 'POWERED_OFF' ||
            powerState === 'POWERED_ON' ||
            powerState === 'SUSPEND',
        },
      ],
    },
    {
      label: 'Guest OS',
      key: 'guestos',
      icon: <UserOutlined style={{ opacity: '0' }} />,
      disabled: true,
    },
    {
      label: 'Snapshots',
      key: 'snap',
      icon: <UserOutlined style={{ opacity: '0' }} />,
      disabled: true,
    },
    {
      label: 'Open Remote Console',
      key: 'remote',
      icon: <DesktopOutlined style={{ opacity: '0' }} />,
      disabled: true,
    },
    {
      type: 'divider',
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
      icon: <CopyOutlined style={{ opacity: '0' }} />,
      disabled: isDisable || powerState === 'start' || powerState === 'POWERED_ON',
    },

    {
      label: 'Run process',
      key: 'process',
      icon: <CopyOutlined style={{ opacity: '0' }} />,
      disabled: isDisable,
    },
    {
      type: 'divider',
    },
    {
      label: 'Edit Settings',
      key: 'edit',
      icon: <FaEdit />,
      disabled: true,
    },
  ];
};
