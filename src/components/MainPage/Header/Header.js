import React, { useEffect } from "react";
import rectangle1 from "../../../assests/rect1.png";
import rectangle2 from "../../../assests/rect2.png";
import rectangle3 from "../../../assests/rect3.png";
import profile from "../../../assests/imageProfile.png";
import "./header.scss";
import { useGlobal } from "../../Context/Context";

export const Header = () => {
  const {
    setIsLoggedIn,
    userName,
    setUserName,
    isLoggedIn,
    setIsRegistered,
    login,
    register,
    logOut,
  } = useGlobal();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setUserName(storedUserName);
      setIsRegistered(true);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <div className="header">
        <div className="rectangles">
          <p>
            <img src={rectangle1} id="rect1" alt="" />
          </p>
          <p>
            <img src={rectangle2} id="rect2" alt="" />
          </p>
          <p>
            <img src={rectangle3} id="rect3" alt="" />
          </p>
        </div>

        <div className="menu">
          <div className="menu-heading">
            <h1>Jobfinder</h1>
          </div>
          {isLoggedIn ? (
            <div className="buttons2">
              <button id="logout" onClick={logOut}>Logout</button>
              <p>Hello! {userName} </p>
              <img src={profile} alt="" />
            </div>
          ) : (
            <div className="buttons">
              <button id="login" onClick={login}>Login</button>
              <button id="register" onClick={register}>Register</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
