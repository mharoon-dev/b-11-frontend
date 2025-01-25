import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Logic to handle password change goes here
    console.log("New Password:", newPassword);
  };

  return (
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
    </div>
  );
};

export default ChangePassword;
