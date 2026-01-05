import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:3000/user/allPurchases", { withCredentials: true })
      .then((res) => {
        setPurchases(res.data.purchasedCourses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/user/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="purchases-page">
      <div id="purchases-sidebar">
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
          <Link to="/courses" className="navlinks">
            <i className="ri-book-open-line"></i> <span>Courses</span>
          </Link>
          <Link to="/purchases" className="navlinks active">
            <i className="ri-shopping-cart-line"></i> <span>My Purchases</span>
          </Link>
          <Link to="#" onClick={handleLogout} className="navlinks logout">
            <i className="ri-login-box-line"></i> <span>Logout</span>
          </Link>
        </div>
      </div>

      <div id="purchases-content">
        <div id="purchases-header">
          <h1>My Purchases</h1>
          <p>View all your purchased courses</p>
        </div>

        {loading ? (
          <div className="loading">
            <p>Loading your courses...</p>
          </div>
        ) : purchases.length === 0 ? (
          <div id="no-purchases">
            <div className="no-purchases-icon">📚</div>
            <h2>No purchases yet</h2>
            <p>You haven't purchased any courses yet</p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div id="purchases-grid">
            {purchases.map((course) => (
              <div key={course._id} className="purchase-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="purchase-image"
                />
                <div className="purchase-body">
                  <h3 className="purchase-title">{course.title}</h3>
                  <p className="purchase-description">{course.description}</p>
                  <div className="purchase-footer">
                    <span className="purchase-price">Rs. {course.price}</span>
                    <span className="badge-owned">✓ Owned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
