// src/components/GetUserTask.jsx
import React, { useState } from "react";
import axios from "axios";

const GetUserTask = () => {
  const [taskId, setTaskId] = useState(""); // input for ID
  const [task, setTask] = useState(null);   // fetched task data
  const [message, setMessage] = useState(""); // error or info

  const handleInputChange = (e) => {
    setTaskId(e.target.value);
  };

  const fetchTask = async () => {
    if (!taskId) {
      setMessage("Please enter a task ID");
      setTask(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
      setTask(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setTask(null);
      setMessage(err.response?.data?.message || "Task not found");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Get Task By ID</h2>

      {/* Input for Task ID */}
      <div style={{ marginBottom: "10px" }}>
        <label>Task ID</label>
        <input
          type="text"
          value={taskId}
          onChange={handleInputChange}
          placeholder="Enter Task ID"
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        />
      </div>

      <button
        onClick={fetchTask}
        style={{ width: "100%", padding: "10px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px" }}
      >
        Fetch Task
      </button>

      {/* Show message */}
      {message && <p style={{ marginTop: "15px", color: "red", textAlign: "center" }}>{message}</p>}

      {/* Display task data */}
      {task && (
        <div style={{ marginTop: "20px" }}>
          <h3>Task Details:</h3>
          <p><strong>ID:</strong> {task._id}</p>
          <p><strong>Name:</strong> {task.taskName}</p>
          <p><strong>User:</strong> {task.userName || "N/A"}</p>
          <p><strong>Selfie:</strong> {task.selfie || "N/A"}</p>
          <p><strong>Latitude:</strong> {task.latitude || "N/A"}</p>
          <p><strong>Longitude:</strong> {task.longitude || "N/A"}</p>
          <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default GetUserTask;
