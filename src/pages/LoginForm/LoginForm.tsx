/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useRequestLogin from 'hooks/useRequest/useRequestLogin';
import { Button, ConfigProvider, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { encode } from 'base-64';
import { toast } from 'react-toastify';
import Logo from 'assets/images/logo.svg';
// const [loadings, setLoadings] = useState<boolean[]>([]);

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { requestLogin } = useRequestLogin();
  // rtf6

  const onFinish = (values: Record<string, string>) => {
    const { username, password } = values;
    // console.log('username password', username, password);
    const credential = `${username}:${password}`;
    const base64Credential = encode(credential);
    requestLogin(
      '/api/session',
      'POST',
      { body: { username, password } },
      {
        Authorization: `Basic ${base64Credential}`,
      },
    )
      .then((data: any) => {
<<<<<<< HEAD
        console.log('res', data);
        localStorage.setItem('sessionId', data);
=======
        // console.log('res', data);
        console.log('data', data);

        const sessionId = data;
        localStorage.setItem('sessionId', sessionId);
>>>>>>> 25b04a83b316a7da17a90899433bbe4ad564ac4d
        toast.success('🦄 Logged in successfully!');
        navigate('/');
      })
      .catch((error: any) => {
        console.log(error, 'UNAUTHENTICATED');
        toast.error('💩 Login failed!');
      });
  };
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      navigate('/');
      toast('🦄 Logged in, pleasessssssss!');
    }
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2997ce',
        },
      }}
    >
      <div className="login">
        <div className="item_login">
          <div className="logo_login">
            <img src={Logo} alt="logo" />
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                style={{ borderRadius: '4px' }}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                style={{ borderRadius: '4px' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                // loading={loadings[1]}
                // onClick={() => enterLoading(1)}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default LoginForm;
