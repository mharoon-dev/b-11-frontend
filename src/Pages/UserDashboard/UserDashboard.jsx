import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

const UserDashboard = ( { isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen}) => {
  return (
    <>
      <AdminNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};

export default UserDashboard;
