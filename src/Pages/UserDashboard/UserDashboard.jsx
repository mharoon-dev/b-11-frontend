import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar/UserNavbar";
import AdminSidebar from "../../Components/AdminSidebar/UserSidebar";
import "./UserDashboard.css";
import { url } from "../../utils/url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: url,
})

const UserDashboard = ( { isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen}) => {
const navigate = useNavigate();
      const {user} = useSelector((state) => state.user);
      useEffect(() => {
        if (!user) {
          navigate("/login");
      } 
      } 
      , []);
      const [loanReq, setLoanReq] = useState(0);
      useEffect(() => {
        const getData = async () => {
          
          const res = await api.get("loanReq/get?id="+user?._id);
          if (res) {
            console.log(res);
            setLoanReq(res?.data?.data.length);
          }
        }
        getData();
      })
  return (
    <>
      <div className="admin-dashboard-container">
      {/* Navbar */}
      <AdminNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar and Main Content */}
      <div className="admin-dashboard-content">
        <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className={`admin-main-content ${isSidebarOpen ? "" : "expanded"}`}>
        <div className="admin-dashboard-stats">
      <div className="admin-stat-card">
        <h3>Total Loan Requests</h3>
        <p>{loanReq}</p>
      </div>
    </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
