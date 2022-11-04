import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Tree } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

const { DirectoryTree } = Tree;
// const treeData = [
//   {
//     title: 'parent 0',
//     key: '0-0',
//     children: [
//       { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
//       { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
//     ],
//   },
//   {
//     title: 'parent 1',
//     key: '0-1',
//     children: [
//       { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
//       { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
//     ],
//   },
// ];

const ListTree: React.FC = () => {
  const [datacenter, setDatacenter] = useState<object[]>([]);
  const [folder, setFolder] = useState<object[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const { request } = useRequest();
  useEffect(() => {
    request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      setDatacenter(res);
    });
    request('/api/vcenter/folder', 'GET').then((res: any) => setFolder(res));
  }, []);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    // console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    // console.log('Trigger Expand', keys, info);
  };
  console.log('datacenter', typeof datacenter);
  console.log('folder', folder);

  return (
    <>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        // treeData={}
        style={{ width: '200px' }}
      />
      {/* {datacenter.map((item:{name:string;datacenter:string})=>{
      return (
       
    <DirectoryTree key={item.datacenter}
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={
          title:`${item.name}`
        }
    />
      );
    })} */}
    </>
  );
};

export default ListTree;
