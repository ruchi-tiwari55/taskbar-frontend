import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    newTasks: 0,
    allTasks: 0,
    allUsers: 0,
    todayTasks: 0,
  });

  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);

  // // const fetchDashboardData = async () => {
  // //   try {
  // //     const res = await axios.get("http://localhost:5000/api/admin/dashboard");
  // //     setStats(res.data);
  // //   } catch (err) {
  // //     console.error(err);
  // //   }
  // // };

  
  const navigate = useNavigate();
  const handleLogout = async () => {
  console.log("Logout button clicked");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    console.log("Logout response:", res.data);
    navigate("/login");
  } catch (error) {
    console.error("Logout failed", error.response || error);
  }
};




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
            {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard 📊</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link to="/user/new-task">
          <div className="bg-white shadow rounded p-5 hover:scale-105 transition">
            <h3 className="text-gray-500">New Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.newTasks}
            </p>
          </div>
        </Link>

        <Link to="/user/Allll-Task">
          <div className="bg-white shadow rounded p-5 hover:scale-105 transition">
            <h3 className="text-gray-500">All Tasks</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.allTasks}
            </p>
          </div>
        </Link>

        <Link to="/admin/users">
          <div className="bg-white shadow rounded p-5 hover:scale-105 transition">
            <h3 className="text-gray-500">All Users</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.allUsers}
            </p>
          </div>
        </Link>

        <Link to="/admin/Today-Tasks">
          <div className="bg-white shadow rounded p-5 hover:scale-105 transition">
            <h3 className="text-gray-500">Today Tasks</h3>
            <p className="text-3xl font-bold text-orange-600">
              {stats.todayTasks}
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default AdminDashboard;
