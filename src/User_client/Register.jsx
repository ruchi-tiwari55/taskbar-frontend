// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message || "User registered successfully!");
      setFormData({ name: "", email: "", password: "" }); // reset form
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>}
    </div>
  );
};

export default Register;
