import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Insights from '../../insights/Insights';

const RoleMaster = () => {
    const location = useLocation();
    return (
      <>
          {location.pathname === "/master-data/role-master" ? (
         <Insights />
        ) : (
          <Outlet />
        
        )}
      </>
    )
}

export default RoleMaster