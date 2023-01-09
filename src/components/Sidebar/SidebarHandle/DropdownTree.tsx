/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Dropdown, Tree, TreeProps } from 'antd';
import { DataNode, SidebarContext } from '../Sidebar';
import './sidebar.scss';
import { useInfo } from '../../../hooks/infoProvider/InfoProvider';
import Item from './Item';
// import { Search } from 'react-router-dom';

const DropdownTree = () => {
  const { setOnExpand } = useInfo();
  const Context: any = useContext(SidebarContext);

  const [infoDrop, setInfoDrop] = useState<any>({});
  const onRightClick = (value: any) => {
    Context.setKeyRightClick(value.node.key);
    Context.setNameRightClick(value.node.title);
  };
  const onExpand = (value: React.Key[], info: any) => {
    if (setOnExpand != null) setOnExpand(value);
    Context.setKeyExpanded(value);
    Context.setInfoExpanded(info);
  };
  const onCheck = (value: any) => {
    Context.setKeyExpanded(value);
  };
  const updateTreeDrop = (info: any) => {
    Context.setTreeData(info);
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
      // Find dragObject
      let dragObj: DataNode;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children ?? [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else if (
        (info.node.children ?? []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children ?? [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
          // in previous version, we use item.children.push(dragObj) to insert the
          // item to the tail of the children
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
            treeData={Context.treeData}
            loadData={Context.onLoadData}
            loadedKeys={Context.loadedKeys}
            checkedKeys={Context.checkedKeys}
            expandedKeys={Context.keyExpanded}
            onRightClick={Context.onRightClick}
            onDrop={info => {
              onDrop(info);
              setInfoDrop(info);
            }}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default DropdownTree;
