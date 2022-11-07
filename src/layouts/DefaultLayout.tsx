import React from 'react';
import { Outlet } from 'react-router-dom';
import ListDatacenter from '../pages/ListDatacenter/ListDatacenter';
export default function DefaultLayout() {
  return (
    <div>
      <ListDatacenter />
      <Outlet />
    </div>
  );
}
