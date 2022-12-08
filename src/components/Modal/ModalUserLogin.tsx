import { Input, Modal } from 'antd';
import React, { useState } from 'react';
interface PropsModal {
  isModalOpen: boolean;
  handleOk?: (username: string, password: string) => void;
  handleCancel: () => void;
  checkedKeys: string[];
  keyRightClick: string;
}
const ModalUserLogin = ({
  isModalOpen,
  handleCancel,
  keyRightClick,
  checkedKeys,
}: PropsModal) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleUserLogin = (
    item: string,
    username: string,
    password: string,
  ) => {
    const obj = {
      id: item,
      username,
      password,
    };
    localStorage.setItem(`username ${item}`, `${obj.username}`);
    localStorage.setItem(`password ${item}`, `${obj.password}`);
  };
  const handleOk = (userName: string, password: string) => {
    handleCancel();
    const vmCheckKeys = checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys.length > 0) {
      vmCheckKeys.map((item: any) => {
        handleUserLogin(item, userName, password);
      });
    } else if (keyRightClick.includes('vm')) {
      handleUserLogin(keyRightClick, userName, password);
    }
  };
  return (
    <Modal
      title="User login"
      open={isModalOpen}
      onOk={() => handleOk(userName, password)}
      onCancel={handleCancel}
    >
      <div className="input__name">
        <div>
          Username
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Input>
        </div>
        <div>
          Password
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalUserLogin;