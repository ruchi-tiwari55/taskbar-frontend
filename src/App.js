import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import TaskForm from "./components/TaskForm";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard";
import TaskList from "./components/TaskList";
import AdminPendingTasks from "./Admin/Task";
import AdminAllTasks from "./Admin/Alltask";
import AdminApprovedTasks from "./Admin/AdminApprove";
import Dashboard from "./Admin/Dashboard";
import UserDashboard from "./components/userDashboard";
import CreateTask from "./Admin/Newtasks";
import Alltasks from "./Admin/AlllTask";
import TodayTasks from "./Admin/TodayTask";
import Allusers from "./Admin/Allusers";
import UserTask from "./User_client/UserTask";
import Register from "./User_client/Register"
import Login1 from "./User_client/login";
import AssignTask from "./User_client/AssignTask";
import LoginAdmin from "./Admin/LoginAdmin";
import GetUserTask from "./User_client/GetUserTask";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./Admin/Logout";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">
          Create User
        </Link>
        <Link to="/task" className="hover:underline">
          Task Form
        </Link>
          <Link to="/admin/login" className="hover:underline">
          Admin 
        </Link>
          {/* <Link to="/admin-dashboard" className="hover:underline">
          Admin dashboard
        </Link> */}
         <Link to="/user/dashboard" className="hover:underline">
          User Dashboard
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskForm />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
           {/* <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } */}
      {/* /> */}
        <Route path="/TaskList" element={<TaskList />} />
        <Route path="/admin/tasks/pending" element={<AdminPendingTasks />} />
        <Route path="/admin/tasks" element={<AdminAllTasks />} />
        <Route path="/admin/tasks/approved" element={<AdminApprovedTasks />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/new-task" element={<CreateTask />} />
        <Route path="/user/Allll-Task" element={<Alltasks />} />
        <Route path="/admin/Today-Tasks" element={<TodayTasks />} />
        <Route path="/user/Today-Tasks" element={<TodayTasks />} />
        <Route path="/admin/users" element={<Allusers />} />
        <Route path="/users/task" element={<UserTask />} />
        <Route path="/user/tasks" element={<GetUserTask/>} />
        <Route path="/AssignNew/tasks" element={<AssignTask />} />
        <Route path="/admin/logout" element={<Logout />} />
      </Routes>

    </div>
  );
}

export default App;
