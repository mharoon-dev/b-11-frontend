import React, { useState } from "react";
import "./ChangePassword.css";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { url } from "../../utils/url";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: url,
})
const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { user } = useSelector((state) => state.user);
const navigate = useNavigate();
  const handleChangePassword = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to handle password change goes here
    console.log("New Password:", newPassword);

    const res = await api.post("auth/changePassword/" + user._id, { password: newPassword });
    console.log(res);

    if (res?.data?.message === "Password change Successfully") {
      console.log(res);
      setLoading(false);
      toast.success("Password changed successfully", {
        style: {
          padding: "16px",
          backgroundColor: "#0eadad",
          color: "white",
          border: "1px solid #0eadad",
        },
      });

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    } else {
      setLoading(false);
      toast.error("Failed to change password", {
        style: {
          padding: "16px",
          backgroundColor: "red", // Changed background color to red
          color: "white",
          border: "1px solid red",
        },
      });
    }
  };

  return (
    <>
    {loading && (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      )}
    <div className="change-password-container">
      <div className="change-password-box">
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="input-group">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <button type="submit" className="change-password-btn">
            Change Password
          </button>
        </form>
      </div>
      <Toaster  position="top-right"/>
    </div>
    </>
  );
};

export default ChangePassword;
