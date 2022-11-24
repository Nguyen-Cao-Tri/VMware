import { DataNode } from '../Sidebar';

export const UpdateTreeData = (
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] =>
  list.map((node: any) => {
    if (node.key === key) {
      return {
        ...node,
        children: [...children],
      };
    }
    if (node.children != null) {
      return {
        ...node,
        children: UpdateTreeData(node.children, key, children),
      };
    }
    return node;
  });
