import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  // role = "admin" ya "user"
  
  if (role === "admin") {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) return <Navigate to="/admin/login" replace />;
  } else if (role === "user") {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (!userLoggedIn) return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
