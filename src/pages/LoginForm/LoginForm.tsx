/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Form, Input } from 'antd';
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
    console.log('username password', username, password);
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
      .then((response: any) => {
        console.log('res', response);
        const sessionId = response;
        localStorage.setItem('sessionId', sessionId);
        navigate('/');
      })
      .catch((error: any) => {
        console.log(error);
        alert('Login Fail');
      });
  };
  // fetch('https://vcenter.localdev.com/api/session', {
  // method: 'POST',
  // headers: {
  // Authorization: `Basic ${base64Credential}`,
  // },
  // credentials: 'omit',
  // })
  // .then((response) => response.json())
  // .then((data) => {
  // console.log('Success:', data);
  // localStorage.setItem('sessionId', data);
  // navigate('/');
  // })
  // .catch((error) => {
  // console.error('Error:', error);
  // });
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="item_login">
        {/* <p>{isLoading ? 'Loading...' : ''} </p> */}
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
