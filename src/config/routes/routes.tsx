import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import DefaultLayout from '../../layouts/DefaultLayout';
import VMware from '../../pages/VMware/VMware';
import ListTree from '../../components/ListTree/ListTree';

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <VMware /> },
      { path: 'vcenter/datacenter', element: <ListTree /> },
    ],
  },
  {
    element: <NotFound />,
    path: '*',
  },
];

export default function Router(): React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null {
  const element = useRoutes(routes);
  return element;
}
