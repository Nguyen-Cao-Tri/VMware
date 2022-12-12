/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { DataNode } from '../Sidebar/Sidebar';
interface PropModal {
  isModalOpen?: boolean;
  handleOk: (value: string) => void;
  handleCancel: () => void;
  keyRightClick: string;
  nameRightClick: string;
}

const ModalRename = ({
  isModalOpen = false,
  handleOk,
  handleCancel,
  nameRightClick,
}: PropModal) => {
  const [renameInput, setRenameInput] = useState<string>('');
  useEffect(() => {
    setRenameInput(nameRightClick);
  }, [nameRightClick]);

  return (
    <Modal
      title="Rename"
      open={isModalOpen}
      onOk={() => {
        handleOk(renameInput);
        setRenameInput('');
      }}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter name"
        value={renameInput}
        onChange={(e: any) => setRenameInput(e.target.value)}
        autoFocus
      />
    </Modal>
  );
};
export default ModalRename;

export const findRename = (
  list: DataNode[],
  keyRightClick: string,
  value: string,
) => {
  list.forEach((item: any) => {
    if (item.key === keyRightClick) {
      item.title = value;
    }
    if (item.children) {
      findRename(item.children, keyRightClick, value);
    }
  });
  return list;
};
