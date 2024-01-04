import React, {useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const register = () => {
    navigate("/register");
  };
  const login = () => {
    navigate("/login");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setIsRegistered(false);
  };
  const addJob = () => {
    ("/jobPost");
  };

  const cancel = () =>{
    navigate('/')
  }

  useEffect(()=>{
    const storedUserName = localStorage.getItem("userName")

    if(storedUserName){
        setUserName(storedUserName)
        setIsRegistered(true)
        setIsLoggedIn(true)
    }
  },[])

 

  return(
    <AppContext.Provider
    value={ {
        isRegistered,
        setIsRegistered,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        register,
        login,
        logOut,
        addJob,
        cancel,

    }}
    >
        {children}
    </AppContext.Provider>
  )
};

const useGlobal = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobal}