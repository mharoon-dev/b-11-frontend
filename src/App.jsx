import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import { Home } from './Pages/Home/Home.jsx';
import { url } from './utils/url.js';
import axios from 'axios';
import Signup from './Pages/Signup/Signup.jsx';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/Slices/userSlice.jsx';
import VerifyUser from './Pages/VerifyUser/VerifyUser.jsx';

const api = axios.create({
  baseURL: url,
});

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await api.get("auth/isUserLoggedIn", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      console.log(res);
      if (res?.data?.message === "User is logged in") {
        dispatch(loginSuccess(res?.data?.data));
      }
    };
    isUserLoggedIn();
  }, []);

  return (
    <>
     
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<VerifyUser />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    
      
    </>
  )
}

export default App
