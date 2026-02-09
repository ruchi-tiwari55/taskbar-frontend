import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token/session remove
    localStorage.removeItem("adminToken"); 
    // Redirect to login page
    navigate("/admin/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
