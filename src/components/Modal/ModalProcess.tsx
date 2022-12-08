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
  const { request } = useRequest();
  const handleOk = () => {
    handleCancel();
    const username = localStorage.getItem(`username ${keyRightClick}`);
    const password = localStorage.getItem(`password ${keyRightClick}`);
    if (keyRightClick.includes('vm')) {
      request(
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
      )
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          notification.error({
            message: error.response.data.messages[0].default_message,
          });
        });
    }
  };

  return (
    <Modal
      title="Process"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="inputProcess">
        <span>Path:</span>
        <Input
          placeholder="Enter ..."
          onChange={(e) => setPathInput(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default ModalProcess;
