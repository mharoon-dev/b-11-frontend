import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import "./Signup.css";
import { url } from "../../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/Slices/userSlice.jsx";

const api = axios.create({
  baseURL: url,
});

const Signup = () => {
    const {user} = useSelector(state => state.user)
    useEffect(() => {
      if(user){
        navigate("/");
      }
    }, [user]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const res = await api.post("auth/signup", formData);

      console.log(res);

      if (res?.data?.status) {
        dispatch(loginSuccess(res?.data?.data));
        localStorage.setItem("adminToken", res?.data?.token);
        toast.success(res?.data?.message, {
          style: {
            padding: "16px",
            backgroundColor: "#0eadad",
            color: "white",
            border: "1px solid #0eadad",
          },
        });

        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Signup failed", {
        style: {
          padding: "16px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "1px solid #ff4d4d",
        },
      });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter Username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Signup;
