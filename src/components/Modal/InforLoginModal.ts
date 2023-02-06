/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import { DataNode, SidebarContext } from '../Sidebar/Sidebar';
export const InforLogin = () => {
  const [inforLogin, setInforLogin] = useState<string[]>([]);
  const Context: any = useContext(SidebarContext);
  const inforLoginLocalStorage: any = localStorage.getItem('username_password');
  const treeDataLogin = JSON.parse(inforLoginLocalStorage);
  const arr: any[] = [];
  const findInforLogin = (list: DataNode[]) => {
    list?.map((item: any) => {
      if (item.key === Context.keyRightClick) {
        arr.push([item.username, item.password]);
      }
      if (item.children !== undefined) findInforLogin(item.children);
    });
    return arr;
  };
  const account = findInforLogin(treeDataLogin);
};
