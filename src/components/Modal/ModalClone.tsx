/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Modal } from 'antd';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import React, { useContext, useState } from 'react';
import { Action } from '../../hooks/logProvider/LogProvider';
import useRequest from '../../hooks/useRequest/useRequest';

const ModalClone = () => {
  const { request } = useRequest();
  const { isModal, setIsModal, keyRightClick } = useInfo();

  const handleCancel = () => {
    if (setIsModal !== undefined) setIsModal({ CloneOpen: false });
  };
  const handleOkClone = (cloneInput: string) => {
    if (setIsModal !== undefined) setIsModal({ CloneOpen: false });
    // const vmName: any = vmApi?.filter((item: any) => item.vmKey === keyRightClick);
    // console.log('vmName', vmName);
    // void request(
    //   '/api/vcenter/vm?action=clone',
    //   'POST',
    //   {
    //     action: Action.CLONE_VM,
    //     name: vmName[0].name,
    //   },
    //   false,
    //   {
    //     name: cloneInput,
    //     source: keyRightClick,
    //   },
    // );
  };
  const handleOk = (value: any) => handleOkClone(value);
  const [cloneInput, setCloneInput] = useState<string>('');

  return (
    <Modal title="Clone" open={isModal?.CloneOpen} onOk={() => handleOk(cloneInput)} onCancel={handleCancel}>
      <Input placeholder="Input VM name" onChange={e => setCloneInput(e.target.value)} value={cloneInput}></Input>
    </Modal>
  );
};

export default ModalClone;
