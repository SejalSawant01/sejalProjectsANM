import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MasterPage from "../../../../simpleForm/dynamicPages/MasterPage";
const State = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const productMaster = [
    {
      field_id: "prod_master_id",
      field_label: "Country:",
      field_mandatory: false,
      field_placeholder: "Enter Prod Master Id",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "countryId",
      err_mes: "Mandatory field",
      display: true,
    },
    {
      field_id: "product_name",
      field_label: "State:",
      field_mandatory: false,
      field_placeholder: "Enter Product Name",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
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
  ];

  const newProductMaster = [
    {
      field_id: "prod_master_id",
      field_label: "State Name:",
      field_mandatory: false,
      field_placeholder: "Enter Prod Master Id",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "stateName",
      err_mes: "Mandatory field",
      display: true,
    },
    {
      field_id: "product_name",
      field_label: "Country Name:",
      field_mandatory: false,
      field_placeholder: "Enter Product Name",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "comCountry.countryName",
      err_mes: "",
      display: true,
    },
    {
      field_id: "product_code",
      field_label: "pkStateId :",
      field_mandatory: false,
      field_placeholder: "Enter Product Code",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: true,
      field_db: "pkStateId",
      err_mes: "",
      display: true,
    },
    {
      field_id: "product_code",
      field_label: "GMT diff :",
      field_mandatory: false,
      field_placeholder: "Enter Product Code",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "gmtdiff",
      err_mes: "",
      display: true,
    },
    {
      field_id: "product_code",
      field_label: "State IATA Code:",
      field_mandatory: false,
      field_placeholder: "Enter Product Code",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "stateIATACode",
      err_mes: "",
      display: true,
    },
    {
      field_id: "product_code",
      field_label: "State ISO Code:",
      field_mandatory: false,
      field_placeholder: "Enter Product Code",
      field_type: "text",
      field_value: "",
      field_desc: "text",
      select_type: "none",
      disabled: false,
      field_db: "stateISOCode",
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
  ];
  return (
    <>
      {location.pathname === "/master-data/geolocation/state" ? (
        <MasterPage
          title="State"
          fields={productMaster}
          btn1={{ text: "Search", route: "/master-data/geolocation/state" }}
          btn2={{ text: "New", route: "/master-data/geolocation/state/new-state" }}
          url="comstate/search"
          deleteurl="comstate/delete"
          save={false}
          editbtn1={{ text: "Edit", edit: "UPDATE", route: "/master-data/geolocation/state" }}
          editbtn2={{ text: "CANCEL", edit: "EDIT", route: "/master-data/geolocation/state" }}
          editurl="comstate/update"
          editfields={newProductMaster}
        />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default State;
