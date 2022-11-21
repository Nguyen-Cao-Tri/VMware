/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react';
import {
  PlayCircleOutlined,
  PauseOutlined,
  SyncOutlined,
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
  const title = props.infors?.node.title;
  const key = props.infors?.node.key;
  const vms = props.vm;
  console.log('title', title);
  console.log('key content', key);
  console.log('vm content', vms);

  const sumChildren = vms?.filter((item: any) =>
    item.vm?.includes(props.infors?.node.key)
  );
  const RenderUI = () => {
    if (title?.includes('Datacenter')) {
      return (
        <>
          <h3 style={{ padding: '20px' }}>{title}</h3>
        </>
      );
    }
    if (title?.includes('Folder')) {
      return (
        <div style={{ padding: '20px' }}>
          <h3>{title}</h3>
          <div> Virtual Machines: {sumChildren.length}</div>
        </div>
      );
    }
    if (title?.includes('VM')) {
      const powerState = vms.filter((item: any) => item.vm === key);
      const state = powerState[0].power_state;
      console.log('power state', powerState[0].power_state);
      if (state === 'POWER_ON')
        return (
          <div style={styles}>
            <PlayCircleOutlined style={{ marginRight: '10px' }} />
            <div>Power On</div>
          </div>
        );
      if (state === 'POWER_SUSPEND')
        return (
          <div style={styles}>
            <PauseOutlined style={{ marginRight: '10px' }} />
            <div>Power Suspend</div>
          </div>
        );
      if (state === 'POWER_RESET')
        return (
          <div style={styles}>
            <SyncOutlined style={{ marginRight: '10px' }} />
            <div>Power Reset</div>
          </div>
        );
      return (
        <div style={styles}>
          <div>Power off</div>
        </div>
      );
    }
    return (
      <h3 style={{ padding: '20px' }}>
        Chose Datacenter to know more information
      </h3>
    );
  };
  return <RenderUI />;
};

export default Content;
