import React from "react";
import { useNavigate } from "react-router-dom";

const AdminEntry = () => {
  const navigate = useNavigate();

  return (
    <div id="admin-entry">
      <div id="admin-entry-box">
        <h1>
          <span>Admin</span> Access
        </h1>
        <p>Manage courses and platform content</p>

        <div className="admin-buttons">
          <button onClick={() => navigate("/admin/login")}>
            Admin Login
          </button>
          <button onClick={() => navigate("/admin/signup")}>
            Admin Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEntry;
