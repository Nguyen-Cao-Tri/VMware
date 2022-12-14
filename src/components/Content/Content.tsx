/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useEffect, useState } from 'react';
import './content.scss';
import useRequest from '../../hooks/useRequest/useRequest';
import {
  FolderOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
  SyncOutlined,
  PauseOutlined,
  WindowsOutlined,
  QqOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import {
  FaChalkboard,
  FaDigitalTachograph,
  FaMemory,
  FaMicrochip,
  FaNetworkWired,
  FaRegWindowMaximize,
  FaEdit,
} from 'react-icons/fa';
import { BsCaretRight, BsSquare, BsCameraFill } from 'react-icons/bs';
import { MdOutlineDns } from 'react-icons/md';
import { Button, Tooltip } from 'antd';

const Content = (props: any) => {
  const title = props.inforSelect?.title;
  const key = props.inforSelect?.key;
  const totalChildren = props.inforSelect?.children?.length;
  const children = props.inforSelect?.children;
  const vmPowerState = props.vmPowerState?.filter(
    (item: any) => item.vm === key,
  );
  console.log('vmPowerState', vmPowerState);

  const arrayInfoVm = props.vmData.filter((item: any) => item.idVm === key);
  const infoVm = arrayInfoVm[0]?.infor;
  const arrayVmTools = props.tool.filter((item: any) => item.idVm === key);
  const vmTool = arrayVmTools[0]?.tool;
  const arrayVmNetwork = props.network.filter((item: any) => item.idVm === key);
  const vmNetwork = arrayVmNetwork[0]?.network;

  const start = <span>Power On</span>;
  const stop = <span>Power Off</span>;
  const edit = <span>Edit Settings</span>;
  const snap = <span>Take snapshot</span>;

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
                  <td>{infoVm.cpu.count}</td>
                </tr>
                <tr>
                  <td>
                    <FaMemory className="iconSumary" />
                    MEMORY:
                  </td>
                  <td>{infoVm.memory.size_MiB} MB</td>
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
                    {vmNetwork?.dns.ip_addresses &&
                      vmNetwork?.dns.ip_addresses?.map(
                        (item: any, index: any) => (
                          <div key={index}>{item}</div>
                        ),
                      )}
                  </td>
                </tr>
                <tr>
                  <td style={{ position: 'relative' }}>
                    <div className="iconInfo">
                      {infoVm.guest_OS.includes('WINDOW') ? (
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
              </div>{' '}
              <RenderInforVm />
            </>
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
  return (
    <>
      <div className="nav">
        <div className="title">
          <span>{title}</span>
        </div>
        {key?.includes('vm') && vmPowerState.length > 0 && (
          <div className="nav_item">
            <div className="line ml"></div>
            <div className="icon_item ml">
              <div className="item">
                <Tooltip placement="bottom" title={'Power On'}>
                  <Button
                    type="text"
                    icon={<BsCaretRight className="start" />}
                  />
                </Tooltip>
                <Tooltip placement="bottom" title={'Power Off'}>
                  <Button type="text" icon={<BsSquare className="stop" />} />
                </Tooltip>
                <Tooltip placement="bottom" title={'Launch Console'}>
                  <Button
                    type="text"
                    icon={<DesktopOutlined className="launch" />}
                  />
                </Tooltip>
                <Tooltip placement="bottom" title={'Edit Settings'}>
                  <Button type="text" icon={<FaEdit className="edit" />} />
                </Tooltip>
                <Tooltip placement="bottom" title={'Take Snapshot'}>
                  <Button
                    type="text"
                    icon={<BsCameraFill className="snap " />}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="line ml"></div>
          </div>
        )}
      </div>
      <div className="content_item">
        <RenderUI />
      </div>
    </>
  );
};

export default Content;
