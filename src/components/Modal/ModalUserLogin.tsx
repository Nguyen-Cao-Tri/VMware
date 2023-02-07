/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input, Modal, Form, Checkbox } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useLog } from '../../hooks/logProvider/LogProvider';
import { SidebarContext } from '../Sidebar/Sidebar';
import { AES, enc } from 'crypto-js';
import { DataNode } from 'hooks/infoProvider/TypeInfo';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const ModalUserLogin = () => {
  const [isCheckAccount, setIsCheckAccount] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const { vmLog } = useLog();
  const sessionStorageLogin: any = sessionStorage.getItem('sessionLogin');
  const sessionLogin = JSON.parse(sessionStorageLogin);
  const localStorageLogin: any = localStorage.getItem('localLogin');
  const localLogin = JSON.parse(localStorageLogin);
  // const Context: any = useContext(SidebarContext);
  const { isModal, nameRightClick, keyRightClick, checkedKeys, setIsModal } = useInfo();

  const privateKey = process.env.REACT_APP_PRIVATE_KEY ?? '';
  useEffect(() => {
    if (keyRightClick) findInforLogin(sessionLogin, keyRightClick);
  }, [keyRightClick, isModal?.UserLoginOpen]);

  const encryptPlainText = (plainText: string) => AES.encrypt(plainText, privateKey).toString();

  const decryptPlainText = (encryptedText: string) => AES.decrypt(encryptedText, privateKey).toString(enc.Utf8);

  const handleCancel = () => {
    if (setIsModal) setIsModal({ UserLoginOpen: false });
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const findInforLogin = (list: DataNode[], keyRightClick: string) => {
    list?.map((item: any) => {
      if (item.key === keyRightClick) {
        if (item.username) {
          setIsCheckAccount(true);
          setUsername(item.username);
        } else setIsCheckAccount(false);
      }
      if (item.children) findInforLogin(item.children, keyRightClick);
    });
  };
  const setLoginTreeData = (list: DataNode[], keyRightClick: string, username: string, password: string) => {
    list?.map((item: DataNode) => {
      if (item.key === keyRightClick) {
        item.username = username;
        item.password = password;
      }
      if (item.children) setLoginTreeData(item.children, keyRightClick, username, password);
    });
    return list;
  };
  const LoginAccount = () => {
    return (
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish}>
        <div style={{ paddingLeft: 87, marginBottom: 20, marginTop: 20 }}>
          <span style={{ marginRight: 10 }}>Username:</span> {decryptPlainText(username)}
        </div>
        <Form.Item
          name="password"
          label="Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            () => ({
              validator(_, value) {
                if (!value || password === value) {
                  setIsDisabled(false);
                  return Promise.resolve();
                } else {
                  setIsDisabled(true);
                  return Promise.reject(new Error('Wrong password !'));
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="savepassword" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Save password</Checkbox>
        </Form.Item>
      </Form>
    );
  };
  const RegisterAccount = () => {
    return (
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  setIsDisabled(false);
                  return Promise.resolve();
                } else {
                  setIsDisabled(true);
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    );
  };
  const handleOk = () => {
    if (keyRightClick)
      if (isCheckAccount) {
        if (form.getFieldValue('savepassword')) {
          localStorage.setItem(
            'localLogin',
            JSON.stringify(
              setLoginTreeData(
                localLogin,
                keyRightClick,
                encryptPlainText(username),
                encryptPlainText(form.getFieldValue('password')),
              ),
            ),
          );
        }
      } else {
        setPassword(form.getFieldValue('password'));
        sessionStorage.setItem(
          'sessionLogin',
          JSON.stringify(
            setLoginTreeData(
              sessionLogin,
              keyRightClick,
              encryptPlainText(form.getFieldValue('username')),
              encryptPlainText(form.getFieldValue('password')),
            ),
          ),
        );
        vmLog?.({
          executeTime: Date.now(),
          name: nameRightClick,
          action: 'Set user login success',
        });
      }
    form.setFieldsValue({ username: '', password: '', confirm: '' });
    handleCancel();
  };
  return (
    <Modal
      title={nameRightClick}
      open={isModal?.UserLoginOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isDisabled }}
      destroyOnClose={false}
    >
      <div className="input__nameas">{!isCheckAccount ? <RegisterAccount /> : <LoginAccount />}</div>
    </Modal>
  );
};

export default ModalUserLogin;
