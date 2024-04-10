import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const InputComponent = ({ field, state, stateChange }) => {
  return (
    <>
      {field.field_desc === "textarea" ? (
        <InputGroup>
          <Form.Control
            style={{ padding: "6px 12px",zIndex:0, borderRadius:15 }}
            required={field.field_mandatory}
            value={state[field.field_db]}
            type={field.field_desc}
            as={field.field_desc}
            rows="3"
            placeholder={field.field_placeholder}
            disabled={field.disabled}
            onChange={(e) =>
              {
                console.log(`this is input ${field.field_db}`,state)
                const data = {key:field.field_db,value:e.target.value}
                stateChange(data)
              }
            }
          />
          {field.field_mandatory && (
            <Form.Control.Feedback type="invalid">{field.err_mes}</Form.Control.Feedback>
          )}
          
        </InputGroup>
      ) : field.field_desc === "file" ?
         <>
         <InputGroup>
          <Form.Control
            style={{ padding: "6px 12px",zIndex:0 }}
            required={field.field_mandatory}
            // value={state[field.field_db]}
            type={field.field_desc}
            placeholder={field.field_placeholder}
            disabled={field.disabled}
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              console.log("selected file : ",selectedFile);
              const data = { key: field.field_db, value: selectedFile };
              console.log("data : ",data);
              stateChange(data);
            }
            }
          />
          {field.field_mandatory && (
            <Form.Control.Feedback type="invalid">{field.err_mes}</Form.Control.Feedback>
          )}
        </InputGroup>
            <div style={{color:"red"}}>
              (Image uploaded will be resized to 130*130 px)
            </div>
         </> : (
        <>
        <InputGroup>
          <Form.Control
            style={{ padding: "6px 12px",zIndex:0, borderRadius:12 }}
            required={field.field_mandatory}
            value={state[field.field_db]}
            type={field.field_desc}
            placeholder={field.field_placeholder}
            disabled={field.disabled}
            onChange={(e) =>
            {
              const data = {key:field.field_db,value:e.target.value}
              stateChange(data)
            }
            }
          />
          {field.field_mandatory && (
            <Form.Control.Feedback type="invalid">{field.err_mes}</Form.Control.Feedback>
          )}
        </InputGroup>
          
          </>
      )}
    </>
  )
}

export default InputComponent