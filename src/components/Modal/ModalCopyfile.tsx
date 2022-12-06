/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
interface PropsModal {
  isModalopen: boolean;
  handleCancel: () => void;
  keyRightClick: string;
}
const ModalCopyfile = ({
  isModalopen,
  handleCancel,
  keyRightClick,
}: PropsModal) => {
  const [pathInput, setPathInput] = useState<string>('');
  const [fileInput, setFileInput] = useState<string>('');
  const [selectFile, setSelectFile] = useState<string>('');
  const { request } = useRequest();
  const handleChangeFile = (e: any) => {
    // console.log(e.target.file[0]);
    setSelectFile(e.target.files[0]);
  };

  const handleOk = () => {
    handleCancel();
    const vmUsername = localStorage.getItem(`username ${keyRightClick}`);
    const vmPassword = localStorage.getItem(`password ${keyRightClick}`);
    if (keyRightClick.includes('vm')) {
      request(
        `/api/vcenter/vm/${keyRightClick}/guest/filesystem?action=create`,
        'POST',
        {
          credentials: {
            interactive_session: false,
            user_name: vmUsername,
            password: vmPassword,
            type: 'USERNAME_PASSWORD',
          },
          spec: {
            path: pathInput,
          },
        },
      )
        .then((response: any) => {
          console.log('response', response);
          const formData = new FormData();

          formData.append('file', fileInput);
          console.log('formData', formData);
          request(
            response,
            'PUT',
            {
              body: formData,
            },
            {
              'Content-Type': 'multipart/form-data',
            },
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
    }
  };

  return (
    <Modal
      title="CopyFile"
      open={isModalopen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="inputCopyfile">
        <div className="path">
          <span>Path:</span>
          <Input
            placeholder="Enter ..."
            onChange={(e) => setPathInput(e.target.value)}
          />
        </div>
        <div>
          <span>File:</span>
          <Input type="file" onChange={(e) => setFileInput(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCopyfile;
