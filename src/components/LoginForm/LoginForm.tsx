import { Button, Form, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.min.css';
import useRequest from '../../hooks/useRequest/useRequest';
import { AxiosResponse } from 'axios';

const LoginForm: React.FC = () => {
  const { request } = useRequest();
  const onFinish = (values: any) => {
    const { username, password } = values;
    console.log('username password', username, password);
    request('/auth/login', 'POST', { username, password })
      .then((response: AxiosResponse) => {
        console.log('res', response);
        // localStorage.setItem('apiKey', apiKey);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="item_login">
        <h1>LOGIN</h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="input"
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="input"
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
