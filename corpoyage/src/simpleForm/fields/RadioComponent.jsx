import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const RadioComponent = ({field,state,stateChange}) => {
    const [radioValue, setradioValue] = useState(undefined)

    useEffect(()=>{
      const data = {key : field.field_db, value: radioValue}
      stateChange(data)
    },[radioValue])
  
    useEffect(() => {
      // When the `state` prop changes, update the `radioValue` state
      // to match the new value in the parent's state.
      setradioValue(state[field.field_db] || undefined);
    }, [state, field.field_db]);
  
    const handleRadioChange = (optionLabel) => {
      setradioValue(optionLabel);
    };
  
      return (
          <>
          {field.display && 
          <>
          {field.options.map((option) => {
              return(
            <Form.Check 
              key={option.label} 
              inline
              type="radio"
              name="common"
              id={`${field.field_id}_${option.label}`}
              checked={option.label === radioValue}
              label={option.label}
              onChange={() => handleRadioChange(option.label)}
            />
              )
          })}
          </>
        }
              
      </>
    )
}

export default RadioComponent