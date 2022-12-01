/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react';
import {
  FolderOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
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
  const object = props.inforSelect;
  const title = props.inforSelect?.title;
  const key = props.inforSelect?.key;
  const totalChildren = props.inforSelect?.children?.length;
  const children = props.inforSelect?.children;
  const isSelected = props.inforSelect?.selected;
  const vmPowerState = props.vmPowerState;
  console.log('title', title);
  console.log('key', key);
  console.log('totalChildren', totalChildren);
  console.log('children', children);
  console.log('object', object);

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
      console.log('vmPowerState', vmPowerState);

      if (vmPowerState?.length > 0) {
        const powerState = vmPowerState[0].power_state;

        if (powerState === 'start' || powerState === 'POWERED_ON')
          return (
            <div style={styles}>
              <PlayCircleOutlined style={{ marginRight: '10px' }} />
              <div>Power On</div>
            </div>
          );
      }
    }

    // if (key?.length >= 4) {
    //   const powerState = vms.filter((item: any) => item.vm === key);
    //   const state = powerState[0]?.power_state;
    //   console.log('power state', powerState[0]?.power_state);
    //   if (state === 'POWER_ON')

    //   if (state === 'POWER_SUSPEND')
    //     return (
    //       <div style={styles}>
    //         <PauseOutlined style={{ marginRight: '10px' }} />
    //         <div>Power Suspend</div>
    //       </div>
    //     );
    //   if (state === 'POWER_RESET')
    //     return (
    //       <div style={styles}>
    //         <SyncOutlined style={{ marginRight: '10px' }} />
    //         <div>Power Reset</div>
    //       </div>
    //     );
    //   return (
    //     <div style={styles}>
    //       <div>Power off</div>
    //     </div>
    //   );

    return (
      <h3 style={{ padding: '20px' }}>
        Chose something or expand to know more information
      </h3>
    );
  };
  return <RenderUI />;
};

export default Content;
