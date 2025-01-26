import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "./Login.css";
import { url } from "../../utils/url.js";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/Slices/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";

const api = axios.create({
  baseURL: url,
});

const Login = () => {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cnic: "", // Changed from storeNumber to cnic
    password: "",
  });
  const navigate = useNavigate();

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const res = await api.post("auth/login", {
        cnic: formData.cnic, // Changed from storeNumber to cnic
        password: formData.password,
      });

      console.log(res);

      if (res?.data?.message === "Login Successful") {
        dispatch(loginSuccess(res?.data?.data));
        localStorage.setItem("adminToken", res?.data?.token);
        toast.success(res?.data?.message + "!", {
          style: {
            padding: "16px",
            backgroundColor: "#0eadad",
            color: "white",
            border: "1px solid #0eadad",
          },
        });

        const isPasswordChanged = res?.data?.data?.isPasswordChanged;
        console.log(isPasswordChanged);

        setTimeout(() => {
          isPasswordChanged === true
            ? navigate("/user/dashboard")
            : navigate("/changepassword");
        }, 4000);
      } else {
        toast.error(res?.data?.message || "Login failed", {
          style: {
            padding: "16px",
            backgroundColor: "red",
            color: "white",
            border: "1px solid red",
          },
        });
      }
    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message));
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed", {
        style: {
          padding: "16px",
          backgroundColor: "red",
          color: "white",
          border: "1px solid red",
        },
      });
    }

    return;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleCodeSubmit}>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="text"
              name="cnic" // Changed from storeNumber to cnic
              value={formData.cnic} // Changed from formData.storeNumber to formData.cnic
              onChange={handleChange}
              placeholder="Enter CNIC" // Changed placeholder text
              required
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Login;
