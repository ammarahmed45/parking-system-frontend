import React, { useState } from "react";
import Nav from "../Navbar/Nav";
import { Link } from "react-router-dom";
import homeStyles from "./home.module.css";
import { IoLogOut } from "react-icons/io5";

const Home = () => {
  const [msg, setmsg] = useState(false);
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setmsg(true);
    // navigate("/login");
  };
  return (
    <>
      <div className={homeStyles.main}>
        <h3>Hello There</h3>
        <div className={homeStyles.logout}>
          <button onClick={handleLogout}>
            <IoLogOut color="white" size={20} /> Logout
          </button>
        </div>

        <p>What service do you want</p>
        <div className={homeStyles.slides}>
          <div className={homeStyles.slide}>
            <Link to={"/gates"}>Gates</Link>
          </div>
          <div className={homeStyles.slide}>
            <Link to={"/zones"}>zones</Link>
          </div>
          <div className={homeStyles.slide}>
            <Link to={"/tickets"}>tickets</Link>
          </div>
          <div className={homeStyles.slide}>
            <Link to={"/checkpoint"}>checkpoint</Link>
          </div>
          {/* <div className={homeStyles.slide}>
            <Link to={"/checkin"}>checkin</Link>
          </div> */}
        </div>
        {msg ? (
          <>
            <div className={homeStyles.overlay}>
              <div className={homeStyles.messageBox}>
                <h4>You are now logout</h4>
                <p>To continue using the system, please login again</p>
                <Link to={"/login"} className={homeStyles.loginBtn}>
                  Login
                </Link>
              </div>
            </div>
          </>
        ) : undefined}
      </div>
    </>
  );
};

export default Home;
