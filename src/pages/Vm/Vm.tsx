/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import '../../components/Content/content.scss';
import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

import MenuVm from './HandleVm/MenuVM/MenuVm';
import TableVm from './HandleVm/TableVM/TableVm';
import './vm.scss';
import RenderUI from './HandleVm/RenderUI/RenderUI';

const Vm = () => {
  const inforContext: any = useContext(InformationContext);

  console.log('inforSelect', inforContext?.inforSelect);
  const key = inforContext?.inforSelect.key;
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
