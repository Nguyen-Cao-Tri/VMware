/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';
import MenuVm from './HandleVm/MenuVM/MenuVm';
import TableVm from './HandleVm/TableVM/TableVm';
import { useNavigate } from 'react-router-dom';
import RenderUI from './HandleVm/RenderUI/RenderUI';
import './vm.scss';

const Vm = () => {
  const { inforSelect, keyExpand, parentId } = useInfo();

  const key = inforSelect.key;
  const navigate = useNavigate();
  useEffect(() => {
    if (key || keyExpand.length > 0) {
      const uniqueChars = parentId?.filter((c: any, index: any) => {
        return parentId.indexOf(c) === index;
      });
      navigate(`/vm?selected=${key}&expanded=${uniqueChars?.concat(key).join(',')}`);
    }
    // else if (key === undefined) navigate('/vm');
  }, [key, keyExpand]);
  return (
    <>
      {key !== undefined && <MenuVm />}
      <div className="content_item">
        <div className="render_ui">
          <RenderUI />
        </div>
        <div className="table_content">{key?.includes('vm') ? <TableVm /> : ''}</div>
      </div>
    </>
  );
};

export default Vm;
