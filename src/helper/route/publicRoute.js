import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function PublicRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token && props.restricted) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
PublicRoute.propTypes = {
  restricted: PropTypes.bool
};
