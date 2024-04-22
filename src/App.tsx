import React, { useState, useEffect } from "react";
import "./App.css";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleProfileClick = () => {
    setCurrentPage("profile");
    console.log("profile clicked");
  };

  const handleHomeClick = () => {
    setCurrentPage("home");
    console.log("home clicked");
  };

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
    console.log("edit clicked");
  };

  const handleLogin = () => {
    setIsLoggedin(true);
    setCurrentPage("home");
    console.log("login success");
  };

  const handleLogout = () => {
    setIsLoggedin(false);
    setCurrentPage("login");
    console.log("logout success");
  };

  const handleSignUp = () => {
    setCurrentPage("signup");
    console.log("signup clicked");
  };

  const handleSignUpSuccess = () => {
    setCurrentPage("login");
    console.log("signup success");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedin(true);
    }
  }, []);

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        onProfileClick={handleProfileClick}
        onHomeClick={handleHomeClick}
        onEditClick={handleEditClick}
        isReadOnly={isReadOnly}
        isLoggedin={isLoggedin}
        onLogout={handleLogout}
      />
      {currentPage === "home" && isLoggedin ? (
        <Home />
      ) : currentPage === "profile" && isLoggedin ? (
        <Profile onEditClick={handleEditClick} isReadOnly={isReadOnly} />
      ) : currentPage === "login" ? (
        <Login onLoginSuccess={handleLogin} onSignUpClick={handleSignUp} />
      ) : (
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      )}
    </div>
  );
};

export default App;
