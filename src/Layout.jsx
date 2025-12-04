import React from 'react'
import Navbar from './pages/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
      
    </>
  )
}

export default Layout