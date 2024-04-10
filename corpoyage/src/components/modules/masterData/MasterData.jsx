import React from 'react'
import Insights from '../insights/Insights'
import { Outlet, useLocation } from 'react-router-dom'

const MasterData = () => {
  const location = useLocation();

  return (
    <>
    
  
    {location.pathname === "/master-data" ? (
       <Insights />
      ) : (
        <Outlet />
      
      )}
    </>
  )
}

export default MasterData