import React from 'react';
import 'antd/dist/antd.min.css';
// import { Tree } from 'antd';
// import useRequest from '../../hooks/useRequest/useRequest';
// import { useNavigate } from 'react-router-dom';
// import { DirectoryTreeProps } from 'antd/es/tree';

// const { DirectoryTree } = Tree;

// interface DataNode {
//   title: string;
//   key: string;
//   children?: DataNode[];
// }
const ListDatacenter: React.FC = () => {
  // const [listDatacenter, setListDatacenter] = useState<object[]>([]);
  // const { request } = useRequest();
  // const treeData: DataNode[] = [];
  // // const navigate = useNavigate();
  // const convertDataCeter = () => {
  //   if (listDatacenter.length > 0) {
  //     listDatacenter.forEach((item: any) => {
  //       const obj = {
  //         title: item.name,
  //         key: item.datacenter,
  //       };
  //       treeData.push(obj);
  //     });
  //     console.log('data are', treeData);
  //   }
  //   return treeData;
  // };
  // convertDataCeter();
  // useEffect(() => {
  //   request('/api/vcenter/datacenter', 'GET').then((res: any) => {
  //     setListDatacenter(res);
  //   });
  // }, []);
  // const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
  //   console.log('select');
  //   navigate('/vcenter/datacenter');
  // };

  // const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
  //   console.log('Trigger Expand', keys, info);
  // };

  return (
    <>
      <div>23</div>
      {/* <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        // onExpand={onExpand}
        treeData={treeData}
        style={{ width: '200px' }}
      /> */}
    </>
  );
};

export default ListDatacenter;
