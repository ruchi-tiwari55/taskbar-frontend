
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";





function CreateTask() {
  const [users, setUsers] = useState([]);
  const [selectedUserTask, setSelectedUserTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
  userName: "",
  taskName: "",
  taskDate: "",
});


  const [message, setMessage] = useState("");

  // 🔹 Fetch users list
   useEffect(() => {
  fetchUsersFromTasks();
}, []);

const fetchUsersFromTasks = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/tasks");

    setAllTasks(res.data.tasks || []);

    const uniqueUsers = [
      ...new Set(
        res.data.tasks
          .map(task => task.userName)
          .filter(Boolean)
      )
    ];

    setUsers(uniqueUsers);
  } catch (error) {
    console.error("Error fetching users from tasks:", error);
  }
};



  // 🔹 Handle input change
  const handleUserChange = (e) => {
  const userName = e.target.value;

  setFormData({
    ...formData,
    userName,
  });

  // 🔍 is user ka latest task
  const userTasks = allTasks.filter(
    (task) => task.userName === userName
  );

  if (userTasks.length > 0) {
    // last task (latest)
    const latestTask = userTasks[userTasks.length - 1];
    setSelectedUserTask(latestTask);
  } else {
    setSelectedUserTask(null);
  }
};
////
///// normal user ke liye
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};



  // 🔹 Submit task
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!selectedUserTask?.selfie) {
      setMessage("❌ No selfie found for selected user");
      return;
    }

    const payload = {
      userName: formData.userName,
      taskName: formData.taskName,
      selfie: selectedUserTask.selfie,   // ✅ REUSE OLD SELFIE
      taskDate: formData.taskDate         // optional if backend uses it
    };

    // 🔹 POST request
    const res = await axios.post("http://localhost:5000/api/tasks", payload);

    // 🔹 ✅ LOG RESPONSE IN CONSOLE
    console.log("POST API RESPONSE:", res.data);

    setMessage("✅ Task created successfully");

    setFormData({
      userName: "",
      taskName: "",
      taskDate: "",
    });

    setSelectedUserTask(null);
    // ✅ Navigate to AssignNew/tasks
    navigate("/AssignNew/tasks");

  } catch (error) {
    console.error("POST ERROR 👉", error.response?.data || error.message);
    setMessage(
      error.response?.data?.message || "❌ Failed to create task"
    );
  }
};



 




 

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* USER SELECT */}
        <select
  name="userName"
  value={formData.userName}
  onChange={handleUserChange}
  className="w-full border p-2 rounded"
  required
>
  <option value="">Select User</option>

  {users.map((user, index) => (
    <option key={index} value={user}>
      {user}
    </option>
  ))}
</select>

       

        
  
{selectedUserTask?.selfie && (
  <div className="mt-4 text-center">
    <p className="font-medium mb-2">User Selfie (Auto)</p>
    <img
      src={`http://localhost:5000/${selectedUserTask.selfie}`}
      alt="User Selfie"
      className="w-32 h-32 rounded-full mx-auto object-cover border"
    />
  </div>
)}



        {/* TASK NAME */}
        <input
  type="text"
  name="taskName"
  placeholder="Task Name"
  value={formData.taskName}
  onChange={handleChange}   // ✅ CORRECT
  className="w-full border p-2 rounded"
  required
/>



       

        {/* TASK DATE */}
        <input
  type="date"
  name="taskDate"
  value={formData.taskDate}
  onChange={handleChange}   // ✅ CORRECT
  className="w-full border p-2 rounded"
  required
/>



        

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
