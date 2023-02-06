/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Action } from 'hooks/logProvider/LogProvider';
import useRequest from '../../../hooks/useRequest/useRequest';
import { items } from '../../../utils/items';
import { DataNode, SidebarContext } from '../Sidebar';
import { InitTreeData } from './InitTreeData';
import ModalRename from '../../Modal/ModalRename';
const Item = () => {
  const [key, setKey] = useState<string>('');
  const { request } = useRequest();
  const Context: any = useContext(SidebarContext);
  useEffect(() => {
    if (key === 'rename') {
      ModalRename();
      Context.setIsModalRenameOpen(true);
    }
  }, [key]);
  return (
    <Menu
      items={items(Context.vmKey, Context.keyRightClick, Context.nameRightClick)}
      onClick={key => {
        setKey(key.key);
        switch (key.key) {
          case 'action':
            break;
          case 'refresh':
            // void request('/api/vcenter/datacenter', 'GET', {
            //   action: Action.REFRESH,
            // }).then((res: DataNode[]) => {
            //   Context.setTreeData(InitTreeData(res));
            // });
            Context.setKeyExpanded((prev: string[]) => [...prev]);
            Context.setLoadedKeys((prev: string[]) => [...prev]);
            Context.setCheckedKeys((prev: string[]) => [...prev]);
            break;
          case 'login':
            Context.setIsModal({ UserLoginOpen: true });
            break;
          case 'clone':
            Context.setIsModal({ CloneOpen: true });
            break;
          case 'getfile':
            Context.setIsModal({ GetfileOpen: true });
            break;
          case 'copyfile':
            Context.setIsModal({ CopyfileOpen: true });
            break;
          case 'process':
            Context.setIsModal({ ProcessOpen: true });
            break;
          case key.key:
            void Context.handlePowerState(Context.keyRightClick, key.key);
            break;
        }
      }}
    />
  );
};
export default Item;
