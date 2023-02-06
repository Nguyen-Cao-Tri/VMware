/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react';
import { Form, Input, Modal, notification, Select } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { Action, useLog } from '../../hooks/logProvider/LogProvider';
import { DataNode, SidebarContext } from '../Sidebar/Sidebar';
import { InforLogin } from './InforLoginModal';
import { vcenterAPI } from 'api/vcenterAPI';
const ModalProcess = () => {
  const [form] = Form.useForm();
  const { vmLog } = useLog();
  const Context: any = useContext(SidebarContext);
  const handleCancel: any = () => {
    Context.setIsModalProcessOpen(false);
  };
  const { request, isLoading } = useRequest();
  InforLogin();

  const handleOk = async () => {
    await vcenterAPI
      .postCreateProcessFile(Context.keyRightClick, {
        credentials: {
          interactive_session: false,
          password: 'zxcasdqwe~123456789',
          type: 'USERNAME_PASSWORD',
          user_name: 'home',
        },
        spec: {
          arguments: form.getFieldValue('arguments'),
          environment_variables: {},
          path: form.getFieldValue('path'),
          start_minimized: false,
          working_directory: form.getFieldValue('working_directory'),
        },
      })
      .then(idProcess => {
        if (vmLog !== undefined) {
          vmLog({
            executeTime: Date.now(),
            name: Context.nameRightClick,
            action: `: Run process successfully with id: ${idProcess}`,
          });
        }
      })
      .catch(err => console.log('error', err));
    form.setFieldsValue({ arguments: '', path: '', minimized: 'false', working_directory: '' });
    handleCancel();
  };
  const ProcessForm = () => (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      initialValues={{ minimized: 'false' }}
    >
      <Form.Item name="arguments" label="Arguments">
        <Input />
      </Form.Item>
      <Form.Item name="environment" label="Environment variable">
        <Input />
      </Form.Item>
      <Form.Item
        name="path"
        label="Path"
        rules={[
          {
            required: true,
            message: 'Please input your path!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="minimized" label="Start minimized">
        <Select>
          <Select.Option value="true">Yes</Select.Option>
          <Select.Option value="false">No</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="working_directory" label="Working directory">
        <Input />
      </Form.Item>
    </Form>
  );

  return (
    <Modal
      title="Process"
      open={Context.isModalProcessOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div className="inputProcess">
        <ProcessForm />
      </div>
    </Modal>
  );
};

export default ModalProcess;
