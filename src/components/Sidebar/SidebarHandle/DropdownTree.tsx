/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Key, useState } from 'react';
import { Dropdown, Tree, TreeProps } from 'antd';
import { DataNode } from '../Sidebar';
import type { MenuProps } from 'antd';
import { DirectoryTreeProps } from 'antd/es/tree';
import './sidebar.scss';
interface PropsDropdown {
  onLoadData: ({ key }: any) => Promise<void>;
  treeData: DataNode[];
  items: any;
  onRightClick: ({ info }: any) => void;
  onSelect: (selectedKeysValue: React.Key[], info: any) => void;
  onExpand?: (expandedKeysValue: React.Key[], info: any) => void;
  expandedKeys?: React.Key[];
  onCheck?:
    | ((
        checked:
          | Key[]
          | {
              checked: Key[];
              halfChecked: Key[];
            },
        info: any,
      ) => void)
    | undefined;
  loadedKeys?: Key[];
  checkedKeys?: Key[];
  onDragEnter?: (info: any) => void;
  updateTreeDrop: (info: any) => void;
  theme?: string;
}
const DropdownTree = ({
  onLoadData,
  treeData,
  items,
  onRightClick,
  onSelect,
  onExpand,
  expandedKeys,
  onCheck,
  loadedKeys,
  checkedKeys,
  onDragEnter,
  updateTreeDrop,
  theme,
}: PropsDropdown) => {
  const [infoDrop, setInfoDrop] = useState<any>({});
  const onDrop: TreeProps['onDrop'] = info => {
    console.log('info drop', info);
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
      const data = [...treeData];
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

  return (
    <>
      <Dropdown autoFocus overlay={items} trigger={['contextMenu']}>
        <div
          className="site-dropdown-context-menu"
          // style={{
          //   textAlign: 'center',
          //   height: '100%',
          //   lineHeight: '200px',
          //   width: '100%',
          // }}
        >
          <Tree
            // className={`${theme}`}
            className="tree"
            checkable
            draggable
            showIcon={true}
            defaultExpandParent={true}
            loadData={onLoadData}
            loadedKeys={loadedKeys}
            treeData={treeData}
            showLine={true}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onRightClick={onRightClick}
            onSelect={onSelect}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            onDragEnter={onDragEnter}
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
