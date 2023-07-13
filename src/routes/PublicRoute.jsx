import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (!user) return children;
  return <Navigate to="/" />;
};

export default PublicRoute;
