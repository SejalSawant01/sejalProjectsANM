import React from 'react'
import MasterPage from '../../../../simpleForm/dynamicPages/MasterPage';

const NewCountry = () => {

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
            field_db: "countryIATACode",
            err_mes: "",
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
            field_db: "pkCountryId",
            err_mes: "",
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
            field_db: "gmtDiff",
            err_mes: "",
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
            field_db: "countryISO2CharCode",
            err_mes: "",
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
            field_db: "countryISO3CharCode",
            err_mes: "",
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
            field_db: "countryISONumberCode",
            err_mes: "",
            display: true,
          },
          {
            field_id: "date",
            field_label: "Validity:",
            field_mandatory: false,
            field_placeholder: "Enter Country Code",
            field_type: "dateRangePicker",
            singleDatePicker: false,
            field_value: "",
            select_type: "none",
            disabled: false,
            field_db: "validity",
            err_mes: "",
            display: true,
          },
          {
            field_id: "date",
            field_label: "Validityyyy:",
            field_mandatory: false,
            field_placeholder: "Enter Country Code",
            field_type: "dateRangePicker",
            singleDatePicker: true,
            field_value: "",
            select_type: "none",
            disabled: false,
            field_db: "validityyyy",
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
      <MasterPage
   title="Country"
   fields={country}
   btn1={{ text: "Save", route: "/master-data/geolocation/country/new-country" }}
   btn2={{ text: "Cancel", route: "/master-data/geolocation/country" }}
   url="country/add"
   save={true}
   
 />     
      </>
    )
  
}

export default NewCountry