import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";

// components
import Sidebar from "../components/sidebar/Sidebar";

// pages
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import TaskList from "../pages/task/TaskList";

const AuthenticatedLayout = () => {
  const { isSidebarCollapsed } = useSelector((state) => state.layout);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("clickup")) {
      navigate("/login");
    }
  }, [Cookies]);

  return (
    <>
      {Cookies.get("clickup") !== undefined ? (
        <>
          <Sidebar />
          <div
            className={`pt-[50px] transition-all w-full ${
              isSidebarCollapsed ? "pl-[80px]" : "pl-[250px]"
            } bg-base-100 overflow-hidden`}
          >
            <div
              style={{ minHeight: "calc(100vh - 50px" }}
              className={"px-8 py-5 w-full"}
            >
              <Routes>
                <Route path="/" element={<Navigate to={"/task"} />} />
                <Route path="/task" element={<TaskList />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<AuthenticatedLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
