import React from 'react';
import { Outlet } from 'react-router-dom';
import ListDatacenter from '../components/ListDatacenter/ListDatacenter';
export default function DefaultLayout() {
  return (
    <div>
      <ListDatacenter />
      <Outlet />
    </div>
  );
}
