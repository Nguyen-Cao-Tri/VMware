/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Dropdown, Tree, TreeProps } from 'antd';
import { SidebarContext } from '../Sidebar';
import './sidebar.scss';
import { useInfo } from '../../../hooks/infoProvider/InfoProvider';
import Item from './Item';
import { DataNode } from 'hooks/infoProvider/TypeInfo';
// import { Search } from 'react-router-dom';

const DropdownTree = () => {
  const Context: any = useContext(SidebarContext);
  const {
    setOnExpand,
    loadedKeys,
    treeData,
    checkedKeys,
    keyExpand,
    setCheckedKey,
    setNameClick,
    setKeyClick,
    setTreeDatas,
  } = useInfo();
  const onRightClick = (value: any) => {
    if (setKeyClick && setNameClick) {
      setKeyClick(value.node.key);
      setNameClick(value.node.title);
    }
  };
  const onExpand = (value: React.Key[], info: any) => {
    if (setOnExpand != null) setOnExpand(value);
  };
  const onCheck = (value: any) => {
    if (setCheckedKey != null) setCheckedKey(value);
  };
  const updateTreeDrop = (info: any) => {
    if (setTreeDatas != null) setTreeDatas(info);
  };
  const onDrop: TreeProps['onDrop'] = info => {
    const dropKey = info?.node?.key;
    const dragKey = info?.dragNode?.key;
    const dropPos = info?.node?.pos.split('-');
    if (dropPos?.length > 0) {
      const dropPosition = info?.dropPosition - Number(dropPos[dropPos?.length - 1]);
      const loop = (
        data: DataNode[],
        key: React.Key,
        callback: (node: DataNode, i: number, data: DataNode[]) => void,
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children != null) {
            loop(data[i].children!, key, callback);
          }
        }
      };
      const data = [...Context.treeData];
      let dragObj: DataNode;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (!info.dropToGap) {
        loop(data, dropKey, item => {
          item.children = item.children ?? [];
          item.children.unshift(dragObj);
        });
      } else if ((info.node.children ?? []).length > 0 && info.node.expanded && dropPosition === 1) {
        loop(data, dropKey, item => {
          item.children = item.children ?? [];
          item.children.unshift(dragObj);
        });
      } else {
        let ar: DataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i!, 0, dragObj!);
        } else {
          ar.splice(i! + 1, 0, dragObj!);
        }
      }
      updateTreeDrop(data);
    }
  };

  const onSelect = (value: any, info: any) => Context.handleOnSelect(value, info);

  return (
    <>
      <Dropdown overlay={<Item />} trigger={['contextMenu']}>
        <div className="site-dropdown-context-menu">
          <Tree
            className="tree"
            checkable
            draggable
            showIcon={true}
            showLine={true}
            onCheck={onCheck}
            onSelect={onSelect}
            onExpand={onExpand}
            defaultExpandParent={true}
            treeData={treeData}
            loadData={Context.onLoadData}
            loadedKeys={loadedKeys}
            checkedKeys={checkedKeys}
            expandedKeys={keyExpand}
            onRightClick={onRightClick}
            onDrop={info => {
              onDrop(info);
            }}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default DropdownTree;
