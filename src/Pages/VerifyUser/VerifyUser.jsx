import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { url } from "../../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/Slices/userSlice.jsx";
import "./VerifyUser.css";

const api = axios.create({
  baseURL: url,
});

const VerifyUser = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

    

  const handleChange = (element, index) => {
    const value = element.value;
    
    // Only allow numbers
    // if (!/^\d*$/.test(value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    // Focus next input
    if (value !== "" && index < 5) {
      element.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      
      // Focus previous input if exists
      if (index > 0) {
        e.target.previousElementSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    try {
      dispatch(loginStart());
      const res = await api.post("auth/verifyEmail", { otp: otpString }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (res?.data?.status) {
        dispatch(loginSuccess(res?.data?.data));
        toast.success(res?.data?.message, {
          style: {
            padding: "16px",
            backgroundColor: "#0eadad",
            color: "white",
            border: "1px solid #0eadad",
          },
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Verification failed", {
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

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div
            className="input-group"
            style={{
              width: "100%",
              marginBottom: "1rem !important",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    marginRight: "5px",
                    fontSize: "18px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  maxLength={1}
                />
              );
            })}
          </div>
          <button type="submit" className="otp-btn">
            Verify
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default VerifyUser;
