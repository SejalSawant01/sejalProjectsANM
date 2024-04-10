import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../../util/HttpService";
import AsyncSelect from "react-select/async";

const SelectComponent2 = ({ field, state, stateChange, action }) => {
  const [selectData, setSelectData] = useState([]);
  const [selectValue, setselectValue] = useState("");

  const [selectData1, setSelectData1] = useState([]);
  const [selectValue1, setselectValue1] = useState("");
  const [enter, setEnter] = useState(false);
  // useEffect(() => {
  //     const data = { key: field.field_db, value: selectData }
  //     stateChange(data)
  //   }, [selectData]);

  useEffect(() => {
    const data = {
      key: field.field_db,
      value: selectValue ? selectValue.value : "",
    };
    stateChange(data);
  }, [selectValue]);

  useEffect(() => {
    const data = {
      key: field.field_db,
      value: selectValue1 ? selectValue1.value : "",
    };
    stateChange(data);
  }, [selectValue1]);

  useEffect(() => {
    if ( field.select_type === "sync2" && state[field.field_db] !== undefined  ) {
      const data = { value: state[field.field_db], label: state[field.field_db], };
      setselectValue(data);
    }
  }, []);

  useEffect(() => {
    if ( field.select_type === "sync3" && state[field.field_db] !== undefined  ) {
      const data = { value: state[field.field_db], label: state[field.field_db], };
      setselectValue1(data);
    }
  }, []);

  useEffect(() => {
    const apiCalling = async () => {
      try {
        const res = await axios.get(field.data).catch((err) => {
          console.log("::: ", err.message);
        });
        setSelectData(res.data.data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    apiCalling();
  }, [field.data]);


  useEffect(() =>{
    console.log(state);
    if(Object.keys(state).length > 0){
    const callApi =async()=>{
        const body = { }

    if (field.depends.isDepends) {
     
      body[field.depends.on] = state[field.depends.on]
      console.log(body);
    }
    
    try {
      const res = await axios.post(field.data2, body).catch(err => { console.log("::: ",err.message) })
          
      setSelectData1(res.data.data);
      
    }
    catch (e) {
      console.log("e ", e);
    }
    }
    callApi()
}
  },[state])


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "12px",
      boxShadow: state.isFocused ? "0 0 0 4px #ACCFF5" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#8EA0B5" : null,
      color: state.isFocused ? "white" : "black",
    }),
  };

  return (
    <>
      {field.select_type === "sync2" ? (
        <>
          {field.display && (
            <Select
              styles={customStyles}
              options={selectData}
              value={{ value: selectValue.value, label: selectValue.label }}
              onChange={(selectedOption) => {
                setselectValue(selectedOption);
                const data = { key: field.field_db, value: selectedOption.value, };
                stateChange(data);
                setEnter(true)
              }}
              isDisabled={action && field.disableEdit}
              required={field.field_mandatory}
              onMenuClose={() => setEnter(true)}
            />
          )}
            {(field.field_mandatory && selectValue === "None" && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}

        </>
      ) : null}
      {field.select_type === "sync3" ? (
        <>
           {field.display && <Select
                styles={customStyles}
                options={selectData1}
                value={{ value: selectValue1.value, label: selectValue1.label }}
                onChange={(selectedOption) => {
                  setselectValue1(selectedOption);
                  const data = { key: field.field_db, value: selectedOption.value, };
                  stateChange(data);
                  setEnter(true)
                }}
                isDisabled={action && field.disableEdit}
                required={field.field_mandatory}
                onMenuClose={() => setEnter(true)}
              />}
            {(field.field_mandatory && selectValue === "None" && enter) ? <div style={{ color: "red", fontSize: 14 }}>Mandatory field*</div> : null}

        </>
      ) : null}
    </>
  );
};

export default SelectComponent2;
