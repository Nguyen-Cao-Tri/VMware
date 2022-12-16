/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import '../../components/Content/content.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';
import { LaptopOutlined, FolderOutlined } from '@ant-design/icons';
const Folder = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const title = inforContext?.inforSelect.title;
  const key = inforContext?.inforSelect.key;
  const children = inforContext?.inforSelect.children;
  const RenderUI = () => {
    const totalFolder = children?.filter(
      (itemFolder: any) =>
        itemFolder.folder?.includes('group') ||
        itemFolder.key?.includes('group'),
    );
    const totalVm = children?.filter(
      (itemVm: any) => itemVm.vm?.includes('vm') || itemVm.key?.includes('vm'),
    );
    return (
      <div style={{ padding: '20px' }}>
        <h3>Folder name: {title}</h3>
        {children?.length >= 0 ? (
          <div>
            <h4>
              <LaptopOutlined />: {totalFolder.length}
            </h4>
            <h4>
              <FolderOutlined />: {totalVm.length}
            </h4>
          </div>
        ) : (
          <h4>Expand to know more information</h4>
        )}
      </div>
    );
  };
  return (
    <>
      {key && (
        <>
          <div className="nav">
            <div className="title">
              <span>{title}</span>
            </div>
          </div>
          <RenderUI />
        </>
      )}
    </>
  );
};

export default Folder;
