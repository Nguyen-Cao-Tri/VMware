/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Key, useState } from 'react';
import { Dropdown, Tree } from 'antd';
import { DataNode } from '../Sidebar';
import { DirectoryTreeProps } from 'antd/es/tree';

interface PropsDropdown {
  onLoadData: ({ key }: any) => Promise<void>;
  treeData: DataNode[];
  item: any;
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
}
const DropdownTree = ({
  onLoadData,
  treeData,
  item,
  onRightClick,
  onSelect,
  onExpand,
  expandedKeys,
  onCheck,
  loadedKeys,
}: PropsDropdown) => {
  return (
    <Dropdown autoFocus overlay={item} trigger={['contextMenu']}>
      <div
        className="site-dropdown-context-menu"
        style={{
          textAlign: 'center',
          height: 200,
          lineHeight: '200px',
          width: 200,
        }}
      >
        <Tree
          checkable
          showIcon={true}
          defaultExpandParent={true}
          loadData={onLoadData}
          loadedKeys={loadedKeys}
          treeData={treeData}
          showLine={true}
          onCheck={onCheck}
          onRightClick={onRightClick}
          onSelect={onSelect}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          style={{
            width: '350px',
            height: '500px',
            paddingTop: '20px',
          }}
        />
      </div>
    </Dropdown>
  );
};

export default DropdownTree;
