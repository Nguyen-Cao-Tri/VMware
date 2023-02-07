/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { PlayCircleOutlined, SyncOutlined, PauseOutlined } from '@ant-design/icons';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useSearchParams } from 'react-router-dom';
import RenderSummaryVm from './RenderSummaryVm';
import RenderInforVm from './RenderInforVm';
import './renderUI.scss';

const RenderUI = ({ prop }: any) => {
  const { inforSelect, vmPowerState, setVmPowerStates } = useInfo();
  const [searchParams] = useSearchParams();
  const powerState = vmPowerState.powerState.state;
  // useEffect(() => {
  //   console.log('keySelect', prop?.keySelect);
  //   void vcenterAPI.getPower(prop?.keySelect).then(powerState => {
  //     if (setVmPowerStates) setVmPowerStates(powerState?.state);
  //     console.log('powerState 1', powerState.state);
  //   });
  // }, [prop?.keySelect]);

  // const vmPowerStates = vmPowerState?.filter((item: any) => item.vm === key);
  const setOnSelectStorage: any = localStorage.getItem('setOnSelect');
  const inforSelectStorage = JSON.parse(setOnSelectStorage);
  if (Object.getOwnPropertyNames(inforSelect).length === 0) {
    inforSelect.title = inforSelectStorage.title;
    inforSelect.key = inforSelectStorage.key;
  }

  if (powerState === 'POWERED_ON')
    return (
      <>
        <div className="guest_OS">
          <div className="header_guestOs">
            <span>Guest OS</span>
            <span className="iconSum">
              <RxDragHandleDots2 />
            </span>
          </div>
          <div className="content_guestOs">
            <div className="vm">
              <div className="border">
                <PlayCircleOutlined style={{ marginRight: '10px' }} />
                <div>Power On</div>
              </div>
              <div style={{ marginTop: 20, color: '#4EADCC', textAlign: 'center' }}>LAUNCH WEB CONSOLE</div>
            </div>

            <RenderInforVm />
          </div>
        </div>
        <RenderSummaryVm />
      </>
    );
  if (vmPowerState === 'POWERED_OFF')
    return (
      <>
        <div className="vm">
          <div className="border">
            <PlayCircleOutlined style={{ marginRight: '10px' }} />
            <div>Power Off</div>
          </div>
        </div>
        <RenderInforVm />
        <RenderSummaryVm />
      </>
    );
  if (vmPowerState === 'SUSPENDED')
    return (
      <>
        <div className="vm">
          <div className="border">
            <PauseOutlined style={{ marginRight: '10px' }} />
            <div>Power Suspend</div>
          </div>
        </div>
        <RenderInforVm />
        <RenderSummaryVm />
      </>
    );
  if (vmPowerState === 'reset')
    return (
      <>
        <div className="vm">
          <div className="border">
            <SyncOutlined style={{ marginRight: '10px' }} />
            <div>Power Reset</div>
          </div>
        </div>

        <RenderInforVm />
        <RenderSummaryVm />
      </>
    );

  return <></>;
};

export default RenderUI;
