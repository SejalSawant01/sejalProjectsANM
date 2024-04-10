import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'

export const roleDefCreateEdit = [
    {
        field_id: "role_master_id",
        field_label: "Role Master Id:",
        field_mandatory: false,
        field_placeholder: "Enter Role Master Id",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: true,
        field_db: "pkRoleMasterId",
        err_mes: "Mandatory field",
        display: true,
      },
      {
        field_id: "role_name",
        field_label: "Role Name:",
        field_mandatory: true,
        field_placeholder: "Enter Role Name",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "roleName",
        err_mes: "Role name is required *",
        display: true,
      },
      {
        field_id: "description",
        field_label: "Description:",
        field_mandatory: false,
        field_placeholder: "Enter Description",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "description",
        err_mes: "",
        display: true,
      },
      {
        field_id: "is_active",
        field_label: "Is Active:",
        field_type: "checkbox",
        field_desc: "checkbox",
        disabled: false,
        field_value: "",
        field_db: "isActive",
        display: true,
      },      
  ];

const NewRoleDefinition = () => {

  const reqBody = {
    moduleName : ""
  }

  return (
    <>
      <MasterPage
        title="Role Definition"
        fields={roleDefCreateEdit}
        reqBody= {reqBody}
        btn1={{ text: "Save", route: "/master-data/role-master/role-definition/new-role-definition" }}
        btn2={{ text: "Cancel", route: "/master-data/role-master/role-definition" }}
        url="roledefination/add"
        save={true} 
      />
    </>
  )
}

export default NewRoleDefinition