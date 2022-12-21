/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { InformationContext } from '../../../../layouts/DefaultLayout/DefaultLayout';
import {
  FaChalkboard,
  FaDigitalTachograph,
  FaMemory,
  FaMicrochip,
  FaNetworkWired,
  FaRegWindowMaximize,
} from 'react-icons/fa';
import { PlayCircleOutlined, SyncOutlined, PauseOutlined, WindowsOutlined, QqOutlined } from '@ant-design/icons';
import { MdOutlineDns } from 'react-icons/md';
import './renderUI.scss';

const RenderUI = () => {
  const inforContext: any = useContext(InformationContext);
  const key = inforContext?.inforSelect.key;
  const vmTool = inforContext?.vmTools;
  const vmNetwork = inforContext?.vmNetwork;
  const infoVm = inforContext?.vm;
  const arrayVmPowerState = inforContext?.vmPowerState;
  const vmPowerState = arrayVmPowerState?.filter((item: any) => item.vm === key);
  // const isStop = () => {
  //   if (vmPowerState.length > 0) {
  //     return (
  //       vmPowerState[0].power_state === 'stop' ||
  //       vmPowerState[0].power_state === 'POWERED_OFF'
  //     );
  //   }
  // };
  const isStart = () => {
    if (vmPowerState.length > 0) {
      return vmPowerState[0].power_state === 'start' || vmPowerState[0].power_state === 'POWERED_ON';
    }
  };

  const RenderInforVm = () => {
    return (
      <div className="infoVm">
        <table>
          <tbody>
            <tr>
              <td>
                <FaChalkboard className="iconSumary" />
                Guest OS:
              </td>
              <td> {infoVm.guest_OS}</td>
            </tr>
            <tr>
              <td>
                <FaDigitalTachograph className="iconSumary" />
                Compatibility:
              </td>
              <td> ESXi 7.0 U2 and later (VM version 19)</td>
            </tr>
            <tr>
              <td>
                <FaRegWindowMaximize className="iconSumary" />
                VMware Tools:
              </td>
              <td>
                {vmTool.run_state === 'NOT_RUNNING' ? `Not running` : `Running`}, version:
                {vmTool.version_number} (Current)
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineDns className="iconSumary" />
                DNS Name:
              </td>
              <td> {vmNetwork?.dns_values?.host_name}</td>
            </tr>
            <tr>
              <td style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0 }}>
                  <FaNetworkWired className="iconSumary" />
                  IP Addresses:
                </div>
              </td>
              <td>
                {Boolean(vmNetwork?.dns?.ip_addresses) &&
                  vmNetwork?.dns?.ip_addresses?.map((item: any, index: any) => <div key={index}>{item}</div>)}
              </td>
            </tr>
            <tr>
              <td style={{ position: 'relative' }}>
                <div className="iconInfo">
                  {infoVm.guest_OS?.includes('WINDOW') ? (
                    <WindowsOutlined className="iconWindow" />
                  ) : (
                    <QqOutlined className="iconUbuntu" />
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const RenderSummaryVm = () => {
    return (
      <div className="infoVm">
        <table>
          <tr>
            <td>
              <FaMicrochip className="iconSumary" />
            </td>
            <td>
              <div> CPU USAGE:</div>
              <div>{infoVm.cpu?.count}</div>
            </td>
          </tr>
          <tr>
            <td>
              <FaMemory className="iconSumary" />
            </td>
            <td>
              <div> MEMORY USAGE:</div>
              <div>{infoVm.memory?.size_MiB} MB</div>
            </td>
          </tr>
        </table>
      </div>
    );
  };
  if (vmPowerState?.length > 0) {
    const powerState = vmPowerState[0].power_state;
    if (isStart() ?? false)
      return (
        <>
          <div>
            <div className="border">
              <PlayCircleOutlined style={{ marginRight: '10px' }} />
              <div>Power On</div>
            </div>
            <div style={{ marginTop: 20, color: '#4EADCC' }}>LAUNCH WEB CONSOLE</div>
          </div>

          <RenderInforVm />
          <RenderSummaryVm />
        </>
      );
    if (powerState === 'stop' || powerState === 'POWERED_OFF')
      return (
        <>
          <div className="border">
            <PlayCircleOutlined style={{ marginRight: '10px' }} />
            <div>Power Off</div>
          </div>
          <RenderInforVm />
          <RenderSummaryVm />
        </>
      );
    if (powerState === 'suspend' || powerState === 'SUSPENDED')
      return (
        <>
          <div className="border">
            <PauseOutlined style={{ marginRight: '10px' }} />
            <div>Power Suspend</div>
          </div>
          <RenderInforVm />
          <RenderSummaryVm />
        </>
      );
    if (powerState === 'reset')
      return (
        <>
          <div className="border">
            <SyncOutlined style={{ marginRight: '10px' }} />
            <div>Power Reset</div>
          </div>
          <RenderInforVm />
          <RenderSummaryVm />
        </>
      );
  }

  return <span></span>;
};

export default RenderUI;
