import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  roles: string[];
};
export const userRole = JSON.parse(window.localStorage.getItem("user") || "{}")?.role;

const ValidateRoute = (props: Props) => {
  const { children, roles } = props;

  return roles?.includes(userRole) ? children : <Navigate to="/" replace />;
}

export default ValidateRoute;
