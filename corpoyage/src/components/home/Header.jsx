import React from "react";
import { Button, NavDropdown, Navbar } from "react-bootstrap";
import ontralogo from "../../assets/ontralogo.png";
import logo1 from "../../assets/logo1.png";
import female from "../../assets/femaleuser.png";
import male from "../../assets/maleuser.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { MdSettingsSuggest } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { BsMenuUp } from "react-icons/bs";
import './Header.css'
import { useSessionStorage } from "../../util/useSessionStorage";

const Header = () => {

  const navigate = useNavigate()
  const [sessionToken, setSessionToken] = useSessionStorage("token");
  const [sessionLogin, setSessionLogin] = useSessionStorage("login");
  const [sessionUser, setSessionUser] = useSessionStorage("user");

  const logout = () => {
    setSessionLogin("false");
    setSessionUser(JSON.stringify({}));
    setSessionToken("");
    navigate("/login");
  };

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand px-3 pe-5" to="/insights">
            <img src={logo1} alt="LOGO" style={{ height: 50}} />
          </Link>
        </div>
        <div className="three-tabs ps-5">
          <Button size="sm" style={{width: "160px", borderRadius: 12, marginRight: 5, marginLeft: 10, background:"linear-gradient( #137DC5, #17557D)",border:"none" }} onClick={() => navigate("/master-data")} >
            Master Data
          </Button>
          <Button size="sm" style={{width: "160px", borderRadius: 12, marginRight: 5, background:"linear-gradient( #137DC5, #17557D)",border:"none" }} onClick={() => navigate("/admin-management")}>
            Admin Management
          </Button>
          <Button size="sm" style={{width: "160px", borderRadius: 12, background:"linear-gradient( #137DC5, #17557D)",border:"none" }} onClick={() => navigate("/expense-management")}>
            Expense Management
          </Button>
        </div>
      

        <div className="hamburgerClass" style={{ marginLeft: 100, cursor: "pointer" }}>
          <BiMenuAltRight style={{ color: "#0331AB", fontSize: 24 }} className="dropdown-toggle" data-bs-toggle="dropdown" />
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile1 mt-2" style={{ position: 'absolute', inset: '0px 0px auto auto', margin: 0, transform: 'translate(-16px, 38px)' }} data-popper-placement="bottom-end">
            <li>
              <a className="dropdown-item d-flex align-items-center" onClick={() => navigate("/master-data")}>Master Data</a>
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" onClick={() => navigate("/admin-management")}>Admin Management</a>
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" onClick={() => navigate("/expense-management")}>Expense Management</a>
            </li>
          </ul>
        </div>

        <nav className="header-nav ms-auto me-3" style={{ cursor: "pointer" }}>
          <a className="nav-link nav-profile d-flex align-items-center pe-0 show" data-bs-toggle="dropdown" aria-expanded="true">
            <img src={male} alt="Icon" style={{ width: 35 }} />
            <span className="d-none d-md-block dropdown-toggle ps-2" style={{color:"rgb(1, 41, 112)"}}>K. Anderson</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile mt-2" style={{ position: 'absolute', inset: '0px 0px auto auto', margin: 0, transform: 'translate(-16px, 38px)' }} data-popper-placement="bottom-end">
            <li className="dropdown-header">
              <h6>Kevin Anderson</h6>
              <span>Software Developer</span>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item d-flex align-items-center">
              <MdSettingsSuggest className="me-2" style={{fontSize:19}}/>
                <span>Change Password</span>
              </a>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item d-flex align-items-center mb-2" onClick={() => logout()}>
                <TbLogout className="me-2" style={{fontSize:19}}/>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
