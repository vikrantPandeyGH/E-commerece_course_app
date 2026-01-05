import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [login, setlogin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

 useEffect(() => {
  axios
    .get("http://localhost:3000/user/me", { withCredentials: true })
    .then(() => {
      setlogin(true);
      localStorage.setItem("isLoggedIn", "true");
    })
    .catch(() => {
      setlogin(false);
      localStorage.removeItem("isLoggedIn");
    });
}, []);


  async function logout() {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      )
      localStorage.removeItem("isLoggedIn");
      setlogin(false);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to logout'
      alert(msg)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div id='navbar'>
      <div id="left">
        <img src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp" alt="" />
        <h3>CourseHaven</h3>
      </div>

      <div id="right">
        {login ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to='/login'><button>login</button></Link>
            <Link to='/signup'><button>signup</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
