import React from 'react'
import Insights from '../insights/Insights'
import { Outlet, useLocation } from 'react-router-dom';

const AdminManagement = () => {
  const location = useLocation();

  return (
    <>
      
    {location.pathname === "/admin-management" ? (
       <Insights />
      ) : (
        <Outlet />
      
      )}
    </>
  )
}

export default AdminManagement