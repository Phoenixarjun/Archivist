import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${user?.firstName}!`} />
      {/* Dashboard content like StatCards and tables will go here */}
    </>
  );
};

export default DashboardPage;