/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import { DataNode, SidebarContext } from '../Sidebar/Sidebar';

const ModalRename = () => {
  const { vmLog } = useLog();
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModalRenameOpen(false);
  };
  const handleOk = (value: any) => {
    Context.setNameChange(value);
    if (vmLog !== undefined) {
      vmLog({
        executeTime: Date.now(),
        name: Context.nameRightClick,
        action: `Changed name to ${value}`,
      });
    }
    Context.setTreeData([...findRename(Context.treeData, Context.keyRightClick, value)]);
    Context.setIsModalRenameOpen(false);
  };
  const [renameInput, setRenameInput] = useState<string>('');

  useEffect(() => {
    setRenameInput(Context.nameRightClick);
  }, [Context.nameRightClick]);

  return (
    <Modal
      title="Rename"
      open={Context.isModalRenameOpen}
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

export const findRename = (list: DataNode[], keyRightClick: string, value: string) => {
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
