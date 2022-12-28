/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../../hooks/infoProvider/InfoProvider';

const Datacenter = () => {
  const { inforSelect, keyExpand, parentId } = useInfo();

  const title = inforSelect.title;
  const keySelect = inforSelect.key;
  const navigate = useNavigate();
  useEffect(() => {
    if (keySelect || keyExpand.length > 0) {
      const uniqueChars = parentId?.filter((c: any, index: any) => {
        return parentId.indexOf(c) === index;
      });
      console.log('key', uniqueChars);
      navigate(`/datacenter?selected=${keySelect}&expanded=${uniqueChars?.concat(keySelect).join(',')}`);
    }
  }, [keySelect, keyExpand]);

  return (
    <>
      {keySelect ? (
        <>
          <div className="layout_content">
            <h3>Datacenter name: {title}</h3>
            <h4>Expand to know more information</h4>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Datacenter;
