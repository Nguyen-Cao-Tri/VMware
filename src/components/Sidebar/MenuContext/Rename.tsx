/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import { SidebarContext } from '../Sidebar';
import { useLog } from '../../../hooks/logProvider/LogProvider';
const Rename = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [renameInput, setRenameInput] = useState<string>('');
  const Context: any = useContext(SidebarContext);
  const { vmLog } = useLog();
  // const findRename = (list: DataNode[], keyRightClick: string, value: string) => {
  //   list.forEach((item: any) => {
  //     if (item.key === keyRightClick) {
  //       item.title = value;
  //     }
  //     if (item.children !== undefined) {
  //       findRename(item.children, keyRightClick, value);
  //     }
  //   });
  //   return list;
  // };
  // const handleOk = (value: string) => {
  //   Context.setNameChange(value);
  //   if (vmLog !== undefined) {
  //     vmLog({
  //       executeTime: Date.now(),
  //       name: Context.nameRightClick,
  //       action: `Changed name to ${value}`,
  //     });
  //   }
  //   Context.setTreeData([...findRename(Context.treeData, Context.keyRightClick, value)]);
  //   Context.setIsModalRenameOpen(false);
  // };
  console.log('isModalOpen', isModalOpen);

  return (
    <Modal
      title="Rename"
      open={isModalOpen}
      // onOk={() => {
      //   handleOk(renameInput);
      //   // setRenameInput('');
      // }}
      // onCancel={() => setIsModalOpen(false)}
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

export default Rename;
