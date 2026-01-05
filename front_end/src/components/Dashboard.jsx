import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn')
    if (isAdmin === 'true') {
      setAdminLoggedIn(true)
    } else {
      navigate('/admin/login')
    }
  }, [])

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/admin/logout', {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('isAdminLoggedIn')
        navigate('/admin/login')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div id="dashboard">
      <div id="sidebar">
        <div id="logo-section">
          <img
            src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
            alt="CourseHaven"
          />
          <h3>CourseHaven</h3>
        </div>
        
        <div id="admin-links">
          <Link to="/admin/dashboard" className="admin-navlink active">
            <i className="ri-dashboard-line"></i> <span>Dashboard</span>
          </Link>
          <Link to="/admin/ourcourses" className="admin-navlink">
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
          <h1>Admin Dashboard</h1>
          <p>Welcome to CourseHaven Admin Panel</p>
        </div>
        
        <div id="admin-cards">
          <div className="admin-card">
            <div className="card-icon">📚</div>
            <h3>Manage Courses</h3>
            <p>Create, update, or delete courses</p>
            <Link to="/admin/ourcourses" className="card-button">
              Go to Courses
            </Link>
          </div>
          
          <div className="admin-card">
            <div className="card-icon">➕</div>
            <h3>Create New Course</h3>
            <p>Add a new course to your platform</p>
            <Link to="/admin/create-course" className="card-button">
              Create Course
            </Link>
          </div>
          
          <div className="admin-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account settings</p>
            <button className="card-button">Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard