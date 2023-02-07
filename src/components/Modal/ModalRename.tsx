/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input, Modal } from 'antd';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
import { DataNode } from 'hooks/infoProvider/TypeInfo';
import React, { useEffect, useState } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';

const ModalRename = () => {
  const { vmLog } = useLog();
  const { isModal, nameRightClick, keyRightClick, treeData, setIsModal, setTreeDatas } = useInfo();

  const handleCancel = () => {
    if (setIsModal !== undefined) setIsModal({ RenameOpen: false });
  };
  const handleOk = (value: any) => {
    if (setIsModal && setTreeDatas && keyRightClick) {
      if (vmLog !== undefined) {
        vmLog({
          executeTime: Date.now(),
          name: nameRightClick,
          action: `Changed name to ${value}`,
        });
      }
      setTreeDatas([...findRename(treeData, keyRightClick, value)]);
      setIsModal({ RenameOpen: false });
    }
  };
  const [renameInput, setRenameInput] = useState<string>('');

  useEffect(() => {
    if (nameRightClick !== undefined) setRenameInput(nameRightClick);
  }, [nameRightClick]);

  return (
    <Modal
      title="Rename"
      open={isModal?.RenameOpen}
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
