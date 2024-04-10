import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import ForgotPassword from "../components/auth/ForgotPassword";
import Home from "../components/home/Home";
import MasterData from "../components/modules/masterData/MasterData";
import City from "../components/modules/masterData/geolocation/City";
import NewCity from "../components/modules/masterData/geolocation/NewCity";
import AdminManagement from "../components/modules/adminManagement/AdminManagement";
import ExpenseManagement from "../components/modules/expenseManagement/ExpenseManagement";
import Insights from "../components/modules/insights/Insights";
import Country from "../components/modules/masterData/geolocation/Country";
import NewCountry from "../components/modules/masterData/geolocation/NewCountry";
import State from "../components/modules/masterData/geolocation/State";
import NewState from "../components/modules/masterData/geolocation/NewState";
import Geolocation from "../components/modules/masterData/geolocation/Geolocation";
import OrgnizationMaster from "../components/modules/adminManagement/orgnizationMaster/OrgnizationMaster";
import OrgnizationRegistration from "../components/modules/adminManagement/orgnizationMaster/OrgnizationRegistration";
import OrgnizationStaffRegistration from "../components/modules/adminManagement/orgnizationMaster/OrgnizationStaffRegistration";
import NewOrgnizationRegistration from "../components/modules/adminManagement/orgnizationMaster/NewOrgnizationRegistration";
import NewOrgnizationStaffRegistration from "../components/modules/adminManagement/orgnizationMaster/NewOrgnizationStaffRegistration";
import RoleMaster from "../components/modules/masterData/roleMaster/RoleMaster";
import RoleDefinition from "../components/modules/masterData/roleMaster/RoleDefinition";
import NewRoleDefinition from "../components/modules/masterData/roleMaster/NewRoleDefinition";
import PageDefinition from "../components/modules/masterData/roleMaster/PageDefination";
import NewPageDefinition from "../components/modules/masterData/roleMaster/NewPageDefinition";
import { UnProtectedRoute } from "./UnProtectedRoute";
import { ProtectedRoute } from "./ProtectedRoute";

const Routing = createBrowserRouter([
  { path: "/login", element: <UnProtectedRoute><Login /></UnProtectedRoute> },
  { path: "/forgot-password", element: <UnProtectedRoute><ForgotPassword /></UnProtectedRoute> },
  { path: "/", element: <UnProtectedRoute><Home /></UnProtectedRoute>, children: [
      { path: "/insights", element: <Insights /> },
      { path: "/master-data", element: <MasterData />,children: [
        { path: "geolocation", element:<Geolocation />,children: [
          { path: "city", element: <City /> , children: [ { path: "new-city", element: <NewCity />}]},
          { path: "country", element: <Country />, children: [{ path: "new-country", element: <NewCountry /> }]},
          { path: "state", element: <State />, children: [{ path: "new-state", element: <NewState /> }]},
        ] },
        { path: "role-master", element:<RoleMaster />,children: [
          { path: "role-definition", element: <RoleDefinition /> , children: [ { path: "new-role-definition", element: <NewRoleDefinition />}]},
          { path: "page-definition", element: <PageDefinition /> , children: [ { path: "new-page-definition", element: <NewPageDefinition />}]},
          
        ] },
      ] },
      { path: "/admin-management", element: <AdminManagement />, children:[
        { path: "orgnization-master", element:<OrgnizationMaster />,children: [
          { path: "organization-registration", element: <OrgnizationRegistration /> , children: [ { path: "new-organization-registration", element: <NewOrgnizationRegistration />}]},
          { path: "organization-staff-registration", element: <OrgnizationStaffRegistration />, children: [{ path: "new-organization-staff-registration", element: <NewOrgnizationStaffRegistration /> }]},
        ] },
      ] },
      { path: "/expense-management", element: <ExpenseManagement /> },
      
      
    ],
  },
]);

export default Routing;
