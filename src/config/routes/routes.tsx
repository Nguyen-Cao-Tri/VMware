import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
// import DemoPage from '../../pages/DemoPage/DemoPage';
import LoginForm from '../../pages/LoginForm/LoginForm';
import Demo from '../../pages/DemoPage/DemoPage';
import Test from '../../pages/TestLogic/Test';
import MoveToFolder from '../../components/Sidebar/SidebarHandle/MoveToFolder';
import PowerStart from '../../components/IconCustom/PowerStart';
import Datacenter from '../../pages/Datacenter/Datacenter';
import Folder from '../../pages/Folder/Folder';
import Vm from '../../pages/Vm/Vm';
const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/datacenter', element: <Datacenter /> },
      { path: '/group', element: <Folder /> },
      { path: '/vm', element: <Vm /> },
    ],
  },

  {
    path: '/login',
    element: <LoginForm />,
  },
  { path: 'demo', element: <Demo /> },

  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/move',
    element: <MoveToFolder />,
  },
  {
    element: <NotFound />,
    path: '*',
  },
  {
    element: <PowerStart />,
    path: '/icon',
  },
];

export default function Router(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const element = useRoutes(routes);
  return element;
}
