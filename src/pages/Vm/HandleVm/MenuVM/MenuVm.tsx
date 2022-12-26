import { Button, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { BsCameraFill, BsCaretRight, BsSquare } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { DesktopOutlined } from '@ant-design/icons';
import { InformationContext } from '../../../../layouts/DefaultLayout/DefaultLayout';
import './menuVm.scss';

const MenuVm = () => {
  const inforContext: any = useContext(InformationContext);

  return (
    // <div className={inforContext.curentTheme}>
    <div className="nav">
      <div className="title">
        <span>{inforContext.inforSelect.title}</span>
      </div>
      {Boolean(inforContext.inforSelect.key?.includes('vm')) && inforContext.vmPowerState.length > 0 && (
        <div className="nav_item">
          <div className="line ml"></div>
          <div className="icon_item ml">
            <div className="item">
              <Tooltip placement="bottom" title={'Power On'}>
                <Button type="text" icon={<BsCaretRight className="start" />} />
              </Tooltip>
              <Tooltip placement="bottom" title={'Power Off'}>
                <Button type="text" icon={<BsSquare className="stop" />} />
              </Tooltip>
              <Tooltip placement="bottom" title={'Launch Console'}>
                <Button type="text" icon={<DesktopOutlined className="launch" />} />
              </Tooltip>
              <Tooltip placement="bottom" title={'Edit Settings'}>
                <Button type="text" icon={<FaEdit className="edit" />} />
              </Tooltip>
              <Tooltip placement="bottom" title={'Take Snapshot'}>
                <Button type="text" icon={<BsCameraFill className="snap " />} />
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
