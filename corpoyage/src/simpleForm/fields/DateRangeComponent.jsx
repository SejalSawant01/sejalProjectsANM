import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const DateRangeComponent = ({ field, state, stateChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleApply = (event, picker) => {
    const singleDate = picker.startDate.format("DD-MM-YYYY");
    const startDate = picker.startDate.format("DD-MM-YYYY");
    const endDate = picker.endDate.format("DD-MM-YYYY");

    // Update the state or perform any other necessary actions
    if(!field.singleDatePicker){
        const data = { key: field.field_db, value: `(${startDate}, ${endDate})` };
        stateChange(data);
        setInputValue(`${startDate} - ${endDate}`);
    }else{
        const data = { key: field.field_db, value: singleDate  };
        stateChange(data);
        setInputValue(singleDate);
    }
    // Update the input value
  };

  const handleCancel = () => {
    // Clear the input value and update the state accordingly
    setInputValue("");
    const data = { key: field.field_db, value: "" };
    stateChange(data);
  };

  const isSingleDatePicker = field.singleDatePicker; // Assuming you have a singleDatePicker property in your field object

  return (
    <DateRangePicker
      initialSettings={{
        showDropdowns: true,
        autoUpdateInput: false,
        singleDatePicker: isSingleDatePicker,
        locale: {
          cancelLabel: "Clear",
        },
      }}
      onApply={handleApply}
      onCancel={handleCancel}
    >
      <Form.Control
        type="text"
        style={{ padding: "6px 12px", zIndex: 0, borderRadius: 12 }}
        required={field.field_mandatory}
        disabled={field.disabled}
        value={inputValue}
        placeholder={isSingleDatePicker ? "Select Date" : "Start Date - End Date"}
        readOnly
      />
    </DateRangePicker>
  );
};

export default DateRangeComponent;
