import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminStyles from "./admin.module.css";
import { IoLogOut } from "react-icons/io5";
import { AuthData } from "../../Utilities/Protected";

const AdminDashboard = () => {
  const { loggedUser } = AuthData();
  const [msg, setmsg] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setmsg(true);
    // navigate("/login");
  };

  return (
    <div className={adminStyles.main}>
      <h2>Admin Dashboard</h2>

      <div className={adminStyles.logout}>
        <button onClick={handleLogout}>
          <IoLogOut color="white" size={20} /> Logout
        </button>
      </div>

      <div className={adminStyles.slides}>
        <div className={adminStyles.slide}>
          <Link to={"/subscription"}>subscription</Link>
        </div>
        <div className={adminStyles.slide}>
          <Link to={"/reports"}>reports</Link>
        </div>
        <div className={adminStyles.slide}>
          <Link to="/rush-hours">Rush Hours</Link>
        </div>
        <div className={adminStyles.slide}>
          <Link to="/vacations">vacations</Link>
        </div>
        <div className={adminStyles.slide}>
          <Link to="/zones-edit">update zones</Link>
        </div>
        <div className={adminStyles.slide}>
          <Link to="/update-categories">update categories</Link>
        </div>
      </div>

      {msg ? (
        <>
          <div className={adminStyles.overlay}>
            <div className={adminStyles.messageBox}>
              <h4>You are now logout</h4>
              <p>To continue using the system, please login again</p>
              <Link to={"/login"} className={adminStyles.loginBtn}>
                Login
              </Link>
            </div>
          </div>
        </>
      ) : undefined}
    </div>
  );
};

export default AdminDashboard;
