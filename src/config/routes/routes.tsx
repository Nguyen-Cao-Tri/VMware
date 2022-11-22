import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
// import DemoPage from '../../pages/DemoPage/DemoPage';
import LoginForm from '../../pages/LoginForm/LoginForm';
import Demo from '../../pages/DemoPage/DemoPage';
const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    // children: [
    //   { path: 'api/vcenter/datacenter', element: <DemoPage /> },
    //   { path: 'api/vcenter/folder', element: <DemoPage /> },
    //   { path: 'api/vcenter/vm', element: <DemoPage /> },
    //   { path: 'demo', element: <DemoPage /> },
    // ],
  },
  { path: 'demo', element: <Demo /> },
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
