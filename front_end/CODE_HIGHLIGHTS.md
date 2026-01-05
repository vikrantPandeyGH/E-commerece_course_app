# CourseHaven - Code Highlights & Examples

## 💡 Key Code Patterns Used

### 1. Protected Route with Authentication Check

**From: Courses.jsx, Purchases.jsx, Buy.jsx**

```jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MyComponent() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      navigate('/login') // Redirect to login if not authenticated
    }
  }, [navigate])
  
  // Component renders only if user is logged in
  return <div>Protected content</div>
}
```

**Why This Works**: useEffect runs after component mounts, checking auth status and redirecting before any API calls.

---

### 2. Form Submission with Validation & Error Handling

**From: Login.jsx, CourseCreate.jsx**

```jsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault() // Prevent page reload
  setError('') // Clear previous errors
  
  // Validation
  if (!email || !password) {
    setError('Please fill in all fields')
    return
  }
  
  setLoading(true) // Show loading state
  
  try {
    // Make API call
    const res = await axios.post(
      'http://localhost:3000/user/login',
      { email, password },
      { withCredentials: true } // Send cookies
    )
    
    // Success
    localStorage.setItem('isLoggedIn', 'true')
    navigate('/') // Navigate after success
  } catch (err) {
    // Error handling
    const msg = err.response?.data?.message || 'Login failed'
    setError(msg)
    setLoading(false) // Hide loading on error
  }
}

return (
  <form id="loginForm" onSubmit={handleSubmit}>
    {error && <div className="error-message">{error}</div>}
    
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    
    <button type="submit" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  </form>
)
```

**Key Points**:
- Validate before API call
- Show loading state
- Handle errors gracefully
- Clear previous errors
- Use withCredentials for cookie-based auth

---

### 3. Data Fetching with useEffect

**From: Center.jsx, OurCourses.jsx**

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    // Function to fetch data
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/course/all-courses')
        setCourses(res.data.courses) // Update state with data
      } catch (err) {
        setError('Failed to load courses')
      } finally {
        setLoading(false) // Always hide loading
      }
    }
    
    fetchCourses() // Call function
  }, []) // Empty dependency array = run once on mount
  
  // Show loading state
  if (loading) return <p>Loading courses...</p>
  
  // Show error state
  if (error) return <p>{error}</p>
  
  // Show empty state
  if (courses.length === 0) return <p>No courses found</p>
  
  // Render data
  return (
    <div>
      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Rs. {course.price}</p>
        </div>
      ))}
    </div>
  )
}
```

**Key Points**:
- Define async function inside useEffect
- Handle loading, error, and success states
- Use finally to always stop loading
- Empty dependency array for mount-only
- Proper error handling with try-catch

---

### 4. Search/Filter Functionality

**From: Courses.jsx**

```jsx
const [courses, setCourses] = useState([])
const [filtered, setFiltered] = useState([])
const [searchTerm, setSearchTerm] = useState('')

// Load all courses on mount
useEffect(() => {
  axios.get('http://localhost:3000/course/all-courses')
    .then(res => {
      setCourses(res.data.courses)
      setFiltered(res.data.courses)
    })
}, [])

// Filter function
const handleSearch = (value) => {
  setSearchTerm(value)
  
  if (value === '') {
    setFiltered(courses) // Reset if empty
  } else {
    // Filter by title (case-insensitive)
    const newArr = courses.filter(course =>
      course.title.toLowerCase().includes(value.toLowerCase())
    )
    setFiltered(newArr)
  }
}

return (
  <div>
    <input
      type="text"
      placeholder="Search course..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
    
    <div>
      {filtered.length === 0 ? (
        <p>No courses found matching "{searchTerm}"</p>
      ) : (
        filtered.map(course => (
          <div key={course._id}>
            {/* Course card */}
          </div>
        ))
      )}
    </div>
  </div>
)
```

**Key Points**:
- Keep original array intact
- Filter in real-time as user types
- Show "no results" message
- Case-insensitive search

---

### 5. Conditional Rendering Based on Auth

**From: Navbar.jsx**

```jsx
const [loggedIn, setLoggedIn] = useState(false)

useEffect(() => {
  axios.get('http://localhost:3000/user/me', { withCredentials: true })
    .then(() => setLoggedIn(true))
    .catch(() => setLoggedIn(false))
}, [])

const handleLogout = () => {
  axios.post('http://localhost:3000/user/logout', {}, 
    { withCredentials: true }
  ).then(() => {
    localStorage.removeItem('isLoggedIn')
    setLoggedIn(false)
  })
}

return (
  <div id="navbar">
    {loggedIn ? (
      <button onClick={handleLogout}>Logout</button>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    )}
  </div>
)
```

**Key Points**:
- Check auth status on mount
- Show different UI based on auth state
- Proper logout with cookie clearing
- Clear localStorage on logout

---

### 6. Dynamic Image Preview (CourseCreate.jsx)

```jsx
const [image, setImage] = useState('')

return (
  <div>
    <input
      type="url"
      placeholder="Enter image URL"
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />
    
    {/* Show preview only if image URL is valid */}
    {image && (
      <div className="image-preview">
        <p>Preview:</p>
        <img src={image} alt="Course preview" />
      </div>
    )}
  </div>
)
```

**Key Points**:
- Only show preview if image URL exists
- Real-time preview as user types
- Helps validate image URL before submission

---

### 7. Admin Dashboard with Quick Links

**From: Dashboard.jsx**

```jsx
return (
  <div id="admin-container">
    <Sidebar />
    
    <div id="admin-content">
      <h1>Admin Dashboard</h1>
      
      {/* Quick access cards */}
      <div id="admin-cards">
        <div className="admin-card">
          <h3>Manage Courses</h3>
          <Link to="/admin/ourcourses" className="card-button">
            Go to Courses
          </Link>
        </div>
        
        <div className="admin-card">
          <h3>Create New Course</h3>
          <Link to="/admin/create-course" className="card-button">
            Create Course
          </Link>
        </div>
      </div>
    </div>
  </div>
)
```

**Key Points**:
- Card-based navigation
- Quick access to main features
- Professional layout
- Easy to add more cards

---

### 8. Course Management Table

**From: OurCourses.jsx**

```jsx
const handleDelete = async (courseId) => {
  if (window.confirm('Delete this course?')) {
    try {
      await axios.delete(
        `http://localhost:3000/course/${courseId}`,
        { withCredentials: true }
      )
      // Remove from state after successful delete
      setCourses(courses.filter(c => c._id !== courseId))
    } catch (err) {
      alert('Failed to delete course')
    }
  }
}

return (
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <tr key={course._id}>
          <td>
            <img src={course.image} alt={course.title} />
          </td>
          <td>{course.title}</td>
          <td>Rs. {course.price}</td>
          <td>
            <Link to={`/admin/update-course/${course._id}`}>Edit</Link>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
```

**Key Points**:
- Confirmation dialog before delete
- Update state after delete (removes row)
- Link to edit page with course ID
- Clean table layout

---

### 9. Form Validation Examples

**From: Signup.jsx**

```jsx
const [password, setPassword] = useState('')
const [error, setError] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  setError('')
  
  // Multiple validation checks
  if (!email || !password || !firstName || !lastName) {
    setError('Please fill in all fields')
    return
  }
  
  if (password.length < 6) {
    setError('Password must be at least 6 characters')
    return
  }
  
  // If all validations pass, proceed
  // ... API call ...
}
```

**Common Validations**:
- Empty field check
- Password length check
- Email format check (email input type)
- Number validation (type="number")
- URL validation (type="url")

---

### 10. Responsive Navigation with Sidebar

**CSS for responsive sidebar:**

```css
#sidebar {
  width: 22vw;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 2.5vh 2vw;
  position: sticky;
  top: 0;
  height: 100vh;
}

.admin-navlink {
  display: flex;
  align-items: center;
  gap: 1.2vw;
  padding: 1.3vh 1.4vw;
  color: #b0b0b0;
  transition: all 0.3s ease;
}

.admin-navlink:hover {
  background-color: rgba(255, 69, 0, 0.1);
  color: orangered;
  padding-left: 1.7vw;
}

.admin-navlink.active {
  background-color: rgba(255, 69, 0, 0.2);
  color: orangered;
  border-left: 3px solid orangered;
}

@media (max-width: 768px) {
  #sidebar {
    width: 30vw;
  }
  
  .admin-navlink span {
    display: none; /* Hide text, show icons only */
  }
}

@media (max-width: 480px) {
  #sidebar {
    width: 100%;
    height: auto;
    border-bottom: 2px solid rgba(255, 69, 0, 0.2);
  }
}
```

**Key Points**:
- Sticky sidebar stays visible while scrolling
- Smooth hover transitions
- Active link highlighting
- Icons remain visible on mobile

---

## 🎓 Best Practices Demonstrated

### 1. **Error Handling**
```jsx
try {
  // API call
} catch (err) {
  const msg = err.response?.data?.message || 'Default error'
  setError(msg)
}
```

### 2. **Loading States**
```jsx
<button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

### 3. **Cleanup on Unmount**
```jsx
useEffect(() => {
  return () => {
    // Cleanup code here
  }
}, [])
```

### 4. **Proper Key in Lists**
```jsx
{courses.map(course => (
  <div key={course._id}> {/* Use unique ID */}
    {course.title}
  </div>
))}
```

### 5. **Dependency Arrays**
```jsx
// Run on mount only
useEffect(() => { }, [])

// Run when dependencies change
useEffect(() => { }, [dependency])

// Run on every render (avoid!)
// useEffect(() => { })
```

### 6. **Navigation After Success**
```jsx
.then(res => {
  localStorage.setItem('token', res.data.token)
  navigate('/dashboard') // Navigate after saving
})
```

---

## 🚀 Code Quality Tips

### What Makes Code Interview-Friendly
✅ Clear variable names (`courses`, `loading`, not `arr`, `l`)
✅ Proper indentation and formatting
✅ Comments on complex logic
✅ Consistent error handling
✅ Proper state management
✅ Validation before submission
✅ Loading and error states
✅ No console.log() left in code

### What to Avoid
❌ Multiple API calls without loading state
❌ Hardcoded URLs (use environment variables)
❌ console.log() in production code
❌ Ignoring error responses
❌ Props drilling too deep
❌ Missing error handling
❌ No validation on forms
❌ State mutations

---

## 💬 How to Explain These Patterns

### Form Handling
"I use React hooks to manage form state. When the user submits, I validate the input, make an API call, and handle errors. I show loading state and navigation after success."

### Data Fetching
"I use useEffect with an empty dependency array to fetch data on component mount. I manage loading, error, and success states to provide good user feedback."

### Authentication
"I check authentication status on app load. If the user is not logged in, I redirect them to the login page. I use localStorage to remember if they're logged in."

### Conditional Rendering
"I render different UI based on the user's authentication status. If they're logged in, I show a logout button. Otherwise, I show login and signup links."

### Search/Filter
"I keep the original data array and create a filtered version based on the search term. As the user types, I update the filtered list in real-time."

---

These code patterns demonstrate professional React development practices and are perfect for explaining in interviews!
