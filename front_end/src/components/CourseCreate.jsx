import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CourseCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!title || !description || !price || !image) {
      setError("Please fill in all fields");
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      formData.append("courseImage", image);

      await axios.post("http://localhost:3000/course/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/ourcourses");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create course";
      setError(msg);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/admin/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/admin/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="admin-container">
      <div id="sidebar">
        <div id="logo-section">
          <img
            src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
            alt="CourseHaven"
          />
          <h3>CourseHaven</h3>
        </div>

        <div id="admin-links">
          <Link to="/admin/dashboard" className="admin-navlink">
            <i className="ri-dashboard-line"></i> <span>Dashboard</span>
          </Link>
          <Link to="/admin/ourcourses" className="admin-navlink">
            <i className="ri-book-open-line"></i> <span>Manage Courses</span>
          </Link>
          <Link to="/admin/create-course" className="admin-navlink active">
            <i className="ri-add-circle-line"></i> <span>Create Course</span>
          </Link>
          <Link to="#" onClick={handleLogout} className="admin-navlink logout">
            <i className="ri-login-box-line"></i> <span>Logout</span>
          </Link>
        </div>
      </div>

      <div id="admin-content">
        <div id="admin-header">
          <h1>Create New Course</h1>
          <p>Add a new course to your platform</p>
        </div>

        <div id="create-course-form-container">
          <form id="createCourseForm" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="title">Course Title *</label>
              <input
                type="text"
                id="title"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (Rs.) *</label>
              <input
                type="number"
                id="price"
                placeholder="Enter course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Course Image *</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
