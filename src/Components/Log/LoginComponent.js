import React, { useEffect, useState } from "react";
import formStyle from "./login.module.css";
import { AuthData } from "../../Utilities/Protected";
const LoginComponent = () => {
  const [size, setSize] = useState(false);
  const [err, setErr] = useState(false);
  const [user, setuser] = useState({
    username: ``,
    password: ``,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      let size = window.innerWidth;
      size <= 650 ? setSize(true) : setSize(false);
    });
  });
  const { login, logError } = AuthData();
  const handlelogin = (e) => {
    e.preventDefault();
    login(user);
    if (user.password === "" || user.username === "") {
      setErr(true);
    }
  };

  return (
    <div className={size ? formStyle.minmain : formStyle.main}>
      <form onSubmit={(e) => handlelogin(e)}>
        <h4>Login</h4>

        {err ? (
          <span className={formStyle.msg}>Fildes are required</span>
        ) : undefined}
        {logError === "Request failed with status code 401" && (
          <span className={formStyle.msg}>User Not Found</span>
        )}

        <input
          type="text"
          placeholder="enter your username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
