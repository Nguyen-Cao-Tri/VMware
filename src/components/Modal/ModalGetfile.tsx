/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
interface PropModal {
  isModalOpen?: boolean;
  vmId?: string;
  valueGetFile?: string;
  handleCancel: () => void;
  checkedKeys: string[];
  keyRightClick: string;
}

const ModalGetfile = ({
  isModalOpen = false,
  handleCancel,
  checkedKeys,
  keyRightClick,
}: PropModal) => {
  const [getfileInput, setGetfileInput] = useState<string>('');
  const { request } = useRequest();
  const handleGetfile = (idVm: string) => {
    const vmUsername = localStorage.getItem(`username ${idVm}`);
    const vmPassword = localStorage.getItem(`password ${idVm}`);
    request(`/api/vcenter/vm/${idVm}/guest/filesystem?action=create`, 'POST', {
      credentials: {
        interactive_session: false,
        user_name: vmUsername,
        password: vmPassword,
        type: 'USERNAME_PASSWORD',
      },
      spec: {
        path: getfileInput,
      },
    })
      .then((response: any) => {
        console.log('response.link', response);
        // window.open(response, '_blank', 'noopener,noreferrer');
        if (response) {
          fetch(response, { method: 'GET' })
            .then((res: any) => {})
            .catch((error: any) => {
              console.log(error);
            });
        }
        handleCancel();
      })
      .catch((error: any) => {
        console.log('Oops errors!', error);
        handleCancel();
      });
  };
  const handleOk = () => {
    const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys.length > 0) {
      vmCheckKeys.map((item: any) => {
        handleGetfile(item);
      });
    } else handleGetfile(keyRightClick);
    setGetfileInput('');
  };
  return (
    <Modal
      title="Getfile"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter path"
        value={getfileInput}
        onChange={(e: any) => setGetfileInput(e.target.value)}
        autoFocus
      />
    </Modal>
  );
};
export default ModalGetfile;
