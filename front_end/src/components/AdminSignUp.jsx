import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/admin/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      navigate("/admin/login");
    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.message || err?.message || 'Signup failed. Try again'
      setError(msg)
    }
  };

  return (
    <div id="adminsignup">
      <div id="head">
        <h1>
          <span>Admin</span> Sign Up
        </h1>
        <p>Create your admin account</p>
      </div>

      <form id="adminForm" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Admin Account"}
        </button>

        <p className="login-link">
          Already an admin?{" "}
          <span onClick={() => navigate("/admin/login")}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default AdminSignUp;