import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { showToastSuccess, showToastError, showToastWarning } from '../fields/ToastFunctions';
import { ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "../../util/HttpService";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioComponent from "../fields/RadioComponent";
import SelectComponent2 from "../fields/SelectComponent2";
import DateRangeComponent from "../fields/DateRangeComponent";

const CreateEditPage = ({ fields, btn1, btn2, url, action, data, handleSetEdit, changeTableData, reqBody, deleteid }) => {
  const tableRef = useRef(null)
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("")
  const [msg, setMsg] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault()
    if (areMandatoryFieldsFilled) {
      //Call insertion api here
      return;
    }
  };

  const callAPI = () => {
    console.log('came in', areMandatoryFieldsFilled());

    if (areMandatoryFieldsFilled()) {
      console.log(true);
      if (action) { handlePutAPI() }
      else { handleAPI() }
    }
  }

  useEffect(() => {
    if (showMsg && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msg, showMsg, mode])

  useEffect(() => {
    { action ? setState(data) : setState({}) }
  }, [data])

  useEffect(() => {
    console.log(state);
  }, [state])

  function areMandatoryFieldsFilled() {
    const mandatoryFields = fields.filter(field => field.field_mandatory);

    for (const field of mandatoryFields) {
      const { field_db } = field;
      // if ((state[field.field_db] === null) || (state[field.field_db] === undefined)) return true;
      const value = state[field_db] || '';

      // if (typeof value === String && value.length === 0) {
      //   console.log(field.field_db, state[field.field_db], 'false')
      //   return false;
      // }
      if (value.length === 0) {
        return false;
      }
    }

    return true;
  }

  const stateChange = (data) => {
    setState(state => ({ ...state, [data.key]: data.value }))
  }

  const handleAPI = async () => {
    const isAllMandatoryFieldsFilled = areMandatoryFieldsFilled();
    const mailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobreg = /^((?!(0))[0-9]{10})$/;
    const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (state["MobileNo"] === undefined || mobreg.test(state["MobileNo"]) === true) {
      if (state["Cnf_password"] === undefined || state["Password"] === state["Cnf_password"]) {
        if (state["Password"] === undefined || passreg.test(state["Password"]) === true) {
          if (isAllMandatoryFieldsFilled) {
            const modifiedState = { ...state, ...reqBody, };
            const response = await axios.post(url, modifiedState).catch(err => { console.log("::: ", err.message) });

            if (response.data && response.data.code === 409) {
              showToastWarning(response.data.message);
              setMode('warning');
            } else if (response.data && response.data.code === 201) {
              setTimeout(() => {
                navigate(btn2.route);
              }, 2000);
              setMode('success');
              showToastSuccess(response.data.message);
              setMsg(response.data.message);
              setShowMsg(true);
              setTimeout(() => { setMsg(""); setShowMsg(false); }, 1000);
            }
          } else {
            showToastError("Please fill in all the mandatory fields");
          }
        } else {
          showToastError("Password should contain 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, and be more than 8 characters long.");
        }
      } else {
        showToastError("Your password and confirmation password do not match.");
      }
    } else {
      showToastError("Please enter a valid mobile number");
    }
  };


  const handlePutAPI = async (row) => {
    const isAllMandatoryFieldsFilled = areMandatoryFieldsFilled();
    const id = row.original[deleteid];
    // if(!window.confirm('Are you sure about updating this given data?')) return;
    const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (state["Cnf_password"] === undefined || state["Password"] === state["Cnf_password"]) {
      if (state["Password"] === undefined || passreg.test(state["Password"]) === true) {
        if (isAllMandatoryFieldsFilled) {
          setIsLoading(true)
          const modifiedState = {
            ...state,
            ...reqBody,
          };
          const response = await axios.put(`${url}/${id}`, modifiedState).catch(err => { console.log(err); })

          // if (response.data.code === 206) {
          setMode('success');
          setMsg(response.data.message);
          setShowMsg(true);
          showToastSuccess(response.data.message)
          setIsLoading(false)
          setTimeout(() => { setShowMsg(false); setMsg(""); changeTableData(state) }, 1000)
          // }
        }
        else {
          showToastError("Please fill in all the mandatory fields")
        }
      } else {
        showToastError("Password should contains 1 lowercase letters, 1 uppercase letters, 1 numbers, 1 special character & should be more than 8!")
      }
    } else {
      showToastError("Your password and confirmation password do not match.")
    }

  }

  const clearState = (e) => {
    e.preventDefault()
    handleSetEdit()
  }

  return (
    <>
      <ToastContainer />
      <Form encType="multipart/form-data" className="px-3" noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          {/* field types are select,input -> text,textarea,date,email,password, radio, checkbox */}
          {fields && fields.length && fields.map((field) => {
            return (
              <>
                <div className="col-md-4" key={field.field_id}>
                  {field.display && <Form.Label>
                    {field.field_label}{field.field_mandatory === true ? <span style={{ color: "red" }}> *</span> : ""}
                  </Form.Label>}
                  <div className=" mb-3">
                    {field.field_type === 'select' && <SelectComponent2 field={field} state={state} stateChange={stateChange} action={action} />}
                    {/* {field.field_type === 'select' && <SelectComponent field={field} state={state} stateChange={stateChange} action={action} />} */}
                    {field.field_type === 'text' && <InputComponent field={field} state={state} stateChange={stateChange} />}
                    {field.field_type === 'checkbox' && <CheckboxComponent field={field} state={state} stateChange={stateChange} />}
                    {field.field_type === 'radio' && <RadioComponent field={field} state={state} stateChange={stateChange} />}
                    {field.field_type === "dateRangePicker" && (<DateRangeComponent field={field} state={state} stateChange={stateChange} />)}
                  </div>
                </div>
              </>
            )
          })}
        </div>
        {/* <Buttons btn1={btn1} btn2={btn2} /> */}
        <div className="row">
          <span className="d-flex justify-content-end mb-3">
            <span className="m-1">
              <Button
                className="d-flex justify-content-end buttonModule"
                style={{ background: "linear-gradient( #CFCFCF, #9BD1E7)", borderColor: "white", color: "black" }}
                type="submit"
                onClick={() => {
                  if (areMandatoryFieldsFilled()) {
                    setModal(true);
                  } else {
                    showToastError("Please fill in all the mandatory fields!");
                  }
                }}
              // disabled={isLoading}
              >
                {action ? `${btn1.edit}` : `${btn1.text}`}
              </Button>
            </span>

            <span className="m-1">
              {/* <Link to={btn2.route} > */}
              <Button
                style={{ background: "linear-gradient( #CFCFCF, #9BD1E7)", borderColor: "white", color: "black" }}
                className=" d-flex justify-content-end buttonModule"
                onClick={(e) => {
                  if (action) { clearState(e) }
                  else { navigate(btn2.route) }
                }}
              >
                {action ? `${btn2.text}` : `${btn2.text}`}
              </Button>
              {/* </Link> */}
            </span>
          </span>
        </div>
        {/* 
          {
            isLoading && <div className="text-center my-2"><Loader /></div>
          } */}

        <Modal show={modal} onHide={setModal} centered >
          <Modal.Body className='text-center mt-4 mb-4' >
            <h5>
              Are you sure about {action ? `updating` : `saving`} this data?
            </h5>
            <div className='mt-3'>
              <Button style={{ background: "linear-gradient( #CFCFCF, #9BD1E7)", borderColor: "white", color: "black" }}
                className="m-2" onClick={() => setModal(false)} >
                Cancel
              </Button>
              <Button style={{ background: "linear-gradient( #CFCFCF, #9BD1E7)", borderColor: "white", color: "black" }}
                onClick={() => { setModal(false); callAPI() }} >
                Confirm
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {showMsg && (
          <div ref={tableRef}>
            <Alert variant={mode}>{msg}</Alert>
          </div>
        )}
      </Form>
      {/* <SessionExpireModal showModal={showModal}  /> */}

    </>
  )

}

export default CreateEditPage