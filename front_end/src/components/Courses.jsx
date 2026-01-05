import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const res = localStorage.getItem("isLoggedIn");
    if (res === "true") {
      setLogin(true);
    }
    axios
      .get("http://localhost:3000/course/all-courses")
      .then((res) => {
        setCourses(res.data.courses);
        setFiltered(res.data.courses);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/user/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("isLoggedIn");
        setLogin(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setFiltered(courses);
    } else {
      const newArr = courses.filter((obj) =>
        obj.title.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(newArr);
    }
  };

  return (
    <div id="courses-page">
      <div id="courses-sidebar">
        <div id="sidebar-header">
          <img
            src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
            alt="CourseHaven"
            className="sidebar-logo"
          />
          <h3>CourseHaven</h3>
        </div>

        <div id="sidebar-links">
          <Link to="/" className="navlinks">
            <i className="ri-home-7-line"></i> <span>Home</span>
          </Link>
          <Link to="/courses" className="navlinks active">
            <i className="ri-book-open-line"></i> <span>Courses</span>
          </Link>
          <Link to="/purchases" className="navlinks">
            <i className="ri-shopping-cart-line"></i> <span>My Purchases</span>
          </Link>
          {login ? (
            <Link to="#" onClick={handleLogout} className="navlinks logout">
              <i className="ri-login-box-line"></i> <span>Logout</span>
            </Link>
          ) : (
            <Link to="/login" className="navlinks">
              <i className="ri-login-box-line"></i> <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      <div id="courses-content">
        <div id="courses-header">
          <div>
            <h1>All Courses</h1>
            <p>Choose from our wide range of courses</p>
          </div>
          <div id="search-bar">
            <i className="ri-search-line"></i>
            <input
              type="text"
              placeholder="Search course..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div id="courses-grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <p>No courses found matching "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((course) => (
              <div key={course._id} className="course-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <div className="course-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <span className="course-price">Rs. {course.price}</span>
                    <button
                      onClick={() => navigate(`/buy/${course._id}`)}
                      className="btn-buy"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
