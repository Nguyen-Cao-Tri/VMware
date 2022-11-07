import React from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import DefaultLayout from '../../layouts/DefaultLayout';
import LoginForm from '../../components/LoginForm/LoginForm';

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [{ path: 'auth/login', element: <LoginForm /> }],
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
