import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, mobile }
      );

      setMessage("✅ Login successful");
      console.log(res.data.user);
    } catch (error) {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          User Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Mobile"
            className="w-full border p-2 rounded"
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-3 text-sm">{message}</p>
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

export default Login;
