import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OurCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/course/admin-courses",
          { withCredentials: true }
        );

        setCourses(res.data.courses);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load courses";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (deletingId) return;
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setDeletingId(courseId);
    try {
      await axios.delete(`http://localhost:3000/course/delete/${courseId}`, {
        withCredentials: true,
      });

      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete course";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/admin/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/admin/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Admin logout failed";
      console.error(msg);
    }
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
          <Link to="/admin/ourcourses" className="admin-navlink active">
            <i className="ri-book-open-line"></i> <span>Manage Courses</span>
          </Link>
          <Link to="/admin/create-course" className="admin-navlink">
            <i className="ri-add-circle-line"></i> <span>Create Course</span>
          </Link>
          <Link to="#" onClick={handleLogout} className="admin-navlink logout">
            <i className="ri-login-box-line"></i> <span>Logout</span>
          </Link>
        </div>
      </div>

      <div id="admin-content">
        <div id="admin-header">
          <h1>Manage Courses</h1>
          <p>View and manage all courses</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="no-courses">
            <p>No courses found</p>
            <Link to="/admin/create-course" className="btn-primary">
              Create First Course
            </Link>
          </div>
        ) : (
          <div id="courses-table-container">
            <table id="courses-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <img
                        src={course.image}
                        alt={course.title}
                        className="course-thumb"
                      />
                    </td>
                    <td>{course.title}</td>
                    <td>{course.description.substring(0, 50)}...</td>
                    <td>Rs. {course.price}</td>
                    <td>
                      <Link
                        to={`/admin/update-course/${course._id}`}
                        className="btn-edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurCourses;
