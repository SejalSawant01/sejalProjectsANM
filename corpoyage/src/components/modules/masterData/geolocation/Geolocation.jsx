import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Insights from '../../insights/Insights';

const Geolocation = () => {
    const location = useLocation();
  return (
    <>
        {location.pathname === "/master-data/geolocation" ? (
       <Insights />
      ) : (
        <Outlet />
      
      )}
    </>
  )
}

export default Geolocation