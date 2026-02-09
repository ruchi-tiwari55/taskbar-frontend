// src/components/1.jsx
import { Navigate } from "react-router-dom";

function AdminDashboard1() {
  const isLoggedIn = localStorage.getItem("token"); // ya Redux/Context se check karo

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // agar user login nahi hai toh redirect
  }

  return <div>Admin Dashboard</div>;
}

export default AdminDashboard1;
