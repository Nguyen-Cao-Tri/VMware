/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Input, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { Action } from '../../hooks/logProvider/LogProvider';

import { useInfo } from 'hooks/infoProvider/InfoProvider';
const ModalCopyfile = () => {
  const { isModal, keyRightClick, nameRightClick, setIsModal } = useInfo();

  const handleCancel = () => {
    if (setIsModal !== undefined) setIsModal({ ProcessOpen: false });
  };
  const [pathInput, setPathInput] = useState<string>('');
  const [fileInput, setFileInput] = useState<string>('');
  const [selectFile, setSelectFile] = useState<string>('');
  const { request, isLoading } = useRequest();
  const handleChangeFile = (e: any) => {
    setSelectFile(e.target.files[0]);
  };

  const handleOk = async () => {
    const vmUsername = localStorage.getItem(`username ${keyRightClick}`);
    const vmPassword = localStorage.getItem(`password ${keyRightClick}`);

    await request(
      `/api/vcenter/vm/vm-376065/guest/filesystem?action=create`,
      'POST',
      { action: Action.COPY_FILE, name: nameRightClick },
      false,
      {
        credentials: {
          interactive_session: false,
          user_name: 'home',
          password: 'zxcasdqwe~123456789',
          type: 'USERNAME_PASSWORD',
        },
        spec: {
          path: '/home/home/Test/test.txt',
        },
      },
      {},
      false,
    )
      .then((response: any) => {
        const formData = new FormData();
        formData.append('file', fileInput);
        console.log('formData', formData);
        request(
          response,
          'PUT',
          { action: Action.PUT_COPY_FILE, name: nameRightClick },
          true,
          {
            body: formData,
          },
          {
            'Content-Type': 'multipart/form-data',
          },
          false,
        )
          .then((res: any) => {
            console.log(res);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log('Oops errors!', error);
      });

    handleCancel();
  };

  return (
    <Modal
      title="CopyFile"
      open={isModal?.CopyfileOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div className="inputCopyfile">
        <div className="path">
          <span>Path:</span>
          <Input placeholder="Enter ..." onChange={e => setPathInput(e.target.value)} />
        </div>
        <div>
          <span>File:</span>
          <Input type="file" onChange={e => setFileInput(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCopyfile;
