import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
        "http://localhost:3000/user/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.message || err?.message || 'Login failed. Try again'
      setError(msg)
    }
  };

  return (
    <div id="login">
      <div id="head">
        <h1>
          welcome to <span>courseHeaven</span>
        </h1>
        <p>Log in to access paid content!</p>
      </div>

      <form id="loginForm" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
