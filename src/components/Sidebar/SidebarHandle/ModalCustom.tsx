import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface PropModal {
  title?: string;
  isModalOpen?: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: ReactNode;
}
const ModalCustom = ({
  title = '',
  isModalOpen = false,
  handleOk,
  handleCancel,
  children,
}: PropModal) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default ModalCustom;
