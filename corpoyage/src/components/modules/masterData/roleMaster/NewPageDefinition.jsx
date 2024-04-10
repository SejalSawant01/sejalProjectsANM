import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'

export const pageDefCreateEdit = [
    {
        field_id: "page_master_id",
        field_label: "Page Master Id:",
        field_mandatory: false,
        field_placeholder: "Enter Page Master Id",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: true,
        field_db: "pkPageMasterId",
        err_mes: "Mandatory field",
        display: true,
      },
      {
        field_id: "page_name",
        field_label: "Page Name:",
        field_mandatory: true,
        field_placeholder: "Enter Page Name",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "pageName",
        err_mes: "Page name is required *",
        display: true,
      },
      {
        field_id: "page_title",
        field_label: "Page Title:",
        field_mandatory: false,
        field_placeholder: "Enter Page Title",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "pageTitle",
        err_mes: "Page title is required *",
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
        field_label: "Is Secure:",
        field_type: "checkbox",
        field_desc: "checkbox",
        disabled: false,
        field_value: "",
        field_db: "isSecure",
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

const NewPageDefinition = () => {

  const reqBody = {}

  return (
    <>
      <MasterPage
        title="Page Definition"
        fields={pageDefCreateEdit}
        reqBody= {reqBody}
        btn1={{ text: "Save", route: "/master-data/role-master/page-definition/new-page-definition" }}
        btn2={{ text: "Cancel", route: "/master-data/role-master/page-definition" }}
        url="pagedefination/add"
        save={true} 
      />
    </>
  )
}

export default NewPageDefinition