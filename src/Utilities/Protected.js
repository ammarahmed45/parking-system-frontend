import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderRoutes from "./RenderRoutes";
import LoginComponent from "../Components/Log/LoginComponent";

const AuthProvider = createContext();
export const AuthData = () => useContext(AuthProvider);
const Protected = () => {
  const navigate = useNavigate();
  const [logError, SetLoggError] = useState("");
  const [loggedUser, setLoggedUser] = useState({
    isAuth: false,
    token: ``,
  });

  // login
  const login = async (user) => {
    SetLoggError("");
    await axios
      .post(`http://localhost:3000/api/v1/auth/login`, user)
      .then((res) => {
        console.log(res);
        setLoggedUser({
          isAuth: true,
          token: res.data.token,
          user: res.data.user,
        });
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        // console.log("this is error");
        console.log(err.message);
        SetLoggError(err.message);
        // console.log(logError);
      });
  };
  ////////////////////////////////////////////////////
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedUser({
      isAuth: false,
      token: null,
      user: null,
    });
    navigate("/login");
  };

  ///////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setLoggedUser({
        isAuth: true,
        token,
        user: JSON.parse(user),
      });
    }
  }, []);
  return (
    <>
      <AuthProvider.Provider value={{ login, loggedUser, logout, logError }}>
        {loggedUser.isAuth ? <RenderRoutes /> : <LoginComponent />}
      </AuthProvider.Provider>
    </>
  );
};

export default Protected;
