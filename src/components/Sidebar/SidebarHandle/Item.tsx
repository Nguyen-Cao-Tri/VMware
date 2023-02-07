/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { items } from '../../../utils/items';
import { SidebarContext } from '../Sidebar';
import ModalRename from '../../Modal/ModalRename';
import { useInfo } from 'hooks/infoProvider/InfoProvider';
const Item = () => {
  const [key, setKey] = useState<string>('');
  const Context: any = useContext(SidebarContext);
  const { nameRightClick, keyRightClick, setIsModal, setTreeDatas, setOnExpand, setLoadedKey, setCheckedKey } =
    useInfo();

  // useEffect(() => {
  //   if (key === 'rename' && setIsModal !== undefined) {
  //     ModalRename();
  //     setIsModal({ RenameOpen: true });
  //   }
  // }, [key]);
  if (
    keyRightClick !== undefined &&
    nameRightClick !== undefined &&
    setIsModal !== undefined &&
    setTreeDatas !== undefined &&
    setOnExpand !== undefined &&
    setLoadedKey !== undefined &&
    setCheckedKey !== undefined
  )
    return (
      <Menu
        style={{ width: '250px' }}
        items={items(keyRightClick, nameRightClick)}
        onClick={key => {
          setKey(key.key);
          switch (key.key) {
            case 'action':
              break;
            case 'rename':
              setIsModal({ RenameOpen: true });
              break;
            case 'refresh':
              setOnExpand([]);
              setLoadedKey([]);
              setCheckedKey([]);
              break;
            case 'login':
              setIsModal({ UserLoginOpen: true });
              break;
            case 'clone':
              setIsModal({ CloneOpen: true });
              break;
            case 'getfile':
              setIsModal({ GetfileOpen: true });
              break;
            case 'copyfile':
              setIsModal({ CopyfileOpen: true });
              break;
            case 'process':
              setIsModal({ ProcessOpen: true });
              break;
            case key.key:
              void Context.handlePowerState(keyRightClick, key.key);
              break;
          }
        }}
      />
    );
  return <></>;
};
export default Item;
