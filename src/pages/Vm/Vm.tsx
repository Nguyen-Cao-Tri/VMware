/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext } from 'react';
import '../../components/Content/content.scss';
// import { InformationContext } from '../../layouts/DefaultLayout/DefaultLayout';

import MenuVm from './HandleVm/MenuVM/MenuVm';
import TableVm from './HandleVm/TableVM/TableVm';
import './vm.scss';
import RenderUI from './HandleVm/RenderUI/RenderUI';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';

const Vm = () => {
  // const inforContext: any = useContext(InformationContext);
  const { inforSelect } = useInfo();

  console.log('inforSelect', inforSelect);
  const key = inforSelect.key;
  return (
    <>
      {/* <div className={inforContext.curentTheme}> */}
      {key !== undefined && <MenuVm />}
      <div className="content_item">
        <div className="render_ui">
          <RenderUI />
        </div>
        <div className="table_content">{key?.includes('vm') ? <TableVm /> : ''}</div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Vm;
