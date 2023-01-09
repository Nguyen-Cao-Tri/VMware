/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react';
import { Input, Modal, notification } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { Action } from '../../hooks/logProvider/LogProvider';
import { SidebarContext } from '../Sidebar/Sidebar';

const ModalProcess = () => {
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModal({ ProcessOpen: false });
  };
  const [pathInput, setPathInput] = useState<string>('');
  const { request, isLoading } = useRequest();
  const handleOk = async () => {
    const username = localStorage.getItem(`username ${Context.keyRightClick}`);
    const password = localStorage.getItem(`password ${Context.keyRightClick}`);
    await request(
      `/api/vcenter/vm/${Context.keyRightClick}/guest/processes?action=create`,
      'POST',
      { action: Action.RUN_PROCCESS, name: Context.nameRightClick },
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
      open={Context.isModal.ProcessOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div className="inputProcess">
        <span>Path:</span>
        <Input value={pathInput} placeholder="Enter ..." onChange={e => setPathInput(e.target.value)} />
      </div>
    </Modal>
  );
};

export default ModalProcess;
