import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdminLoggedIn");
  return (
    <div id="footer">
      <div id="part1">
        <div id="top">
          <img
            src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
            alt=""
          />
          <h3>CourseHaven</h3>
        </div>
        <h2>Follow us</h2>
        <div id="socials">
          <p>
            <i class="ri-facebook-circle-line"></i>
          </p>
          <p>
            <i class="ri-instagram-line"></i>
          </p>
          <p>
            <i class="ri-twitter-line"></i>
          </p>
        </div>
      </div>
      <div id="part2">
        <h2>connects</h2>
        <p>youtube- courseApp</p>
        <p>telegram- courseApp</p>
        <p>github- courseApp</p>
      </div>
      <div id="part3">
        <h2> copyright © 2024</h2>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
        <p>Refund and Cancellation</p>

        {isAdmin === "true" ? (
          <p
            style={{ cursor: "pointer", color: "orangered" }}
            onClick={() => navigate("/admin/dashboard")}
          >
            Go to Admin Dashboard
          </p>
        ) : (
          <p
            style={{ cursor: "pointer", color: "orangered" }}
            onClick={() => navigate("/admin")}
          >
            Admin Login
          </p>
        )}
      </div>
    </div>
  );
};

export default Footer;
