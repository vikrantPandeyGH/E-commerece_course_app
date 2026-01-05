import React from 'react'
import Navbar from './Navbar'
import Center from './Center'
import Footer from './Footer'
import { useState } from 'react'

const Home = () => {
  return (
    <div id='home'>
      <Navbar/>
      <Center/>
      <Footer/>
    </div>
  )
}

export default Home