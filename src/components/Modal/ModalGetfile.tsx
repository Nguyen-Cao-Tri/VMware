/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState } from 'react';
import { Input, Modal } from 'antd';
import { Action, useLog } from '../../hooks/logProvider/LogProvider';
import useRequest from '../../hooks/useRequest/useRequest';
import { vcenterAPI } from 'api/vcenterAPI';
import { useInfo } from 'hooks/infoProvider/InfoProvider';

const ModalGetfile = () => {
  const { isModal, nameRightClick, keyRightClick, checkedKeys, setIsModal } = useInfo();
  const handleCancel = () => {
    if (setIsModal !== undefined) setIsModal({ GetfileOpen: false });
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
    if (keyRightClick) {
      const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
      if (vmCheckKeys.length > 0) {
        vmCheckKeys.map((item: any) => {
          void handleGetfile(item);
        });
      } else void handleGetfile(keyRightClick);
      setGetfileInput('');
      handleCancel();
    }
  };
  return (
    <Modal
      title="Getfile"
      open={isModal?.GetfileOpen}
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
