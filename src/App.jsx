import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import { url } from "./utils/url.js";
import axios from "axios";
import Signup from "./Pages/Signup/Signup.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/Slices/userSlice.jsx";
import VerifyUser from "./Pages/VerifyUser/VerifyUser.jsx";
import ChangePassword from "./Pages/ChangePassword/ChangePassword.jsx";
import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import LoanRequest from "./Pages/LoanRequest/LoanRequest.jsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";

const api = axios.create({
  baseURL: url,
});

function App() {
  const currentPath = window.location.pathname; // Get the current path
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");
  console.log(token);

  const checkUserLoggedIn = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return 
      }
      setLoading(true);
      const res = await api.get("auth/isUserLoggedIn", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setLoading(false);
      if (res?.data?.message === "User is logged in") {
        dispatch(loginSuccess(res?.data?.data));
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentPath === "/user/dashboard" || currentPath === "/login") {
      checkUserLoggedIn(); // Call the function if the path matches
    }
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/otp" element={<VerifyUser />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user/dashboard"
            element={
              <UserDashboard
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            }
          />
          <Route
            path="/user/loan-req"
            element={
              <LoanRequest
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
