/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

const Content = (props: any) => {
  const render = props.infors?.node.title;
  console.log('render', render);
  console.log('key content', props.infors?.node.key);

  const data = props.data;
  console.log('data content', data);
  // const sumChildren = data?.filter((item: any) =>
  //   item.id.includes(props.infors?.node.key),
  // );
  const RenderUI = () => {
    if (render?.includes('Datacenter')) {
      return (
        <>
          <h3 style={{ padding: '20px' }}>{render}</h3>
        </>
      );
    }
    if (render?.includes('Folder')) {
      return (
        <div style={{ padding: '20px' }}>
          <h3>{render}</h3>
          {/* <div> Virtual Machines: {sumChildren.length}</div> */}
        </div>
      );
    }
    return (
      <h3 style={{ padding: '20px' }}>
        Chose Datacenter to know more information
      </h3>
    );
  };
  return <RenderUI />;
};

export default Content;
