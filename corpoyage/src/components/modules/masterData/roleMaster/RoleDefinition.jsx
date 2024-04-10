import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'
import { Outlet, useLocation } from 'react-router-dom';
import { roleDefCreateEdit } from './NewRoleDefinition';


export const roleDefSearch = [
  {
    field_id: "role_master_id",
    field_label: "Role Code:",
    field_mandatory: false,
    field_placeholder: "Enter Role Code",
    field_type: "text",
    field_value: "",
    field_desc: "text",
    select_type: "none",
    disabled: false,
    field_db: "roleCode",
    err_mes: "",
    display: true,
  },
  {
    field_id: "role_name",
    field_label: "Role Name:",
    field_mandatory: false,
    field_placeholder: "Enter Role Name",
    field_type: "text",
    field_value: "",
    field_desc: "text",
    select_type: "none",
    disabled: false,
    field_db: "roleName",
    err_mes: "",
    display: true,
  },
  {
    field_id: "is_active",
    field_label: "Is Active:",
    field_type: "checkbox",
    field_desc: "checkbox",
    field_value: "",
    field_db: "isActive",
    display: true,
  },
];


const RoleDefinition = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/master-data/role-master/role-definition" ? (
        <MasterPage
          title="Role Definition"
          fields={roleDefSearch}
          btn1={{ text: "Search", route: "/master-data/role-master/role-definition" }}
          btn2={{ text: "New", route: "/master-data/role-master/role-definition/new-role-definition" }}
          url="roledefination/search"
          deleteurl="roledefination/delete" 
          deleteid="pkRoleMasterId"
          save={false}
          editbtn1={{ text: "Edit", edit: "UPDATE", route: "/master-data/role-master/role-definition" }}
          editbtn2={{ text: "CANCEL", edit: "EDIT", route: "/master-data/role-master/role-definition" }}
          editurl="roledefination/update"
          editfields={roleDefCreateEdit}
        />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default RoleDefinition