import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom"; // ✅ im

function Login1() {
  const [email, setEmail] = useState("");
   const navigate = useNavigate(); // ✅ initialize navigate

  const [password, setPassword] = useState(""); // ✅ password state
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login", // ✅ correct API
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setMessage("✅ Login successful");

    // 🔹 Redirect after login
    setTimeout(() => {
      navigate("/user/dashboard");
    }, 1000);

  } catch (error) {
    setMessage(
      error.response?.data?.message || "❌ Invalid credentials"
    );
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          User Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-3 text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login1;
