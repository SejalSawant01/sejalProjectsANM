import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'
import { Outlet, useLocation } from 'react-router-dom';
import { pageDefCreateEdit } from './NewPageDefinition';


export const pageDefSearch = [
    {
        field_id: "page_code",
        field_label: "Page Code:",
        field_mandatory: false,
        field_placeholder: "Enter Page Code",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "pageCode",
        err_mes: "",
        display: true,
      },
      {
        field_id: "page_name",
        field_label: "Page Name:",
        field_mandatory: false,
        field_placeholder: "Enter Page Name",
        field_type: "text",
        field_value: "",
        field_desc: "text",
        select_type: "none",
        disabled: false,
        field_db: "pageName",
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

 
const PageDefinition = () => {
    const location = useLocation();

  return (
    <>
    {location.pathname === "/master-data/role-master/page-definition" ? (
      <MasterPage
        title="Page Definition"
        fields={pageDefSearch}
        btn1={{ text: "Search", route: "/master-data/role-master/page-definition" }}
        btn2={{ text: "New", route: "/master-data/role-master/page-definition/new-page-definition" }}
        url="pagedefination/search"
        deleteurl="pagedefination/delete"
        deleteid = "pkPageMasterId"
        save={false}
        editbtn1={{ text: "Edit", edit: "UPDATE", route: "/master-data/role-master/page-definition" }}
        editbtn2={{ text: "CANCEL", edit: "EDIT", route: "/master-data/role-master/page-definition" }}
        editurl="pagedefination/update"
        editfields={pageDefCreateEdit}
      />
    ) : (
      <Outlet />
    )}
  </>
  )
}

export default PageDefinition