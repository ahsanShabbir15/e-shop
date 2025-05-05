import { ToastContainer } from 'react-toastify'; 
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home, About, ContactUs, Login, SignUp, Cart, ErrorPage, Dashboard } from './components/pages';
const Wrapper = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <>
      {!hideNavbar && <Navbar />}

    </>
  )
}
const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('dark');
        // document.documentElement.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        // document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);
  
  return (
    <>
      <BrowserRouter>
        <Wrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>

  )
}

export default App
