import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/MainLogo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "Redux/adminSlice";
import { setLoggedIn } from "Redux/adminSlice";
import { selectAdmin } from "Redux/adminSlice";
import { getData } from "Redux/adminSlice";
import { selectLoadingStatus } from "Redux/adminSlice";

var ps;

function Admin(props) {
  const loadingStatus = useSelector(selectLoadingStatus);
  const logged = useSelector(selectLoggedIn);
  const Admin = useSelector(selectAdmin);
  const loading = useSelector((state) => state.Admin.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("Token");
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const checkLog = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (token && !logged && Object.values(loadingStatus).every(status => status === false)) {
        console.log("i fking set logged in true???");
        dispatch(setLoggedIn(true))
        navigate("/admin/dashboard")
      } else if (!token && logged && Object.values(loadingStatus).every(status => status === false)) {
        console.log("i fking deleted token");
        localStorage.removeItem("Token");
      } else if (!token && logged && Object.values(loadingStatus).every(status => status === false)) {
        console.log("i fking set logged in false");
        setLoggedIn(false)
      }
    } catch (error) {
      console.log(await logged)
    }
  }
  useEffect(() => {
    checkLog()
    if (location.pathname === "/admin/login" && logged && token && Object.values(loadingStatus).every(status => status === false)) {
      console.log("noooooooooo");
      navigate("/admin/dashboard")
    }
  }, [logged])
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  }, []);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  React.useEffect(() => {
    // const timer = setTimeout(() => {
    if (location.pathname !== "/admin/login" && !token && Object.values(loadingStatus).every(status => status === false)) {
      console.log("logged state???:", logged);
      console.log("gotchaaaaaa");
      navigate("/admin/login");
    }

    // }, 500);
    // const timer2 = setTimeout(() => {

    // }, 500);
    // Cleanup function to clear the timeout if the component unmounts
    // return () => clearTimeout(timer, timer2);
  }, [logged, loadingStatus]);     // this function opens and closes the sidebar on small devices
  // useEffect(() => {
  //   if (location.pathname === "/admin/login") {
  //     console.log("found u hiding in login b");
  //   }
  // }, [])
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "ADMIN NAME",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                {!logged && <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />}
              </Routes>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );

}

export default Admin;
