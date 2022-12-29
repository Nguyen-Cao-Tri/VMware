/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { Action } from '../../hooks/logProvider/LogProvider';
import useRequest from '../../hooks/useRequest/useRequest';
import { SidebarContext } from '../Sidebar/Sidebar';

const ModalClone = () => {
  const { request } = useRequest();
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModalCloneOpen(false);
  };
  const handleOkClone = (cloneInput: string) => {
    Context.setIsModalCloneOpen(false);
    const vmName: any = Context.vmApi?.filter((item: any) => item.vmKey === Context.keyRightClick);
    console.log('vmName', vmName);
    void request(
      '/api/vcenter/vm?action=clone',
      'POST',
      {
        action: Action.CLONE_VM,
        name: vmName[0].name,
      },
      false,
      {
        name: cloneInput,
        source: Context.keyRightClick,
      },
    );
  };
  const handleOk = (value: any) => handleOkClone(value);
  const [cloneInput, setCloneInput] = useState<string>('');

  return (
    <Modal title="Clone" open={Context.isModalCloneOpen} onOk={() => handleOk(cloneInput)} onCancel={handleCancel}>
      <Input placeholder="Input VM name" onChange={e => setCloneInput(e.target.value)} value={cloneInput}></Input>
    </Modal>
  );
};

export default ModalClone;
