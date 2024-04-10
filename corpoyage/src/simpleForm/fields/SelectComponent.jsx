import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axios from "../../util/HttpService";
import { Form } from "react-bootstrap";
import { showToastError } from "./ToastFunctions";
import { ToastContainer } from "react-toastify";



const SelectComponent = ({ field, state, stateChange, action }) => {
    const [inputValue, setInputValue] = useState("");
    const [enter, setEnter] = useState(false);
    const [sync, setSync] = useState("")
    const [async, setAsync] = useState({ label: "", value: "" })
    const [syncData, setSyncData] = useState([])
    const [syncSelectValue, setSyncSelectValue] = useState("")
    const [selectedValue, setSelectedValue] = useState([]);
    const [enterDisable, setEnterDisable] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
    useEffect(() => {
      // console.log(`Inside ${field.field_db}`, state);
      const data = { key: field.field_db, value: syncData }
      stateChange(data);
    }, [syncData])
  
    useEffect(() => {
      // console.log(`Inside ${field.field_db}`, state);
      const data = { key: field.field_db, value: syncSelectValue }
      stateChange(data);
    }, [syncSelectValue])
  
    useEffect(() => {
      const data = { key: field.field_db, value: selectedValue.map((item) => item.value) }
      stateChange(data)
    }, [selectedValue]);
  
    useEffect(() => {
      // console.log(`Inside ${field.field_db}`, state);
      const data = { key: field.field_db, value: async.value }
      stateChange(data);
    }, [async])
  
    useEffect(() => {
      if (field.isMulti) {
        if (state[`${field.field_db}_select`]) { setIsCheckboxChecked(state[`${field.field_db}_select`]) }
      }
    }, [])
  
    useEffect(() => {
      if (field.select_type === 'async' && state[field.field_db] !== undefined && !field.isMulti) {
        const data = { value: state[field.field_db], label: state[field.field_db] }
        setAsync(data)
      }
      else if (field.select_type === 'async' && state[field.field_db] !== undefined && field.isMulti) {
        // const fieldData = state[field.field_db];
        // if (Array.isArray(fieldData)) {
        //   const data = fieldData.map(item => ({ value: item, label: item }));
        //   setSelectedValue(data);
        // }
      }
      else if (field.select_type === 'sync' && state[field.field_db] !== undefined && field.isMulti) {
        const fieldData = state[field.field_db];
        if (Array.isArray(fieldData)) {
          const data = state[field.field_db].map(item => item);
          setSyncData(data)
        }
      }
      else if (field.select_type === 'sync' && state[field.field_db] !== undefined && !field.isMulti) {
        setSyncSelectValue(state[field.field_db])
      }
    }, [])
  
    async function callApi(inputValue) {
      const body = { inputValue }
  
      if (field.depends.isDepends) {
        // console.log(state[field.depends.on])
        // console.log({...state});
        body[field.depends.on] = state[field.depends.on]
        console.log(body);
  
      }
      try {
        const res = await axios.post(field.data, body).catch(err => { console.log("::: ",err.message) })
        console.log("response : ", res);
        if (res === undefined) {
          setShowModal(true);
        }
        else if (res.status === 206) {
          showToastError(res.data.message);
        }
  
        else {
          return res.data.message;
        }
      }
      catch (e) {
        console.log("e ", e);
      }
    }
  
    const changeInput = (supplier) => {
      setInputValue(supplier);
    };
    const handleChange = (supplier) => {
      // console.log(supplier);
      setAsync(supplier);
    };
  
    const handleMultiChange = (supplier) => {
      // console.log(supplier);
      setSelectedValue(supplier)
    }
  
    const handleCheckboxChange = (event) => {
      setIsCheckboxChecked(event.target.checked);
  
      // Conditionally add or remove the "All" option based on the checkbox status
      if (event.target.checked) {
        // Add the "All" option to selectedValue or syncSelectValue
        if (field.select_type === "async") {
          setSelectedValue([{ value: "All", label: "All" }]);
        } else if (field.select_type === "sync") {
          setSyncSelectValue("All");
        }
      } else {
        // Remove the "All" option from selectedValue or syncSelectValue
        if (field.select_type === "async") {
          setSelectedValue([]);
        } else if (field.select_type === "sync") {
          setSyncSelectValue("");
        }
      }
  
      stateChange({ key: `${field.field_db}_select`, value: event.target.checked });
    }
  
  
    useEffect(() => {
      if (isCheckboxChecked && field.isMulti) {
        if (field.select_type === "sync") {
          setSyncData(field.data.map(value => {
            return value.value
          }))
        } else if (field.select_type === 'async') {
          let body = {};
          if (field.depends.isDepends) {
            const dependsValue = state[field.depends.on];
            body = { [field.depends.on]: dependsValue };
          }
          const callAlldata = async () => {
            try {
              const res = await axios.post(field.fulldata, body).catch(err => { console.log(err.message) })
              if (res === undefined) {
                setShowModal(true);
              }
             else if (res.status === 206) {
                setIsCheckboxChecked(false);
                showToastError(res.data.message)
              }
              else {
                let data = { key: field.field_db, value: res.data.message.map((item) => item.value) }
                stateChange(data)
              }
            }
            catch (e) {
              console.log(e);
            }
          }
          callAlldata()
        }
      }
      else if (!isCheckboxChecked && field.isMulti) {
        if (field.select_type === 'sync' && state[field.field_db] !== undefined) {
          if (state[field.field_db] && state[field.field_db].length === field.full_length) {
            setSyncData([]);
          }
        } else if (field.select_type === 'async' && state[field.field_db] !== undefined) {
          if (state[field.field_db] && state[field.field_db].length === field.full_length) {
            let data = { key: field.field_db, value: [] };
            stateChange(data);
          }
        }
      }
    }, [isCheckboxChecked])
  
    return (
      <>
  
        {field.select_type === "async" ? (
          field.isMulti ? (
            <>
              {field.display &&
                <div className="row">
                  <div className="col-8">
                    <AsyncSelect
                      required={field.field_mandatory}
                      cacheOptions
                      defaultOptions={false}
                      value={selectedValue}
                      //value={state[field.field_db]!==undefined?state[field.field_db].map(item => ({ value: item, label: item })):selectedValue}
                      loadOptions={callApi}
                      getOptionValue={(e) => e.value}
                      getOptionLabel={(e) => e.label}
                      isMulti={"isMulti"}
                      onChange={handleMultiChange}
                      onInputChange={changeInput}
                      isDisabled={(action && field.disableEdit) || isCheckboxChecked}
                      onMenuClose={() => setEnter(true)}
                    />
                  </div>
                  <div className="col-4">
                    <Form.Check className='mt-2' type="checkbox" label="Select All"
                      checked={isCheckboxChecked} onChange={handleCheckboxChange} />
                  </div>
                </div>
              }
              {(field.field_mandatory && selectedValue.length === 0 && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}
            </>
          ) : (
            <>
              {field.display && <AsyncSelect
                required={field.field_mandatory}
                cacheOptions
                defaultOptions={false}
                value={state[field.field_db] !== undefined ? { label: state[field.field_db], value: state[field.field_db] } : async}
                loadOptions={callApi}
                getOptionValue={(e) => e.value}
                getOptionLabel={(e) => e.label}
                onChange={handleChange}
                onInputChange={changeInput}
                isDisabled={(action && field.disableEdit) || enterDisable}
                onMenuClose={() => setEnter(true)}
              />}
              {(field.field_mandatory && selectedValue.length === 0 && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}
            </>
          )
        ) : field.isMulti ? (
          <>
            {field.display &&
              <div className="row">
                <div className="col-8">
                  <Select
                    options={field.data}
                    isMulti={"isMulti"}
                    value={syncData.map(item => ({ value: item, label: item }))}
                    //value={state[field.field_db]!==undefined?state[field.field_db].map(item => item):syncData.map(item => ({value:item, label:item}))}
                    onChange={(e) => {
                      const arr = e.map(item => item.value)
                      setSyncData(arr)
                      setEnter(true)
                    }}
                    onInputChange={changeInput}
                    isDisabled={(action && field.disableEdit) || isCheckboxChecked}
                    required={field.field_mandatory}
                    onMenuClose={() => setEnter(true)}
                  />
                </div>
                <div className="col-4">
                  <Form.Check className='mt-2' type="checkbox" label="Select All"
                    checked={isCheckboxChecked} onChange={handleCheckboxChange} />
                </div>
              </div>
            }
            {(field.field_mandatory && sync === "None" && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}
          </>
        ) : (
          <>
            {field.display && <Select
              options={field.data}
              onInputChange={changeInput}
              value={state[field.field_db] !== undefined ? { label: state[field.field_db], label: state[field.field_db] } : { label: syncSelectValue, label: syncSelectValue }}
              onChange={(e) => {
                setSyncSelectValue(e.value); setEnter(true)
              }}
              isDisabled={action && field.disableEdit}
              required={field.field_mandatory}
              onMenuClose={() => setEnter(true)}
            />}
            {(field.field_mandatory && sync === "None" && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}
          </>
        )}
        <ToastContainer />
      </>
    );
}

export default SelectComponent