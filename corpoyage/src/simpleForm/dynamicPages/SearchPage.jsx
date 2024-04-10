import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, TablePagination, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import axios from '../../util/HttpService'
import { showToastSuccess, showToastError, showToastWarning } from '../fields/ToastFunctions';
import { ToastContainer } from 'react-toastify'
import CreateEditPage from "./CreateEditPage";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioComponent from "../fields/RadioComponent";
import {SearchLoader} from "../fields/LoaderFunction";
import DateRangeComponent from "../fields/DateRangeComponent";

const SearchPage = ({ fields,btn1,btn2,url,editfields,editbtn1,editbtn2,editurl,deleteurl,formContainerRef,deleteid}) => {
    const tableRef = useRef(null);
    const alertRef = useRef(null);
    // const formContainerRef = useRef(null);
    const [modal, setModal] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({});
    const [edit, setEdit] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [tempRow, setTempRow] = useState({})
    const [loading,setLoading] = useState(false)   
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [resultFoundToastShown, setResultFoundToastShown] = useState(false);
    const theme = createTheme({
      components: {
        MuiTablePagination: {
          styleOverrides: {selectLabel:{ marginTop:"13px"}, displayedRows:{ marginTop:"15px"}},
        },
      },
    });
  
    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } 
      setValidated(true);
      event.preventDefault();
      handleAPI();
    };
  
    useEffect(() => {
      if (showTable && tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (showMsg && alertRef.current) {
        alertRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (edit && formContainerRef.current) {
        formContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      console.log(state);
    }, [showTable, showMsg, edit, state]);
  
    function areMandatoryFieldsFilled() {
      const mandatoryFields = fields.filter((field) => field.field_mandatory);
  
      for (const field of mandatoryFields) {
        const { field_db } = field;
        const value = state[field_db] || "";
  
        if (value.length === 0) {
          return false;
        }
      }
  
      return true;
    }
  
    const handleRowEdit = useCallback((row) => {
      setEdit(true);
      if (formContainerRef.current) {
        formContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      // console.log(row)
      setState(row.original);
      
    });

    // const urlEdit = useCallback((row) => {
    //   const id = row.original[deleteid];
    //   const url = `${editurl}/${id}`;
    //   console.log(url);
    //   return url;
    // }, [deleteid, editurl]);
  
    const handleDeleteRow = useCallback(
      async (row) => {
        const id = row.original[deleteid];
        try {
        const response = await axios.delete(`${deleteurl}/${id}`).catch(err => { console.log("::: ",err.message) });
        if (response.data.code === 200) {
            showToastSuccess(response.data.message)
            data.splice(row.index, 1);
            setData([...data]);
        }     
        }
        catch (err) {
          console.log(err);
        }
      },
      [data]
    );
  
    const handleAPI = async (newPage, newRowsPerPage) => {
      const isAllMandatoryFieldsFilled = areMandatoryFieldsFilled();
    
      if (isAllMandatoryFieldsFilled) {
        setLoading(true);
        const modifiedState = {
          ...state,
          pageNo: newPage + 1, 
          pageSize: newRowsPerPage,
        
        };
        try {
          const response = await axios.post(url, modifiedState).catch(err => { console.log("::: ",err.message) });

            setData(response.data.data);
            setColumns(response.data.mainColumns);
            setTotalCount(response.data.totalResult);
            setShowTable(true);
            if (!resultFoundToastShown) {
              showToastSuccess(response.data.message);
              setResultFoundToastShown(true);
            }
            setLoading(false);
          
    
        } catch (e) {
          console.error(e);
          
        }
      } else {
        showToastWarning("Please fill in all the mandatory fields");
      }
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      handleAPI(newPage, rowsPerPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setPage(0); 
      handleAPI(0, newRowsPerPage);
    };
    
    
  
    const stateChange = (data) => {
      setState((state) => ({ ...state, [data.key]: data.value }));
    };
  
    const buttons = () => {
      if (btn2.text === "RESET") {
        // Convert state object to an array of key-value pairs
        const entries = Object.entries(state);
  
        // Create a new object with keys set to an empty string
        const newState = entries.reduce((acc, [key]) => {
          acc[key] = "";
          return acc;
        }, {});
  
        // Set the new state
        setState(newState);
      }
    };
  
    const handleSetEdit = () => {
      setEdit(false);
      setShowTable(false);
      Object.keys(state).every(key => {
        state[key] = null;
        return true; // Returning true to continue iteration
      });
    }
  
    const changeTableData = (updatedState) => {
      setEdit(false);
      setShowTable(false)
      setData(data => ({ ...data, updatedState }))
      Object.keys(state).every(key => {
        if (typeof state[key] === Array) { state[key] = [] }
        else state[key] = "";
        return true; // Returning true to continue iteration
      });
    }
  
    return (
      <>
        <ToastContainer />
        {!edit ? (
          <>
            <Form
              className="px-3"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              // ref={formContainerRef}
            >
              <div className="row" >
                {fields.map((field) => {
                  return (
                    <>
                      <div className="col-md-3" key={field.field_id}>
                        {field.display && (
                          <Form.Label >
                            {field.field_label}
                            {field.field_mandatory === true ? (
                              <span style={{ color: "red" }}> *</span>
                            ) : (
                              ""
                            )}
                          </Form.Label>
                        )}
                        <div className=" mb-3">
                          {field.field_type === "select" && (
                            <SelectComponent
                              field={field}
                              state={state}
                              stateChange={stateChange}
                              action={false}
                            />
                          )}
                          {field.field_type === "text" && (
                            <InputComponent
                              field={field}
                              state={state}
                              stateChange={stateChange}
                            />
                          )}
                          {field.field_type === "checkbox" && (
                            <CheckboxComponent
                              field={field}
                              state={state}
                              stateChange={stateChange}
                            />
                          )}
                          {field.field_type === "radio" && (
                            <RadioComponent
                              field={field}
                              state={state}
                              stateChange={stateChange}
                            />
                          )}
                          {field.field_type === "dateRangePicker" && (
                            <DateRangeComponent
                              field={field}
                              state={state}
                              stateChange={stateChange}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="row">
                  <span className="d-flex justify-content-end mb-3">
                    <span className="m-1">
                      <Button
                        // size="sm"
                        style={{background: "linear-gradient( #CFCFCF, #9BD1E7)",borderColor:"white",color:"black"}}
                        className="d-flex justify-content-end buttonModule"
                        type="submit"
                        disabled={loading}
                      >
                        {btn1.text}
                      </Button>
                    </span>
                    <span className="m-1">
                      <Link to={btn2.route} style={{ textDecoration: 'none' }}>
                        <Button
                          style={{background: "linear-gradient( #CFCFCF, #9BD1E7)",borderColor:"white",color:"black"}}
                          className=" d-flex justify-content-end buttonModule"
                          onClick={buttons}
                        >
                          {btn2.text}
                        </Button>
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            </Form>
          </>
        ) : (
          <CreateEditPage
            fields={editfields}
            btn1={editbtn1}
            btn2={editbtn2}
            url={editurl}
            action={true}
            data={state}
            handleSetEdit={handleSetEdit}
            changeTableData={changeTableData}
          />
        )}
  
        {loading && (
          <div className="text-center mt-5"><SearchLoader /></div>     
        )}
  
        {showTable &&
          (data.length > 0 ? (
            <div className="mb-3" ref={tableRef} style={{ zIndex: 0 }}>
              <MaterialReactTable
                columns={columns}
                data={data}
                enablePagination={false}
                enableColumnOrdering
                enableEditing
                renderRowActions={({ row, table }) => (
                  <>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => handleRowEdit(row)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {setModal(true);setTempRow(row);}}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
  
                    </Box>
                  </>
                )}
              />
              <ThemeProvider theme={theme}>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
              />
              </ThemeProvider>
              <Modal show={modal} onHide={setModal} centered >
                  <Modal.Body className='text-center mt-4 mb-4' >
                    <h5>
                    Are you sure about deleting this given data?
                    </h5>
                    <div className='mt-3'>
                      <Button style={{background: "linear-gradient( #CFCFCF, #9BD1E7)",borderColor:"white",color:"black"}}
                      className="m-2"  onClick={() => setModal(false)} >
                        Cancel
                      </Button>
                      <Button style={{background: "linear-gradient( #CFCFCF, #9BD1E7)",borderColor:"white",color:"black"}}
                        onClick={() => { setModal(false); handleDeleteRow(tempRow) }} >
                        Confirm
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
  
            </div>
          ) : (
            <div ref={tableRef}>
              <Alert variant="danger">
                No records found!
              </Alert>
            </div>
          ))}
      </>
    );
}

export default SearchPage