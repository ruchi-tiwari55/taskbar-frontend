import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams(); // task id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taskName: "",
    userName: "",
    latitude: "",
    longitude: "",
  });

  // 🔹 single task get (prefill form)
  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${id}`
      );

      setFormData({
        taskName: res.data.task.taskName,
        userName: res.data.task.userName,
        latitude: res.data.task.latitude,
        longitude: res.data.task.longitude,
      });
    } catch (error) {
      console.error("Task fetch error", error);
    }
  };

  // 🔹 input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 PUT API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        formData
      );

      alert("Task Updated Successfully ✅");
      navigate("/tasks"); // ya dashboard
    } catch (error) {
      console.error("Update error", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Update Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={formData.taskName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
        />

        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
        />

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
