/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import './renderUI.scss';
import linux from 'assets/images/linux.png';
import windows from 'assets/images/windows.png';
import guestOs from 'assets/images/guest.png';
import ip from 'assets/images/ip.png';
import dns from 'assets/images/dns.png';
import encryption from 'assets/images/encryption.png';
import tools from 'assets/images/tools.png';
import { vcenterAPI } from 'api/vcenterAPI';

const RenderInforVm = () => {
  const { vmTools, guest, keySelect, vmNetwork, setGuestOS, setTool, setNetwork } = useInfo();
  // console.log('keySelect', keySelect);
  const key = keySelect[0];
  const callGuest = async (idVm: string) => {
    await vcenterAPI.getGuestOS(idVm).then(guestOs => {
      // console.log('guest', guestOs);
      if (setGuestOS) setGuestOS(guestOs);
    });
    await vcenterAPI.getTools(idVm).then(tool => {
      if (setTool) setTool(tool);
    });
    await vcenterAPI.getNetWork(idVm).then(network => {
      // console.log('network call api', network);
      if (setNetwork) setNetwork(network);
    });
  };

  useEffect(() => {
    void callGuest(key);
  }, [key]);
  // console.log('vmNetwork 3', vmNetwork);
  const ipAddress = vmNetwork?.length ? (
    vmNetwork?.map((item: any) =>
      item?.ip?.ip_addresses?.map((i: any, index: any) => <div key={index}>{i?.ip_address}</div>),
    )
  ) : (
    <span></span>
  );
  return (
    <div className="infoVm">
      <table>
        <tbody>
          <tr>
            <td>
              <img src={guestOs} alt="#" />
            </td>
            <td>Guest OS:</td>
            <td>
              <span className="iconInfo">
                {guest?.family?.includes('LINUX') ? (
                  <img src={linux} alt="linux" />
                ) : (
                  <img src={windows} alt="windows" />
                )}
              </span>
              <span style={{ marginBottom: '5px' }}> {guest?.name} </span>
            </td>
          </tr>
          <tr>
            <td>
              <img src={tools} alt="tools" />
            </td>
            <td>VMware Tools:</td>
            <td style={{ padding: '0 10px' }}>
              {vmTools?.run_state === 'NOT_RUNNING' ? `Not running` : `Running`}, version:
              {vmTools?.version_number} ({vmTools?.version_status})
            </td>
          </tr>
          <tr>
            <td>
              <img src={dns} alt="dns" />
            </td>
            <td>DNS Name:</td>
            <td style={{ padding: '0 10px' }}> {guest?.host_name}</td>
          </tr>
          <tr>
            <td>
              <img src={ip} alt="ip address" />
            </td>
            <td style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0 }}>IP Addresses:</div>
            </td>
            <td style={{ padding: '0 10px' }}>
              {}
              <div>{ipAddress}</div>
            </td>
          </tr>
          <tr>
            <td>
              <img src={encryption} alt="encryption" />
            </td>
            <td>Encryption:</td>
            <td style={{ padding: '0 10px' }}> Not encrypted</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RenderInforVm;
