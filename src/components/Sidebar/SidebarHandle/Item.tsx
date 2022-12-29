import { Menu } from 'antd';
import React, { useContext } from 'react';
import { Action } from '../../../hooks/logProvider/LogProvider';
import useRequest from '../../../hooks/useRequest/useRequest';
import { items } from '../../../utils/items';
import { DataNode, SidebarContext } from '../Sidebar';
import { InitTreeData } from './InitTreeData';

const Item = () => {
  const { request } = useRequest();
  const Context: any = useContext(SidebarContext);
  return (
    <Menu
      items={items(Context.vmKey, Context.keyRightClick, Context.nameRightClick)}
      onClick={key => {
        switch (key.key) {
          case 'action':
            break;
          case 'rename':
            Context.setIsModalRenameOpen(true);
            Context.setRenameInput(Context.keyRightClick);
            break;
          case 'refresh':
            void request('/api/vcenter/datacenter', 'GET', {
              action: Action.REFRESH,
            }).then((res: DataNode[]) => {
              Context.setTreeData(InitTreeData(res));
            });
            Context.setKeyExpanded([]);
            Context.setLoadedKeys([]);
            Context.setCheckedKeys([]);
            break;
          case 'login':
            Context.setIsModalUserLoginOpen(true);
            break;
          case 'clone':
            Context.setIsModalCloneOpen(true);
            break;
          case 'getfile':
            Context.setIsModalGetfileOpen(true);
            break;
          case 'copyfile':
            Context.setIsModalCopyfileOpen(true);
            break;
          case 'process':
            Context.setIsModalProcessOpen(true);
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
