import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchProfile, saveProfile } from "./utils/profileApi";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login2";
import SignUp from "./page/SignUp2";

const saveProfileData = async (
  name: string,
  title: string,
  description: string,
  githubLink: string
) => {
  try {
    let response;
    if (name == "" || title == "" || description == "" || githubLink == "") {
      response = await saveProfile(
        {
          name: name,
          title: title,
          description: description,
          githubLink: githubLink,
        },
        "post"
      );
    } else {
      response = await saveProfile(
        {
          name: name,
          title: title,
          description: description,
          githubLink: githubLink,
        },
        "put"
      );
    }
    // console.log("40: ", response);
    console.log("Profile saved successfully");
    return response;
  } catch (error) {
    console.error("Error saving profile:", error);
    return;
  }
};

const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isReadOnly, setIsReadOnly] = useState(true);

  // const [profileData, setProfileData] = useState({
  //   name: "",
  //   title: "",
  //   description: "",
  //   githubLink: "",
  // });

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectsYouLike, setProjectsYouLike] = useState("");
  const [peopleWhoLikeYou, setPeopleWhoLikeYou] = useState("");

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

  const handleSaveClick = async () => {
    setIsReadOnly(true);
    const response = await saveProfileData(
      name,
      title,
      description,
      githubLink
    );
    if (response) {
      setName(response.name);
      setTitle(response.title);
      setDescription(response.description);
      setGithubLink(response.githubLink);
    }
    console.log("99: ", response);
    // setName(response.name);
    console.log("done__icon clicked");
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

  const fetchProfileData = async () => {
    try {
      const profileData = await fetchProfile();
      setName(profileData.profile.name);
      setTitle(profileData.profile.title);
      setDescription(profileData.profile.description);
      setGithubLink(profileData.profile.githubLink);
      console.log("138 fetchProfileData: ", profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin && currentPage === "profile") {
      fetchProfileData();
    }
  }, [currentPage]);

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        onProfileClick={handleProfileClick}
        onHomeClick={handleHomeClick}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
        isReadOnly={isReadOnly}
        isLoggedin={isLoggedin}
        onLogout={handleLogout}
      />
      <div className="App-body">
        {currentPage === "home" && isLoggedin ? (
          <Home />
        ) : currentPage === "profile" && isLoggedin ? (
          <Profile
            name={name}
            setName={setName}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            githubLink={githubLink}
            setGithubLink={setGithubLink}
            projectsYouLike={projectsYouLike}
            peopleWhoLikeYou={peopleWhoLikeYou}
            isReadOnly={isReadOnly}
            // onEditClick={handleEditClick}
            // onSaveClick={handleSaveClick}
          />
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
