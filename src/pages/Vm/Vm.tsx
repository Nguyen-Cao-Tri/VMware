/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
import MenuVm from './HandleVm/MenuVM/MenuVm';
import TableVm from './HandleVm/TableVM/TableVm';
import { useNavigate } from 'react-router-dom';
import { vcenterAPI } from 'api/vcenterAPI';
import RenderUI from './HandleVm/RenderUI/RenderUI';
import './vm.scss';

// interface IVm {
//   memory_size_MiB: number;
//   vm: string;
//   name: string;
//   power_state: string;
//   cpu_count: number;
// }
const Vm = () => {
  // const [inforVm, setInforVm] = useState<IVm>({ memory_size_MiB: 0, vm: '', name: '', power_state: '', cpu_count: 0 });
  const { inforSelect, keyExpand, arrayFormatTreeData } = useInfo();
  const keySelect = inforSelect.key;
  const navigate = useNavigate();
  useEffect(() => {
    // void vcenterAPI.getVms(keySelect).then(inforVm => setInforVm(inforVm[0]));
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
      navigate(`/vm?selected=${keySelect}&expanded=${keyParent.join(',')}`);
    }
  }, [keySelect, keyExpand]);
  return (
    <>
      <MenuVm />
      <div className="content_item">
        <div className="render_ui">
          <RenderUI />
        </div>
        <div className="table_content">{keySelect?.includes('vm') ? <TableVm /> : ''}</div>
      </div>
    </>
  );
};

export default Vm;
