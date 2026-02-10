import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    taskName: "",
    taskDate: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch users list
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/register");
      setUsers(res.data.users || []);

      // optionally fetch tasks if needed
      const tasksRes = await axios.get("http://localhost:5000/api/tasks");
      setAllTasks(tasksRes.data.tasks || []);
    } catch (error) {
      console.error("Error fetching users or tasks:", error);
    }
  };

  // 🔹 Handle user select
  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((u) => u._id === userId);
    setFormData((prev) => ({ ...prev, userName: user?.name || "" }));
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: formData.userName,
        taskName: formData.taskName,
        taskDate: formData.taskDate,
      };

      const res = await axios.post("http://localhost:5000/api/tasks", payload);
      console.log("POST API RESPONSE:", res.data);

      setMessage("✅ Task created successfully");
      setFormData({ userName: "", taskName: "", taskDate: "" });
      navigate("/AssignNew/tasks");
    } catch (error) {
      console.error("POST ERROR 👉", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "❌ Failed to create task");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* USER SELECT */}
        <select
          value={users.find(u => u.name === formData.userName)?._id || ""}
          onChange={handleUserChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* TASK NAME */}
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={formData.taskName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* TASK DATE */}
        <input
          type="date"
          name="taskDate"
          value={formData.taskDate}
          onChange={handleChange}
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
