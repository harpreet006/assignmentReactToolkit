import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userLoggedIn } = useSelector((state) => state.auth);

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
