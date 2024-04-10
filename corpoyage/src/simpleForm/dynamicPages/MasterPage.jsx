import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateEditPage from "./CreateEditPage";
import SearchPage from "./SearchPage";

const MasterPage = ({ title, fields, btn1, btn2, url, save, editbtn1, editbtn2, editurl, editfields, deleteurl,reqBody,deleteid }) => {
  const mock = () => {
    return 1;
  };

  const formContainerRef = useRef(null);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="col-md-12" ref={formContainerRef}>
      <h4 style={{ color: "#012970", fontFamily: "Nunito, sans-serif", fontWeight: 600, }} >
        {title}
      </h4>
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
          {save ? (
            <CreateEditPage
              fields={fields}
              btn1={btn1}
              btn2={btn2}
              url={url}
              action={false}
              data={{}}
              handleSetEdit={mock}
              changeTableData={mock}
              reqBody={reqBody}
            />
          ) : (
            <SearchPage
              fields={fields}
              btn1={btn1}
              btn2={btn2}
              url={url}
              editfields={editfields}
              editbtn1={editbtn1}
              editbtn2={editbtn2}
              editurl={editurl}
              deleteurl={deleteurl} 
              deleteid={deleteid}
              formContainerRef={formContainerRef}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
