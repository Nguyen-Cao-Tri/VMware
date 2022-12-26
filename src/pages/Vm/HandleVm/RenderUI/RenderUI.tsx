/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import { InformationContext } from '../../../../layouts/DefaultLayout/DefaultLayout';
import { FaChalkboard, FaDigitalTachograph, FaMemory, FaNetworkWired, FaRegWindowMaximize } from 'react-icons/fa';
import { HiOutlineChip } from 'react-icons/hi';
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
  // const currentTheme = inforContext.currentTheme;
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
              </td>
              <td>Guest OS:</td>
              <td style={{ padding: '0 10px' }}> {infoVm.guest_OS}</td>
            </tr>
            <tr>
              <td>
                <FaDigitalTachograph className="iconSumary" />
              </td>
              <td>Compatibility:</td>
              <td style={{ padding: '0 10px' }}> ESXi 7.0 U2 and later (VM version 19)</td>
            </tr>
            <tr>
              <td>
                <FaRegWindowMaximize className="iconSumary" />
              </td>
              <td>VMware Tools:</td>
              <td style={{ padding: '0 10px' }}>
                {vmTool.run_state === 'NOT_RUNNING' ? `Not running` : `Running`}, version:
                {vmTool.version_number} (Current)
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineDns className="iconSumary" />
              </td>
              <td>DNS Name:</td>
              <td style={{ padding: '0 10px' }}> {vmNetwork?.dns_values?.host_name}</td>
            </tr>
            <tr>
              <td>
                <FaNetworkWired className="iconSumary" />
              </td>
              <td style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0 }}>IP Addresses:</div>
              </td>
              <td style={{ padding: '0 10px' }}>
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
      <div className="summary">
        <table>
          <tr>
            <td>
              <HiOutlineChip className="icon_summary fs" />
            </td>
            <td>
              <div> CPU USAGE</div>
              <div>{infoVm.cpu?.count}</div>
            </td>
          </tr>
          <tr>
            <td>
              <FaMemory className="icon_summary fs2" style={{ marginLeft: '5px' }} />
            </td>
            <td className="memory">
              <div> MEMORY USAGE</div>
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
            <div className="vm">
              <div className="border">
                <PlayCircleOutlined style={{ marginRight: '10px' }} />
                <div>Power On</div>
              </div>
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
    if (powerState === 'suspend' || powerState === 'SUSPENDED')
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
    if (powerState === 'reset')
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
  }

  return <div></div>;
};

export default RenderUI;
