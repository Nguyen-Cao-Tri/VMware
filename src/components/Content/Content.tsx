/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react';
import './content.scss';
import {
  FolderOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
  SyncOutlined,
  PauseOutlined,
} from '@ant-design/icons';
const styles = {
  height: '100px',
  width: '200px',
  border: '2px solid',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px',
};

const Content = (props: any) => {
  const title = props.inforSelect?.title;
  const key = props.inforSelect?.key;
  const totalChildren = props.inforSelect?.children?.length;
  const children = props.inforSelect?.children;
  const vmPowerState = props.vmPowerState?.filter(
    (item: any) => item.vm === key,
  );
  console.log('propVm', props.vmData);

  const RenderUI = () => {
    if (key?.includes('datacenter')) {
      return (
        <div style={{ padding: '20px' }}>
          <h3>Datacenter name: {title}</h3>
          <h4>Expand to know more information</h4>
        </div>
      );
    }
    if (key?.includes('group')) {
      const totalFolder = children?.filter(
        (itemFolder: any) =>
          itemFolder.folder?.includes('group') ||
          itemFolder.key?.includes('group'),
      );
      const totalVm = children?.filter(
        (itemVm: any) =>
          itemVm.vm?.includes('vm') || itemVm.key?.includes('vm'),
      );
      return (
        <div style={{ padding: '20px' }}>
          <h3>Folder name: {title}</h3>
          {totalChildren >= 0 ? (
            <>
              <h4>
                <LaptopOutlined />: {totalFolder.length}
              </h4>
              <h4>
                <FolderOutlined />: {totalVm.length}
              </h4>
            </>
          ) : (
            <h4>Expand to know more information</h4>
          )}
        </div>
      );
    }
    if (key?.includes('vm')) {
      const arrayInfoVm = props.vmData.filter((item: any) => item.idVm === key);
      const infoVm = arrayInfoVm[0].infor;
      const arrayVmTools = props.tool.filter((item: any) => item.idVm === key);
      const vmTool = arrayVmTools[0].tool;
      const arrayVmNetwork = props.network.filter(
        (item: any) => item.idVm === key,
      );
      const vmNetwork = arrayVmNetwork[0].network;
      if (vmPowerState?.length > 0) {
        const powerState = vmPowerState[0].power_state;

        if (powerState === 'start' || powerState === 'POWERED_ON')
          return (
            <>
              <div style={styles}>
                <PlayCircleOutlined style={{ marginRight: '10px' }} />
                <div>Power On</div>
              </div>
              <h1>Information </h1>
              <div>Name: {infoVm.name}</div>
              <div>Guest OS: {infoVm.guest_OS}</div>
              <div>Compatibility: ESXi 7.0 U2 and later (VM version 19)</div>
              <div>
                VMware Tools:{' '}
                {vmTool.run_state === 'NOT_RUNNING' ? `Not running` : `Running`}
                , version:
                {vmTool.version_number} (Current)
              </div>
              <div>DNS Name: {vmNetwork.dns_values.host_name}</div>
              <div style={{ display: 'flex' }}>
                IP Addresses:{' '}
                <div>
                  {vmNetwork.dns.ip_addresses.length > 1 ? (
                    vmNetwork.dns.ip_addresses.map((item: any) => (
                      <div>{item}</div>
                    ))
                  ) : (
                    <div>{vmNetwork.dns.ip_addresses[0]}</div>
                  )}
                </div>
              </div>

              <div>CPU: {infoVm.cpu.count}</div>
              <div>MEMORY: {infoVm.memory.size_MiB} MB</div>
            </>
          );
        if (powerState === 'stop' || powerState === 'POWERED_OFF')
          return (
            <div style={styles}>
              <PlayCircleOutlined style={{ marginRight: '10px' }} />
              <div>Power Off</div>
            </div>
          );
        if (powerState === 'suspend' || powerState === 'SUSPENDED')
          return (
            <div style={styles}>
              <PauseOutlined style={{ marginRight: '10px' }} />
              <div>Power Suspend</div>
            </div>
          );
        if (powerState === 'reset')
          return (
            <div style={styles}>
              <SyncOutlined style={{ marginRight: '10px' }} />
              <div>Power Reset</div>
            </div>
          );
      }
    }
    return (
      <div className="bg">
        <h3 style={{ padding: '20px' }}>
          Chose something or expand to know more information
        </h3>
      </div>
    );
  };
  return <RenderUI />;
};

export default Content;
