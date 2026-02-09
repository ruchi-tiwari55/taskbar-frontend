import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // or check session/auth context

  if (!isLoggedIn) {
    // if user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // if logged in, render the children component (AdminDashboard)
  return children;
}

export default PrivateRoute;
