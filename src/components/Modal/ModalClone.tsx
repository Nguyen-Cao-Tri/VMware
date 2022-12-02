import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest/useRequest';
interface PropsModal {
  isModalOpen: boolean;
  handleCancel: () => void;
}
const ModalClone = ({ isModalOpen, handleCancel }: PropsModal) => {
  const [cloneInput, setcloneInput] = useState<string>('');
  const { request } = useRequest();
  const handleOk = () => {
    handleCancel();
    const idRandom = new Date().getMilliseconds();
    const idVmClone = `vm-${idRandom}`;
    request('/api/vcenter/vm?action=clone', 'POST', {
      name: cloneInput,
      source: idVmClone,
    })
      .then((res: any) => console.log('res clone', res))
      .catch((e: any) => console.log('error clone', e));
    const cloneItemVm = vm.filter(
      (itemVm: any) => itemVm.vm === infor.node.key,
    );
    const cloneVmValue: { key: string; title: string; isLeaf: boolean } = {
      key: idVmClone,
      title: cloneValue,
      isLeaf: true,
    };
    const setVmValue: { name: string; vm: string } = {
      ...cloneItemVm[0],
      name: cloneValue,
      vm: idVmClone,
    };
    setVm([...vm, setVmValue]);
    const findClone = (list: DataNode[]) => {
      list?.forEach((itemList: any) => {
        if (itemList.key === infor.node.key.slice(0, 3)) {
          itemList.children.push(cloneVmValue);
        } else {
          findClone(itemList.children);
        }
      });
      return list;
    };
    setTreeData([...findClone(treeData)]);
  };
  return (
    <Modal
      title="Clone"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Input VM name"
        onChange={(e) => setcloneInput(e.target.value)}
        value={cloneInput}
      ></Input>
    </Modal>
  );
};

export default ModalClone;
