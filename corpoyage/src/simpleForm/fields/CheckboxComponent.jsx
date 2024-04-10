import React from 'react'
import { Form } from 'react-bootstrap';

const CheckboxComponent = ({field,state,stateChange}) => {
    const checked = state[field.field_db] === "1";

    const onChange = () => {
      const updatedCheck = !checked;
      const data = { key: field.field_db, value: updatedCheck ? "1" : "0" };
      stateChange(data);
    };
  
    return (
      <Form.Check
        disabled={field.disabled}
        type="switch"
        id={field.field_id}
        onChange={onChange}
        checked={checked}
      />
    )
}

export default CheckboxComponent