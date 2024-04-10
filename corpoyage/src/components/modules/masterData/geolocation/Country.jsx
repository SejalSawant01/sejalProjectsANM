import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'
import { Outlet, useLocation } from 'react-router-dom';

const Country = () => {
  const location = useLocation();
    const country = [
        {
            field_id: "prod_master_id",
            field_label: "Country Name:",
            field_mandatory: false,
            field_placeholder: "Enter Country Name",
            field_type: "text",
            field_value: "",
            field_desc: "text",
            select_type: "none",
            disabled: false,
            field_db: "countryName",
            err_mes: "Mandatory field",
            display: true,
          },
          {
            field_id: "product_name",
            field_label: "Country Code:",
            field_mandatory: false,
            field_placeholder: "Enter Country Code",
            field_type: "text",
            field_value: "",
            field_desc: "text",
            select_type: "none",
            disabled: false,
            field_db: "countryCode",
            err_mes: "",
            display: true,
          },
        //   {
        //     field_id: "product_name",
        //     field_label: "Country Code:",
        //     field_mandatory: false,
        //     field_placeholder: "Enter Country Code",
        //     field_type: "text",
        //     field_value: "",
        //     field_desc: "text",
        //     select_type: "none",
        //     disabled: false,
        //     field_db: "pageSize",
        //     err_mes: "",
        //     display: true,
        //   },
         
          {
            field_id: "is_active",
            field_label: "Is Active",
            field_type: "checkbox",
            field_desc: "checkbox",
            field_value: "",
            field_db: "isActive",
            display: true,
          },
          
    ]
  
    const newCountry = [
        {
            field_id: "prod_master_id",
            field_label: "Country Name:",
            field_mandatory: false,
            field_placeholder: "Enter Country Name",
            field_type: "text",
            field_value: "",
            field_desc: "text",
            select_type: "none",
            disabled: false,
            field_db: "countryName",
            err_mes: "Mandatory field",
            display: true,
          },
          {
            field_id: "product_name",
            field_label: "Country Code:",
            field_mandatory: false,
            field_placeholder: "Enter Country Code",
            field_type: "text",
            field_value: "",
            field_desc: "text",
            select_type: "none",
            disabled: false,
            field_db: "countryIATACode",
            err_mes: "",
            display: true,
          },

         
          {
            field_id: "is_active",
            field_label: "Is Active",
            field_type: "checkbox",
            field_desc: "checkbox",
            field_value: "",
            field_db: "isActive",
            display: true,
          },
        
   ]
    return (
      <>
      {location.pathname === "/master-data/geolocation/country" ? (
      <MasterPage
        title="Country"
        fields={country}
        btn1={{ text: "Search", route: "/master-data/geolocation/country" }}
        btn2={{ text: "New", route: "/master-data/geolocation/country/new-country" }}
        url="country/search"
        deleteurl="country/delete"
        save={false}
        editbtn1={{text:"Edit",edit:"UPDATE",route:"/master-data/geolocation/country"}}
        editbtn2={{text:"CANCEL",edit:"EDIT",route:"/master-data/geolocation/country"}} 
        editurl="addStateDef"
        editfields={newCountry}
      />
      ) : (
        <Outlet />
      )}
      </>
    )
  

}

export default Country