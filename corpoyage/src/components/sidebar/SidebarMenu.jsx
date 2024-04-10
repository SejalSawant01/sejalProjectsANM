import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.1, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.1,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.02,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.02,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen, toggleFunction, activeRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [subModuleStates, setSubModuleStates] = useState({}); // State to track subModule visibility
  const [activeLink, setActiveLink] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setSubModuleStates({}); // Reset subModule visibility when toggling menu
    setIsOpen(true);
    setActiveLink(null); 
  };

  const toggleSubModule = (subModulePath) => {

    // use for open all 
    // setSubModuleStates((prevState) => ({
    //   ...prevState,
    //   [subModulePath]: !prevState[subModulePath],
    // }));

    

    // use for at a time open only one
    setSubModuleStates((prevState) => {
      const newState = { [subModulePath]: !prevState[subModulePath] };

      // Close other open subModules
      Object.keys(prevState).forEach((key) => {
        if (key !== subModulePath) {
          newState[key] = false;
        } 
      });

      return newState;
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    } else {
      const isActiveRoute = route.subModule.some((subRoute) => {
        return (
          subRoute.path === activeRoute ||
          (subRoute.subSubModule && subRoute.subSubModule.some((subSub) => subSub.path === activeRoute))
        );
      });

      if (!isMenuOpen) {
        setIsMenuOpen(isActiveRoute);
      }
    }
  }, [isOpen, route, activeRoute]);

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon" title={route.name}>
            {route.icon}
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
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {route.subModule && isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -180,
                  }
                : { rotate: 0 }
            }
          >
            {route.subModule.some((subRoute) => subRoute.subSubModule) && (
              <FaCaretDown style={{ fontSize: 20, cursor: "pointer" }} />
            )}
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && route.subModule && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subModule.map((subRoute, i) => (
              <motion.div key={i} variants={menuItemAnimation} custom={i} style={{background:"#e7e7e77e",borderRadius:8}}>
                {subRoute.subSubModule ? (
                  <>
                  <div className="menu_submodule"  onClick={() => toggleSubModule(subRoute.path)}>
                    <div className="menu_item">
                      <div className="icon mt-1" title={route.name} style={{ fontSize: 10 }}>
                        {subRoute.icon}
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text_submodule"
                          >
                            {subRoute.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {subRoute.subSubModule && isOpen && (
                      <motion.div 
                        animate={
                          subModuleStates[subRoute.path]
                            ? {
                                rotate: -180,
                              }
                            : { rotate: 0 }
                        }
                      >
                        <FaAngleDown style={{ cursor: "pointer" }} />
                      </motion.div>
                    )}
                  </div>
                   
                    {subRoute.subSubModule && subModuleStates[subRoute.path] && ( 
                      <motion.div 
                        variants={menuAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="submenu_container"
                      >
                        {subRoute.subSubModule.map((subSubRoute, j) => (
                          <motion.div key={j} variants={menuItemAnimation} custom={j}>
                            <NavLink to={subSubRoute.path} className={`links_submodule ${activeLink === (subSubRoute.path) ? 'active' : ''}`}>
                              <div className="module_icon">{subSubRoute.icon}</div>
                              <motion.div className="submodule_text py-1">{subSubRoute.name}</motion.div>
                            </NavLink>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  // Render submodule without subSubmodules
                  <NavLink to={subRoute.path} className="links_submodule" onClick={toggleFunction}>
                    <div className="module_icon mt-1" style={{ fontSize: 10 }}>{subRoute.icon}</div>
                    <motion.div className="submodule_text py-1">{subRoute.name}</motion.div>
                  </NavLink>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
