import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Insights from '../../insights/Insights';

const OrgnizationMaster = () => {
    const location = useLocation();
  return (
    <>
        {location.pathname === "/admin-management/orgnization-master" ? (
       <Insights />
      ) : (
        <Outlet />
      
      )}
    </>
  )
}

export default OrgnizationMaster