/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import './renderUI.scss';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { vcenterAPI } from 'api/vcenterAPI';

const RenderSummaryVm = () => {
  const { keySelect, memoryVm, cpuVm, setMemory, setCpu } = useInfo();
  // console.log('keySelect', keySelect);
  const key = keySelect[0];
  const callGuest = async (idVm: string) => {
    await vcenterAPI.getMemory(idVm).then(memory => {
      if (setMemory != null) setMemory(memory);
    });
    await vcenterAPI.getCpu(idVm).then(tool => {
      if (setCpu != null) setCpu(tool);
    });
    // await vcenterAPI.getVms(idVm)
  };

  useEffect(() => {
    void callGuest(key);
  }, [key]);
  return (
    <div className="summary">
      <div className="titleSummary">
        <span>Capacity and Usage</span>
        <span className="iconSum">
          <RxDragHandleDots2 />
        </span>
      </div>

      <ul>
        <li>
          {/* <img src={cpu} alt="cpu" /> */}
          <span>CPU</span>
          <div className="data">
            <div>0 MHz used</div>
            <div>{cpuVm?.count} CPUs </div>
          </div>
          <div className="lineData"></div>
        </li>
        <li>
          {/* <img src={memory} alt="memory" /> */}
          <span>MEMORY</span>
          <div className="data">
            <div> 0 MB used</div>
            <div>{memoryVm?.size_MiB} MiB </div>
          </div>
          <div className="lineData"></div>
        </li>
        <li>
          {/* <img src={storage} alt="cpu" /> */}
          <span>STORAGE</span>
          <div className="data">
            <div>0 GB used</div>
            <div>{memoryVm?.size_MiB} MiB </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RenderSummaryVm;
