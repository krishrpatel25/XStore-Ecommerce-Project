import React from 'react'
import Navbar from './pages/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './pages/footer/Footer'
import BackToTopButton from './components/ui/BackToTopButton'

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <BackToTopButton/>
      <Footer/>
    </>
  )
}

export default Layout