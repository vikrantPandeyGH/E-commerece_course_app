import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

const UpdateCourse = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/course/single-course/${id}`,
          { withCredentials: true }
        )

        const course = res.data.course
        setTitle(course.title)
        setDescription(course.description)
        setPrice(course.price)
        setImage(null) // image optional on update
      } catch (err) {
        setError('Failed to load course')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (updating) return

    setError('')

    // ✅ image NOT required for update
    if (!title || !description || !price) {
      setError('Please fill in all required fields')
      return
    }

    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price')
      return
    }

    setUpdating(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('price', parseFloat(price))

      // ✅ send image only if changed
      if (image) {
        formData.append('courseImage', image)
      }

      await axios.patch(
        `http://localhost:3000/course/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      navigate('/admin/ourcourses')
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to update course'
      setError(msg)
      setUpdating(false)
    }
  }

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/admin/logout', {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('isAdminLoggedIn')
        navigate('/admin/login')
      })
      .catch((err) => console.log(err))
  }

  if (loading) {
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
        </div>
        <div id="admin-content">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

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
          <Link
            to="#"
            onClick={handleLogout}
            className="admin-navlink logout"
          >
            <i className="ri-login-box-line"></i> <span>Logout</span>
          </Link>
        </div>
      </div>

      <div id="admin-content">
        <div id="admin-header">
          <h1>Update Course</h1>
          <p>Edit course information</p>
        </div>

        <div id="create-course-form-container">
          <form id="updateCourseForm" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Course Description *</label>
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Price (Rs.) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Course Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button type="submit" disabled={updating} className="btn-primary">
              {updating ? 'Updating...' : 'Update Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCourse
