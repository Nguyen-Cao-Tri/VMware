/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { FaChalkboard, FaDigitalTachograph, FaMemory, FaNetworkWired, FaRegWindowMaximize } from 'react-icons/fa';
import { useInfo } from '../../../../hooks/infoProvider/InfoProvider';
import { PlayCircleOutlined, SyncOutlined, PauseOutlined, WindowsOutlined, QqOutlined } from '@ant-design/icons';
import { HiOutlineChip } from 'react-icons/hi';
import { MdOutlineDns } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import './renderUI.scss';
import { vcenterAPI } from 'api/vcenterAPI';
interface IPowerState {
  state: string;
}
const RenderUI = ({ prop }: any) => {
  const { inforSelect, vmTools, vmNetwork, vm } = useInfo();
  const [vmPowerState, setVmPowerState] = useState<string>('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('keySelect', prop?.keySelect);
    void vcenterAPI.getPower(prop?.keySelect).then(powerState => {
      setVmPowerState(powerState?.state);
      console.log('powerState', powerState.state);
    });
  }, [prop?.keySelect]);

  // const vmPowerStates = vmPowerState?.filter((item: any) => item.vm === key);
  const setOnSelectStorage: any = localStorage.getItem('setOnSelect');
  const inforSelectStorage = JSON.parse(setOnSelectStorage);
  if (Object.getOwnPropertyNames(inforSelect).length === 0) {
    inforSelect.title = inforSelectStorage.title;
    inforSelect.key = inforSelectStorage.key;
  }
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
              <td style={{ padding: '0 10px' }}> {vm.guest_OS}</td>
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
                {vmTools.run_state === 'NOT_RUNNING' ? `Not running` : `Running`}, version:
                {vmTools.version_number} (Current)
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineDns className="iconSumary" />
              </td>
              <td>DNS Name:</td>
              <td style={{ padding: '0 10px' }}> {vmNetwork.dns_values?.host_name}</td>
            </tr>
            <tr>
              <td>
                <FaNetworkWired className="iconSumary" />
              </td>
              <td style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0 }}>IP Addresses:</div>
              </td>
              <td style={{ padding: '0 10px' }}>
                {Boolean(vmNetwork.dns?.ip_addresses) &&
                  vmNetwork.dns?.ip_addresses?.map((item: any, index: any) => <div key={index}>{item}</div>)}
              </td>
            </tr>
            <tr>
              <td style={{ position: 'relative' }}>
                <div className="iconInfo">
                  {vm.guest_OS?.includes('WINDOW') ? (
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
            <td style={{ paddingRight: '10px' }}>
              <HiOutlineChip className="icon_summary fs" />
            </td>
            <td>
              <div> CPU USAGE</div>
              <div>{vm.cpu?.count}0</div>
            </td>
          </tr>
          <tr>
            <td>
              <FaMemory className="icon_summary fs2" style={{ marginLeft: '3px' }} />
            </td>
            <td className="memory">
              <div> MEMORY USAGE</div>
              <div>{vm.memory?.size_MiB} MB</div>
            </td>
          </tr>
        </table>
      </div>
    );
  };

  if (vmPowerState === 'POWERED_ON')
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
