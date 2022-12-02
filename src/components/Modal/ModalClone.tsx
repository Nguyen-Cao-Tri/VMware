import React from 'react';

const ModalClone = () => {
  return (
    <Modal
      title="Clone"
      open={isModalOpenClone}
      onOk={handleOkClone}
      onCancel={handleCancelClone}
    >
      <Input
        placeholder="Input VM name"
        onChange={onChangeClone}
        value={cloneValue}
      ></Input>
    </Modal>
  );
};

export default ModalClone;
