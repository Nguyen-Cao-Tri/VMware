/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState } from 'react';
import { Input, Modal } from 'antd';
import { Action, useLog } from '../../hooks/logProvider/LogProvider';
import { SidebarContext } from '../Sidebar/Sidebar';
import useRequest from '../../hooks/useRequest/useRequest';
import { vcenterAPI } from 'api/vcenterAPI';

const ModalGetfile = () => {
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModalGetfileOpen(false);
  };
  const [getfileInput, setGetfileInput] = useState<string>('');
  const { request, isLoading } = useRequest();
  const { vmLog } = useLog();
  const handleGetfile = async (idVm: string) => {
    const vmUsername = localStorage.getItem(`username ${idVm}`);
    const vmPassword = localStorage.getItem(`password ${idVm}`);
    await vcenterAPI
      .postTransferFile(idVm, {
        credentials: {
          interactive_session: false,
          user_name: 'home',
          password: 'zxcasdqwe~123456789',
          type: 'USERNAME_PASSWORD',
        },
        spec: {
          path: getfileInput,
        },
      })
      .then(res => window.open(res));
  };
  const handleOk = () => {
    const vmCheckKeys = Context.checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys.length > 0) {
      vmCheckKeys.map((item: any) => {
        void handleGetfile(item);
      });
    } else void handleGetfile(Context.keyRightClick);
    setGetfileInput('');
    handleCancel();
  };
  return (
    <Modal
      title="Getfile"
      open={Context.isModalGetfileOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <Input
        placeholder="Enter path"
        value={getfileInput}
        onChange={(e: any) => setGetfileInput(e.target.value)}
        autoFocus
      />
    </Modal>
  );
};
export default ModalGetfile;
