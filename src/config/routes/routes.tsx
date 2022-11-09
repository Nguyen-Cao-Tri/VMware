import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import DefaultLayout from '../../layouts/DefaultLayout';
import ListFolder from '../../pages/ListFolder/ListFolder';
import DemoPage from '../../pages/DemoPage/DemoPage';
import LoginForm from '../../pages/LoginForm/LoginForm';

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: 'api/vcenter/datacenter', element: <ListFolder /> },
      { path: 'api/vcenter/folder', element: <ListFolder /> },
      { path: 'api/vcenter/vm', element: <ListFolder /> },
      { path: 'demo', element: <DemoPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
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
