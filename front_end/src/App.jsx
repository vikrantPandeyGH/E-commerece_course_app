import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Courses from './components/Courses'
import Purchases from './components/Purchases'
import Buy from './components/Buy'
import AdminLogin from './components/AdminLogin'
import AdminSignUp from './components/AdminSignUp'
import Dashboard from './components/Dashboard'
import CourseCreate from './components/CourseCreate'
import UpdateCourse from './components/UpdateCourse'
import OurCourses from './components/OurCourses'
import AdminEntry from './components/AdminEntry'

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        <Route path='/courses' element={<Courses/>}></Route>
        <Route path='/purchases' element={<Purchases/>}></Route>
        <Route path='/buy/:courseId' element={<Buy/>}></Route>
      
       {/* admin routes */}
        <Route path='/admin' element={<AdminEntry/>}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/signup' element={<AdminSignUp/>}></Route>
        <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin/create-course' element={<CourseCreate/>}></Route>
        <Route path='/admin/update-course/:id' element={<UpdateCourse/>}></Route>
        <Route path='/admin/ourcourses' element={<OurCourses/>}></Route>
      </Routes>
    </div>
  )
}

export default App