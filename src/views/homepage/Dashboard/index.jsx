import React, { useEffect } from 'react';
const Dashboard = () => {
  useEffect(() => {
    console.log(SYSTEM_BUILD_TARGET);
  }, []);
  return <div>Dashboard{SYSTEM_BUILD_TARGET}</div>;
};
export default Dashboard;
