import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
const Contact: React.FC = () => {
  const { request } = useRequest();
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const handleInputUserName = (e: any): void => {
    setUsername(e.target.value);
  };
  const handleInputEmail = (e: any): void => {
    setMail(e.target.value);
  };
  const handleInputMessage = (e: any): void => {
    setMessage(e.target.value);
  };
  const handleSubmit = (): void => {
    const newData = { username, mail, message };
    request('/api/contact ', 'POST', newData).catch((e: string) =>
      console.log('error is', e),
    );
  };
  return (
    <Form
      {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
      layout={'horizontal'}
      style={{ marginTop: '50px' }}
    >
      <Form.Item label="Username">
        <Input placeholder="username" onChange={handleInputUserName} />
      </Form.Item>
      <Form.Item label="Email">
        <Input placeholder="email" onChange={handleInputEmail} />
      </Form.Item>
      <Form.Item label="Message">
        <Input placeholder="message" onChange={handleInputMessage} />
      </Form.Item>
      <Form.Item
        {...{
          wrapperCol: { span: 14, offset: 4 },
        }}
      >
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Contact;
