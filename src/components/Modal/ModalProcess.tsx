/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Input, Modal, notification } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { Action } from '../../hooks/logProvider/LogProvider';
interface PropsMadal {
  isModalOpen: boolean;
  handleCancel: () => void;
  keyRightClick: string;
  nameRightClick: string;
}
const ModalProcess = ({
  isModalOpen,
  handleCancel,
  keyRightClick,
  nameRightClick,
}: PropsMadal) => {
  const [pathInput, setPathInput] = useState<string>('');
  const { request, isLoading } = useRequest();
  const handleOk = async () => {
    const username = localStorage.getItem(`username ${keyRightClick}`);
    const password = localStorage.getItem(`password ${keyRightClick}`);
    await request(
      `/api/vcenter/vm/${keyRightClick}/guest/processes?action=create`,
      'POST',
      { action: Action.RUN_PROCCESS, name: nameRightClick },
      false,
      {
        credentials: {
          interactive_session: false,
          user_name: username,
          password,
          type: 'USERNAME_PASSWORD',
        },
        spec: {
          path: pathInput,
        },
      },
      {},
      false,
    )
      .then((response: any) => {
        console.log(response);
        handleCancel();
      })
      .catch(() => {
        handleCancel();
      });
    setPathInput('');
  };

  return (
    <Modal
      title="Process"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div className="inputProcess">
        <span>Path:</span>
        <Input
          value={pathInput}
          placeholder="Enter ..."
          onChange={(e) => setPathInput(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default ModalProcess;
