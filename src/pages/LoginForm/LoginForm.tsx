/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.min.css';
import useRequest from '../../hooks/useRequest/useRequest';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { encode } from 'base-64';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { request } = useRequest();

  const onFinish = (values: Record<string, string>) => {
    const { username, password } = values;
    // console.log('username password', username, password);
    const credential = `${username}:${password}`;
    const base64Credential = encode(credential);
    request(
      '/api/session',
      'POST',
      {},
      {
        Authorization: `Basic ${base64Credential}`,
      },
    )
      .then((data: any) => {
        // console.log('res', data);
        const sessionId = data;
        localStorage.setItem('sessionId', sessionId);
        navigate('/');
      })
      .catch((error: any) => {
        console.log(error, 'UNAUTHENTICATED');
        notification.error({ message: 'Login Fail' });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="item_login">
        {/* <p>{isLoading ? 'Loading...' : ''} </p> */}
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
