import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn");
    if (isAdmin === "true") {
      navigate("/admin/dashboard");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/admin/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } catch (err) {
      setLoading(false);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again";
      setError(msg);
    }
  };

  return (
    <div id="admin-login">
      <div id="head">
        <h1>
          <span>Admin</span> Login
        </h1>
        <p>Log in to manage courses</p>
      </div>

      <form id="adminLoginForm" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Admin Login"}
        </button>

        <p className="signup-link">
          New admin?{" "}
          <span onClick={() => navigate("/admin/signup")}>Create account</span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
