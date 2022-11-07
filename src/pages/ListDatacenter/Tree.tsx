import React from 'react';
interface DataNode {
  name: string;
  key: string;
  parentKey?: string;
  children?: DataNode[];
}
const nodes: DataNode[] = [
  {
    name: 'parent 1',
    key: '0-0',
  },
  {
    name: 'parent 2',
    key: '0-1',
  },
  {
    name: 'parent 1 - child 1',
    key: '0-0-0',
    parentKey: '0-0',
  },
  {
    name: 'parent 1 - child 2',
    key: '0-0-1',
    parentKey: '0-0',
  },
];
const listToTree = (nodes: DataNode[]) => {
  const hashTable = Object.create(null);
  console.log('hastTB', hashTable);
  nodes.forEach((node) => {
    hashTable[node.key] = {
      ...node,
      children: [],
    };
  });
  const nodeTree: DataNode[] = [];
  nodes.forEach((node) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (node.parentKey && hashTable[node.parentKey]) {
      hashTable[node.parentKey].children.push(hashTable[node.key]);
      console.log(hashTable);
    } else {
      nodeTree.push(hashTable[node.key]);
      console.log(nodeTree);
    }
  });
  return nodeTree;
};
const Tree = () => {
  listToTree(nodes);
  console.log(Tree);
  return <div>tree</div>;
};

export default Tree;
