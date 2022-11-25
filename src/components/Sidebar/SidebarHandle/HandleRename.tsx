import React from 'react';
import { Modal } from 'antd';

const Children = () => {
  return <div>bjkhg</div>;
};

const HandleRename = () => {
  // const [showModal, setShowModal] = useState<boolean>(true);
  console.log('rename');
  return (
    <Modal title="Rename" open={true}>
      <Children />
    </Modal>
  );
};

export default HandleRename;
