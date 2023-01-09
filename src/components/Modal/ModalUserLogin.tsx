/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import { SidebarContext } from '../Sidebar/Sidebar';

const ModalUserLogin = () => {
  const Context: any = useContext(SidebarContext);
  const handleCancel = () => {
    Context.setIsModal({ UserLoginOpen: false });
  };

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { vmLog } = useLog();
  const handleUserLogin = (item: string, username: string, password: string) => {
    const obj = {
      id: item,
      username,
      password,
    };
    localStorage.setItem(`username ${item}`, `${obj.username}`);
    localStorage.setItem(`password ${item}`, `${obj.password}`);
  };
  const handleOk = (userName: string, password: string) => {
    if (vmLog !== undefined) {
      vmLog({
        executeTime: Date.now(),
        name: Context.nameRightClick,
        action: 'Set user login success',
      });
    }
    handleCancel();
    const vmCheckKeys = Context.checkedKeys.filter((item: any) => item.includes('vm'));
    if (vmCheckKeys.length > 0) {
      vmCheckKeys.map((item: any) => {
        handleUserLogin(item, userName, password);
      });
    } else if (Context.keyRightClick.includes('vm')) {
      handleUserLogin(Context.keyRightClick, userName, password);
    }
    setUserName('');
    setPassword('');
  };
  return (
    <Modal
      title="User login"
      open={Context.isModal.UserLoginOpen}
      onOk={() => handleOk(userName, password)}
      onCancel={handleCancel}
    >
      <div className="input__name">
        <div>
          Username
          <Input value={userName} onChange={e => setUserName(e.target.value)}></Input>
        </div>
        <div>
          Password
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalUserLogin;
