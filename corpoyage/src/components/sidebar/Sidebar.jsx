import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import SidebarMenu from './SidebarMenu';
import { FaArrowLeft } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import { NavLink, useLocation } from 'react-router-dom';
import dataContext from '../../context/dataContext';
import { BsMenuButtonWide } from "react-icons/bs";
import { BiRadioCircle } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
export const home = [
  {
    path: "/insights",
    name: "Insights",
    icon: <BsMenuButtonWide />,
  },
   
]

export const masterData = [
  {
    path: "/insights",
    name: "Insights",
    icon: <BsMenuButtonWide />,
  },
  {
    path: "/master-data",
    name: "Master Data",
    icon: <BsMenuButtonWide />,
    subModule: [
      {
        path: "/master-data/geolocation",
        path2:"/master-data/geolocation",
        name: "Geolocation",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/master-data/geolocation/city",
            path2:"/master-data/geolocation/city/new-city",
            name: "City",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/geolocation/country",
            path2:"/master-data/geolocation/country/new-country",
            name: "Country",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/geolocation/state",
            path2:"/master-data/geolocation/state/new-state",
            name: "State",
            icon: <RxDotFilled />,
          },
        ]
      },
      {
        path: "/master-data/travel-definition",
        path2:"/master-data/city/new-city",
        name: "Travel Definition",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/master-data/travel-definition/product",
            path2:"/master-data/travel-definition/product/new-product",
            name: "Product",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/travel-definition/travel-preferences",
            path2:"/master-data/travel-definition/travel-preferences/new-travel-preferences",
            name: "Travel preferences",
            icon: <RxDotFilled />,
          },
        ]
      },
      {
        path: "/master-data/employee-designation",
        path2:"/master-data/city/new-city",
        name: "Employee Designation",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/master-data/employee-designation/designation-definition",
            path2:"/master-data/employee-designation/designation-definition/new-designation-definition",
            name: "Designation definition",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/employee-designation/designation-level-definition",
            path2:"/master-data/employee-designation/designation-level-definition/new-designation-level-definition",
            name: "Designation level definition",
            icon: <RxDotFilled />,
          },
        ]
      },
     
      {
        path: "/master-data/role-master",
        path2:"/master-data/role-master",
        name: "Role Master",
        icon: <BiRadioCircle />,
        subSubModule: [

          {
            path: "/master-data/role-master/role-definition",
            path2:"/master-data/role-master/role-definition/new-role-definition",
            name: "Role definition",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/role-master/page-definition",
            path2:"/master-data/role-master/page-definition/new-page-definition",
            name: "Page definition",
            icon: <RxDotFilled />,
          },
          {
            path: "/master-data/role-master/roles-page-association",
            path2:"/master-data/role-master/roles-page-association/new-roles-page-association",
            name: "Roles and page association",
            icon: <RxDotFilled />,
          },
        ]
      },
    ]   
  },
]

export const adminManagement = [
  {
    path: "/insights",
    name: "Insights",
    icon: <BsMenuButtonWide />,
  },
  {
    path: "/admin-management",
    name: "Admin Management",
    icon: <BsMenuButtonWide />,
    subModule: [
      {
        path: "/admin-management/orgnization-master",
        path2:"/admin-management/orgnization-master",
        name: "Orgnization Master",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/admin-management/orgnization-master/organization-registration",
            path2:"/admin-management/orgnization-master/organization-registration/new-organization-registration",
            name: "Organization registration",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/orgnization-master/organization-staff-registration",
            path2:"/admin-management/orgnization-master/organization-staff-registration/new-organization-staff-registration",
            name: "Organization staff registration",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/orgnization-master/employee-registration",
            path2:"/admin-management/orgnization-master/employee-registration/new-employee-registration",
            name: "Employee registration",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/orgnization-master/corporate-agent-management",
            path2:"/admin-management/orgnization-master/corporate-agent-management/new-corporate-agent-management",
            name: "Corporate agent management",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/orgnization-master/supplier-configuration",
            path2:"/admin-management/orgnization-master/supplier-configuration/new-supplier-configuration",
            name: "Supplier configuration",
            icon: <RxDotFilled />,
          },

        ]
      },
      {
        path: "/master-data/travel-policy-master",
        path2:"/master-data/city/new-city",
        name: "Travel Policy Master",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/admin-management/designation-level-association",
            path2:"/admin-management/designation-level-association/new-designation-level-association",
            name: "Designation & level association",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/travel-policy",
            path2:"/admin-management/travel-policy/new-travel-policy",
            name: "Travel policy",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/travel-group",
            path2:"/admin-management/travel-group/new-travel-group",
            name: "Travel group",
            icon: <RxDotFilled />,
          },
          {
            path: "/admin-management/approval-definition",
            path2:"/admin-management/approval-definition/new-approval-definition",
            name: "Approval definition",
            icon: <RxDotFilled />,
          },

        ]
      },
      
      {
        path: "/master-data/report",
        path2:"/master-data/city/new-city",
        name: "Report",
        icon: <BiRadioCircle />,
        subSubModule: [
          {
            path: "/admin-management/booking-order-report",
            path2:"/admin-management/booking-order-report/new-booking-order-report",
            name: "Booking order report",
            icon: <RxDotFilled />,
          },
        ]
      },
      
    ]
  }
]

export const expenseManagement = [
  {
    path: "/insights",
    name: "Insights",
    icon: <BsMenuButtonWide />,
  },
  {
    path: "/expense-management",
    name: "Expense Management",   
    icon: <BsMenuButtonWide />,
    subModule: [
      {
        path: "/expense-management/employee-travel-reports",
        path2: "/expense-management/employee-travel-reports/new-employee-travel-reports",
        name: "Employee travel reports",
        icon: <BiRadioCircle />,
      },
      {
        path: "/expense-management/reimbursement-request-validation",
        path2: "/expense-management/reimbursement-request-validation/new-reimbursement-request-validation",
        name: "Reimbursement request validation",
        icon: <BiRadioCircle />,
      },
    ]
  }
]


const Sidebar = ({ isOpen, setIsOpen }) => {

  const [activeLink, setActiveLink] = useState(null);
  const activeRoute = useLocation().pathname;
  const toggle = () => {
    setIsOpen(!isOpen)
    setActiveLink(null); 
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

    const { state, updateState } = useContext(dataContext);
    const location = useLocation();



        const getPaths = (items) =>
      items.flatMap((item) => {
        const subModulePaths = item.subModule
          ? item.subModule.flatMap((subItem) => [subItem.path, subItem.path2])
          : [];
        const subSubModulePaths = item.subModule
          ? item.subModule.flatMap((subItem) =>
              subItem.subSubModule
                ? subItem.subSubModule.flatMap((subSubItem) => [subSubItem.path, subSubItem.path2])
                : []
            )
          : [];
        return [...subModulePaths, ...subSubModulePaths];
      });

    useEffect(() => {
      const pathsMasterData = getPaths(masterData);
      const pathsAdminManagement = getPaths(adminManagement);
      const pathsExpenseManagement = getPaths(expenseManagement);

      if (
        location.pathname === "/master-data" ||
        pathsMasterData.includes(location.pathname)
      ) {
        updateState(masterData);
      } else if (
        location.pathname === "/admin-management" ||
        pathsAdminManagement.includes(location.pathname)
      ) {
        updateState(adminManagement);
      } else if (
        location.pathname === "/expense-management" ||
        pathsExpenseManagement.includes(location.pathname)
      ) {
        updateState(expenseManagement);
      } else if (location.pathname === "/insights") {
        updateState(home);
      }
    }, [location.pathname]);

    

  
  return (
    <>
   
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar ${isOpen ? 'open' : 'closed'} `}
        >

          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {/* {state[0].title} */}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars" onClick={toggle}>
              {isOpen ? <FaArrowLeft /> : <TfiMenuAlt />}
            </div>
          </div>
          {
            <section className="barRoutes">
              {(state && state.length) ?
                state.map((s, i) => {
                  if (s.subModule) {
                    return (
                      <SidebarMenu
                        key={i}
                        setIsOpen={setIsOpen}
                        route={s}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        toggleFunction={toggle}
                        activeRoute={activeRoute}
                      />
                    );
                  }
                  return (
                    <NavLink
                      to={s.path}
                      key={i}
                      className={`links ${activeLink === (s.path) ? 'active' : ''}`}
                      // activeClassName="actives"
                      onClick={toggle}
                      title={s.name}
                    >
                      <div className="module_icon" >
                        {s.icon}
                        </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"
                          >
                            {s.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  );
                }) : ""}
            </section>
          }
        </motion.div>
      </div>
    </>
  )
}

export default Sidebar