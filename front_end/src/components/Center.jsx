import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Center = () => {
  const navigate = useNavigate()
  const [arr, setarr] = useState([]);

  useEffect(function () {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:3000/course/all-courses");
        setarr(res.data.courses);
      } catch (err) {
        // silently fail; center is decorative
        console.error(err)
      }
    }
    fetch()
  }, []);

  return (
    <div id="center">

      <div id="upper">
        <h1>CourseHaven</h1>
        <p>Sharpen your skills with courses crafted by experts.</p>
        <div id="buttons">
          <button onClick={function(){
            navigate('/courses')
          }}>explore courses</button>
         <button onClick={function(){
          window.location.href='https://www.youtube.com/@LearnCodingOfficial'
         }}>course videos</button>
        </div>
      </div>

      <div id="lower" style={{ color: "white" }}>
        {arr.map(function (obj) {
          return (
            <div id="course">
              <img src={obj.image} alt="" />
              <h3>{obj.title}</h3>
              <button onClick={function(){
                navigate('/courses')
              }}>Enroll Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Center;
