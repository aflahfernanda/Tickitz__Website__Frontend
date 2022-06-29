import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let dataUser = useSelector((state) => state.user.data);
  // dataUser = JSON.parse(dataUser);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (props.isAdmin && dataUser?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool
};
