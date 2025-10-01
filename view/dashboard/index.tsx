'use client';

import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  return <div>Dashboard</div>;
};

export default Dashboard;
