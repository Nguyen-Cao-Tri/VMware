/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest/useRequest';

const PowerState = () => {
  const { request } = useRequest();
  const [action, setAction] = useState<string>('off');
  const vm = 'vm-17';
  useEffect(() => {
    request(`/api/vcenter/vm/${vm}/power?action=${action}`, 'POST')
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error.response);
      });
  }, []);

  return <div>Test</div>;
};
export default PowerState;
