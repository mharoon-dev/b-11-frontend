import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import "./AdminDashboard.css";
import { url } from "../../utils/url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: url,
});

const AdminDashboard = ({ isSidebarOpen, toggleSidebar, setIsSidebarOpen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const getData = async () => {
    const res = await api.get("loanReq/get?id=" + user?._id);
    if (res) {
      setLoanReq(res?.data?.data.length);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   if (!user) {
  //     setTimeout(() => {
  //       setLoading(false);
  //       navigate("/login");
  //     }, 1000);
  //   } else {
  //     getData(); 
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }, [user]); // Added user as a dependency

  const [loanReq, setLoanReq] = useState(0);

  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      )}
      <div className="admin-dashboard-container">
        {/* Navbar */}
        <AdminNavbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Sidebar and Main Content */}
        <div className="admin-dashboard-content">
          <AdminSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          <main
            className={`admin-main-content ${isSidebarOpen ? "" : "expanded"}`}
          >
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

export default AdminDashboard;
