/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import useRequest from '../../hooks/useRequest/useRequest';
import { EventDataNode } from 'antd/lib/tree';
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// It's just a simple demo. You can use tree map to optimize update perf.
const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
  list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const Demo: React.FC = () => {
  const { request } = useRequest();
  const initTreeData = (data: DataNode[]) => {
    const newData: DataNode[] = [];
    data?.forEach((item: any) => {
      const obj = {
        title: item.name,
        key: item.datacenter,
        children: [],
      };
      newData.push(obj);
    });
    setTreeData(newData);
  };
  const [initData, setInitData] = useState<DataNode[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>(initData);
  const [expandedKey, setExpandedKey] = useState<string>('');
  useEffect(() => {
    void request('/api/vcenter/datacenter', 'GET').then((res: any) => {
      initTreeData(res);
      setInitData(res);
    });
  }, []);
  const getData = async (param: string, keys: string) => {
    try {
      const response = await request(`/api/vcenter/${param}`, 'GET');
      const data: DataNode[] = [];
      response.forEach((item: any) => {
        if (item[param].includes(keys)) {
          const obj = {
            title: item.name,
            key: item[param],
          };
          data.push(obj);
        }
        setTreeData(updateTreeData(treeData, keys, data));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onExpand = (expandedKeysValue: React.Key[], info: { node: EventDataNode<DataNode> }) => {
    const selectedKey = expandedKeysValue[expandedKeysValue.length - 1];
    const keyCheck = selectedKey?.toString().length;
    console.log('length', keyCheck);
    setExpandedKey(info.node.key);
  };
  const onLoadData = ({ key, children }: any) =>
    new Promise<void>(resolve => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData(origin =>
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ]),
        );
        resolve();
      }, 1000);
    });
  return <Tree loadData={onLoadData} treeData={treeData} onExpand={onExpand} />;
};

export default Demo;
