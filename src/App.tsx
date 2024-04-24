import React, { useState, useEffect } from "react";
import "./App.css";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login2";
import SignUp from "./page/SignUp2";

const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleProfileClick = () => {
    setCurrentPage("profile");
    setIsReadOnly(true);
    console.log("profile clicked");
  };

  const handleHomeClick = () => {
    setCurrentPage("home");
    setIsReadOnly(true);
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

  const handleSignInClick = () => {
    setCurrentPage("login");
    console.log("sign in clicked");
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
      <div className="App-body">
        {currentPage === "home" && isLoggedin ? (
          <Home />
        ) : currentPage === "profile" && isLoggedin ? (
          <Profile onEditClick={handleEditClick} isReadOnly={isReadOnly} />
        ) : currentPage === "login" ? (
          <Login onLoginSuccess={handleLogin} onSignUpClick={handleSignUp} />
        ) : (
          <SignUp
            onSignUpSuccess={handleSignUpSuccess}
            onSignInClick={handleSignInClick}
          />
        )}
      </div>
    </div>
  );
};

export default App;
