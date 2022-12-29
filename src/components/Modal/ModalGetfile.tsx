/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState } from 'react';
import { Input, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { Action, useLog } from '../../hooks/logProvider/LogProvider';
import { SidebarContext } from '../Sidebar/Sidebar';

const ModalGetfile = () => {
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModalGetfileOpen(false);
  };
  const [getfileInput, setGetfileInput] = useState<string>('');
  const { request, isLoading } = useRequest();
  const { vmLog } = useLog();
  const handleGetfile = async (idVm: string) => {
    const vmUsername = localStorage.getItem(`username ${idVm}`);
    const vmPassword = localStorage.getItem(`password ${idVm}`);
    await request(
      `/api/vcenter/vm/${idVm}/guest/filesystem?action=create`,
      'POST',
      { action: Action.GET_FILE, name: Context.nameRightClick },
      false,
      {
        credentials: {
          interactive_session: false,
          user_name: vmUsername,
          password: vmPassword,
          type: 'USERNAME_PASSWORD',
        },
        spec: {
          path: getfileInput,
        },
      },
      {},
      false,
    )
      .then((response: any) => {
        console.log('response.link', response);
        window.open(response, '_blank', 'noopener,noreferrer');
        if (vmLog !== undefined) {
          vmLog({
            executeTime: Date.now(),
            name: Context.nameRightClick,
            action: 'Open file new tab',
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
    const vmCheckKeys = Context.checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys.length > 0) {
      vmCheckKeys.map((item: any) => {
        void handleGetfile(item);
      });
    } else void handleGetfile(Context.keyRightClick);
    setGetfileInput('');
  };
  return (
    <Modal
      title="Getfile"
      open={Context.isModalGetfileOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
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
