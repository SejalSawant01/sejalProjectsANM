import React from "react";
import Header from "./Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import dataContext from "../../context/dataContext";
import ScrollToTop from "../../simpleForm/fields/ScrollToTop";
import { TiThMenu } from "react-icons/ti";

const Home = () => {
  const [state, updateState] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{ backgroundColor: "#f6f9ff" }}>
      <dataContext.Provider value={{ state, updateState }}>
        <header className="w-100 ml-auto">
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>

        {isOpen ? (
          <div className="row w-100">
            <div className="col-3">
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="col-9" style={{ marginTop: 100 }}>
              <Outlet />
              <div
                className="text-center mb-3 p-3"
                style={{ color: "#012970" }}
              >
                <hr />
                <div className="mt-4">
                  Copyright © <strong>Ontra</strong>. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" px-2">
          
            <div className="d-flex align-items-center justify-content-center" 
            style={{marginTop:"80px",backgroundColor:'rgb(41, 128, 185)',borderRadius:"50%",height:"45px",width:"45px",cursor:"pointer"}}
            onClick={()=> setIsOpen(true)}>

            <TiThMenu style={{fontSize:22,color:"#fff"}}   />
            </div>
            <div className="col-12 px-5 ">

              <Outlet />
              <div
                className="text-center mb-4 p-3"
                style={{ color: "#012970" }}
              >
                <hr />
                <div className="mt-4">
                  Copyright © <strong>Ontra</strong>. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        )}
        <ScrollToTop />
      </dataContext.Provider>
    </div>
  );
};

export default Home;
