/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = info => {
    console.log('infor', info);

    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };
  return (
    <Upload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default App;
