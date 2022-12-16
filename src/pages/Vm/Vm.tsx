/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import '../../components/Content/content.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import {
  FaChalkboard,
  FaDigitalTachograph,
  FaMemory,
  FaMicrochip,
  FaNetworkWired,
  FaRegWindowMaximize,
  FaEdit,
} from 'react-icons/fa';
import {
  PlayCircleOutlined,
  SyncOutlined,
  PauseOutlined,
  WindowsOutlined,
  DesktopOutlined,
  QqOutlined,
} from '@ant-design/icons';
import { BsCaretRight, BsSquare, BsCameraFill } from 'react-icons/bs';
import { MdOutlineDns } from 'react-icons/md';
import { Button, Tooltip } from 'antd';
import MenuVm from './HandleVm/MenuVM/MenuVm';
import TableVm from './HandleVm/TableVM/TableVm';
import './vm.scss';

const Vm = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;
  const vmTool = inforContext?.vmTools;
  const vmNetwork = inforContext?.vmNetwork;
  const infoVm = inforContext?.vm;
  const arrayVmPowerState = inforContext?.vmPowerState;
  const vmPowerState = arrayVmPowerState?.filter(
    (item: any) => item.vm === key,
  );
  const isStop = () => {
    if (vmPowerState.length > 0) {
      return (
        vmPowerState[0].power_state === 'stop' ||
        vmPowerState[0].power_state === 'POWERED_OFF'
      );
    }
  };
  const isStart = () => {
    if (vmPowerState.length > 0) {
      return (
        vmPowerState[0].power_state === 'start' ||
        vmPowerState[0].power_state === 'POWERED_ON'
      );
    }
  };
  const RenderUI = () => {
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
                  {vmTool.run_state === 'NOT_RUNNING'
                    ? `Not running`
                    : `Running`}
                  , version:
                  {vmTool.version_number} (Current)
                </td>
              </tr>

              <tr>
                <td>
                  <FaMicrochip className="iconSumary" />
                  CPU:
                </td>
                <td>{infoVm.cpu?.count}</td>
              </tr>
              <tr>
                <td>
                  <FaMemory className="iconSumary" />
                  MEMORY:
                </td>
                <td>{infoVm.memory?.size_MiB} MB</td>
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
                  {vmNetwork?.dns?.ip_addresses &&
                    vmNetwork?.dns?.ip_addresses?.map(
                      (item: any, index: any) => <div key={index}>{item}</div>,
                    )}
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

    if (vmPowerState?.length > 0) {
      const powerState = vmPowerState[0].power_state;
      if (isStart())
        return (
          <>
            <div>
              <div className="border">
                <PlayCircleOutlined style={{ marginRight: '10px' }} />
                <div>Power On</div>
              </div>
              <div style={{ marginTop: 20, color: '#4EADCC' }}>
                LAUNCH WEB CONSOLE
              </div>
            </div>

            <RenderInforVm />
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
          </>
        );
      if (powerState === 'suspend' || powerState === 'SUSPENDED')
        return (
          <>
            <div className="border">
              <PauseOutlined style={{ marginRight: '10px' }} />
              <div>Power Suspend</div>
            </div>{' '}
            <RenderInforVm />
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
          </>
        );
    }
    return <span></span>;
  };
  return (
    <>
      {key !== undefined && <MenuVm />}
      <div className="content_item">
        <div className="render_ui">
          <RenderUI />
        </div>
        <div className="table_content">
          {key?.includes('vm') ? <TableVm /> : ''}
        </div>
      </div>
    </>
  );
};

export default Vm;
