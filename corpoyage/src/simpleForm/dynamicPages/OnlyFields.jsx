import React from 'react'
import SelectComponent2 from '../fields/SelectComponent2'
import InputComponent from '../fields/InputComponent'
import CheckboxComponent from '../fields/CheckboxComponent'
import RadioComponent from '../fields/RadioComponent'
import DateRangeComponent from '../fields/DateRangeComponent'
import { useLocation } from 'react-router-dom'

const OnlyFields = ({fields,state,stateChange}) => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/insights" style={{ textDecoration: "none", color: "#2471A3" }}>
              home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={name} className={`breadcrumb-item ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {isLast ? name : <Link style={{ color: isLast ? '' : '#2471A3', textDecoration: isLast ? '' : 'none'}} 
                to={routeTo}>{name}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="container-fluid card border-light shadow-lg rounded-3 mt-4 mb-3">
        <div className="mt-5">
    <Form className="px-3" noValidate >
      <div className="row">
        {/* field types are select,input -> text,textarea,date,email,password, radio, checkbox */}
        {fields.map((field) => {
          return (
            <>
              <div className="col-md-4">
                {field.display && <Form.Label style={{ fontWeight: 600 }}>
                  {field.field_label}{field.field_mandatory === true ? <span style={{color:"red"}}> *</span> : ""}
                </Form.Label>}
                <div className="mb-3">
                {field.field_type === 'select' && <SelectComponent2 field={field} state={state} stateChange={stateChange} action={action} />}
                      {/* {field.field_type === 'select' && <SelectComponent field={field} state={state} stateChange={stateChange} action={action} />} */}
                      {field.field_type === 'text' && <InputComponent field={field} state={state} stateChange={stateChange} />}
                      {field.field_type === 'checkbox' && <CheckboxComponent field={field} state={state} stateChange={stateChange} />}
                      {field.field_type === 'radio' && <RadioComponent field={field} state={state} stateChange={stateChange} />}
                      {field.field_type === "dateRangePicker" && ( <DateRangeComponent field={field} state={state} stateChange={stateChange} />)}
                </div>
              </div>
            </>
          )
        })}
      </div>
      </Form>
      </div>
      </div>
    </>
  )
}

export default OnlyFields