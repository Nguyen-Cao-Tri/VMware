/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { BsCameraFill, BsCaretRight, BsSquare } from 'react-icons/bs';
import { useInfo } from '../../../../hooks/infoProvider/InfoProvider';
import { FaEdit } from 'react-icons/fa';
import { DesktopOutlined } from '@ant-design/icons';
import './menuVm.scss';
import { SidebarContext } from 'components/Sidebar/Sidebar';

const MenuVm = () => {
  const { inforSelect, vmPowerState } = useInfo();
  // const Context: any = useContext(SidebarContext);
  const powerState = vmPowerState.powerState.state;

  return (
    <div className="nav">
      <div className="title">
        <span>{inforSelect.title}</span>
      </div>
      {Boolean(inforSelect.key?.includes('vm')) && (
        <div className="nav_item">
          <div className="line ml"></div>
          <div className="icon_item ml">
            <div className="item">
              {powerState === 'POWERED_ON' ? (
                <>
                  <Tooltip placement="bottom" title={'Power On'}>
                    <Button type="text" icon={<BsCaretRight className="start" />} style={{ opacity: 0.5 }} disabled />
                  </Tooltip>
                  <Tooltip placement="bottom" title={'Power Off'}>
                    <Button type="text" icon={<BsSquare className="stop" />} />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip placement="bottom" title={'Power On'}>
                    <Button type="text" icon={<BsCaretRight className="start" />} />
                  </Tooltip>
                  <Tooltip placement="bottom" title={'Power Off'}>
                    <Button type="text" icon={<BsSquare className="stop" />} style={{ opacity: 0.3 }} disabled />
                  </Tooltip>
                </>
              )}

              <Tooltip placement="bottom" title={'Launch Console'}>
                <Button type="text" icon={<DesktopOutlined className="launch" />} disabled />
              </Tooltip>
              <Tooltip placement="bottom" title={'Edit Settings'}>
                <Button type="text" icon={<FaEdit className="edit" />} disabled />
              </Tooltip>
              <Tooltip placement="bottom" title={'Take Snapshot'}>
                <Button type="text" icon={<BsCameraFill className="snap " />} disabled />
              </Tooltip>
            </div>
          </div>
          <div className="line ml"></div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default MenuVm;
