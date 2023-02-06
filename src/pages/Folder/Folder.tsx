/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import '../../components/Content/content.scss';
import { LaptopOutlined, FolderOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { HiOutlineChip } from 'react-icons/hi';
import { FaMemory } from 'react-icons/fa';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { vcenterAPI } from 'api/vcenterAPI';
const { Panel } = Collapse;
interface IFolder {
  folder: string;
  name: string;
  type: string;
}
const Folder = () => {
  const [searchParams] = useSearchParams();
  const [inforFolder, setInforFolder] = useState<IFolder>({ folder: '', name: '', type: '' });
  const { inforSelect, vm, keyExpand, arrayFormatTreeData } = useInfo();
  const keySelect = inforSelect.key;
  const children = inforSelect.children;
  const navigate = useNavigate();
  useEffect(() => {
    void vcenterAPI.getFolders(keySelect).then(res => setInforFolder(res[0]));
    const idParentStorage: any = localStorage.getItem('idParent');
    if (arrayFormatTreeData?.length === 0) {
      JSON.parse(idParentStorage)?.map((item: any) => {
        arrayFormatTreeData.push(item);
      });
    }
    if (keySelect || keyExpand.length > 0) {
      const idParent: string[] = [];
      const keyParent: string[] = [];
      arrayFormatTreeData?.map((item: any) => {
        if (item[0].key === keySelect) {
          idParent.push(item[0].idParent);
        }
      });
      arrayFormatTreeData?.map((item: any) => {
        if (idParent[0].length > item[0].idParent.length) {
          if (idParent[0]?.slice(0, item[0].idParent.length).includes(item[0].idParent)) {
            keyParent.push(item[0].key);
          }
        } else {
          if (idParent[0]?.includes(item[0].idParent)) {
            keyParent.push(item[0].key);
          }
        }
      });
      navigate(`/group?selected=${keySelect}&expanded=${keyParent.join(',')}`);
    }
  }, [keySelect, keyExpand]);
  const RenderUI = () => {
    const totalFolder = children?.filter(
      (itemFolder: any) => itemFolder.folder?.includes('group') || itemFolder.key?.includes('group'),
    );
    const totalVm = children?.filter((itemVm: any) => itemVm.vm?.includes('vm') || itemVm.key?.includes('vm'));
    console.log('inforFolder?.name', inforFolder?.name);

    return (
      <div style={{ padding: '20px' }}>
        <div className="render_summary">
          <div>
            <h3>Folder name: {inforFolder?.name}</h3>
            {children?.length >= 0 ? (
              <div>
                <h4>
                  <LaptopOutlined />: {totalVm.length}
                </h4>
                <h4>
                  <FolderOutlined />: {totalFolder.length}
                </h4>
              </div>
            ) : (
              <h4>Expand to know more information</h4>
            )}
          </div>
          <div className="summary">
            <table>
              <tr>
                <td>
                  <HiOutlineChip className="icon_summary fs" />
                </td>
                <td>
                  <div> CPU USAGE</div>
                  <div>{vm.cpu?.count}0</div>
                </td>
              </tr>
              <tr>
                <td>
                  <FaMemory className="icon_summary fs2 " style={{ marginLeft: '3px' }} />
                </td>
                <td className="memory">
                  <div> MEMORY USAGE</div>
                  <div>{vm.memory?.size_MiB} MB</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="table_folder">
          <div className="item_table" style={{ marginRight: '20px' }}>
            <Collapse collapsible="header" defaultActiveKey={['1']}>
              <Panel header="Compute Policies" key="1">
                <a href="#">View all policies</a>
              </Panel>
            </Collapse>
          </div>
          <div className="item_table">
            <Collapse collapsible="header" defaultActiveKey={['2']}>
              <Panel header="Notes" key="2">
                <span style={{ opacity: 0.4 }}>Edit Notes...</span>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="nav">
        <div className="title">
          <span>{inforFolder?.name}</span>
        </div>
      </div>
      <RenderUI />
    </>
  );
};

export default Folder;
