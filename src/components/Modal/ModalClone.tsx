/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { DataNode } from '../Sidebar/Sidebar';

interface PropsModal {
  isModalOpen: boolean;
  handleCancel: () => void;
  listVm: object[];
  keyRightClick: string;
  handleOk: (cloneInput: string) => void;
}
const ModalClone = ({
  isModalOpen,
  handleCancel,
  listVm,
  handleOk,
}: PropsModal) => {
  const [cloneInput, setCloneInput] = useState<string>('');
  return (
    <Modal
      title="Clone"
      open={isModalOpen}
      onOk={() => handleOk(cloneInput)}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Input VM name"
        onChange={(e) => setCloneInput(e.target.value)}
        value={cloneInput}
      ></Input>
    </Modal>
  );
};

export default ModalClone;
