import React, { useMemo } from 'react';
// import { useLog } from '../hooks/logProvider/LogProvider';

/* eslint-disable @typescript-eslint/promise-function-async */

export default function DemoPage() {
  const a = 3;
  const b = 4;
  const test = useMemo(() => {
    const testMemo = () => {
      console.log('hi', a + b);
    };
    console.log(typeof testMemo);
    return testMemo;
  }, [a, b]);
  test();

  // const { log } = useLog();
  // // const log = (x: number) => {
  // //   return new Promise<void>((resolve) => {
  // //     setTimeout(() => {
  // //       console.log('hi', x);
  // //       resolve();
  // //     }, 1000);
  // //   });
  // // };

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   if (typeof log === 'function') {
  //     log('This is log');
  //   }
  //   // }, 3000);
  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, []);

  return <div>Demo Page</div>;
}
