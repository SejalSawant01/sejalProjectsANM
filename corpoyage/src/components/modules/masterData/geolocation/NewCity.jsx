import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage'

const NewCity = () => {

  const productMaster = [
   {
       field_id: "prod_master_id",
       field_label: "Prod Master Id:",
       field_mandatory: false,
       field_placeholder: "Enter Prod Master Id",
       field_type: "text",
       field_value: "",
       field_desc: "text",
       select_type: "none",
       disabled: true,
       field_db: "smdrfnum",
       err_mes: "Mandatory field",
       display: true,
     },
     {
       field_id: "product_name",
       field_label: "Product Name:",
       field_mandatory: false,
       field_placeholder: "Enter Product Name",
       field_type: "text",
       field_value: "",
       field_desc: "text",
       select_type: "none",
       disabled: false,
       field_db: "smdname",
       err_mes: "",
       display: true,
     },
     {
       field_id: "product_code",
       field_label: "Product Code:",
       field_mandatory: false,
       field_placeholder: "Enter Product Code",
       field_type: "text",
       field_value: "",
       field_desc: "text",
       select_type: "none",
       disabled: false,
       field_db: "smddesc",
       err_mes: "",
       display: true,
     },
     
    {
      field_id: "country",
      field_label: "Country:",
      field_mandatory: true,
      field_placeholder: "Select Country",
      field_type: "select",
      field_value: "",
      select_type: "sync2",
      depends: {
        isDepends: false,
        on: "None",
      },
      isMulti:false,
      disableEdit: false,
      data: 'countryList',
      disabled: false,
      field_db: "countryId",
      err_mes: "",
      display: true,
    },
    {
      field_id: "state",
      field_label: "State:",
      field_mandatory: false,
      field_placeholder: "Select state",
      field_type: "select",
      field_value: "",
      select_type: "sync3",
      depends: {
        isDepends: true,
        on: "countryId",   
      },
      isMulti:false,
      disableEdit: false,
      data2: 'stateList',
      disabled: false,
      field_db: "stateId",
      err_mes: "",
      display: true,
    },
     {
       field_id: "is_active",
       field_label: "Is Active",
       field_type: "checkbox",
       field_desc: "checkbox",
       field_value: "",
       field_db: "smdisdefault",
       display: true,
     },
    
     
]
return (
 <>
 <MasterPage
   title="City"
   fields={productMaster}
   btn1={{ text: "Save", route: "/master-data/geolocation/city/new-city" }}
   btn2={{ text: "Cancel", route: "/master-data/geolocation/city" }}
   url="addStateDef"
   save={true}
   
 />


 
 </>
)
}

export default NewCity