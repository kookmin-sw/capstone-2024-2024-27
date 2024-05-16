import React, { useState, useEffect } from "react";
import "./App.css";
import {
  fetchProfile,
  saveProfile,
  getProfile,
  likeProject,
  uploadProfileImage,
} from "./utils/api";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

import CircularProgress from "@material-ui/core/CircularProgress";

const saveProfileData = async (
  name: string,
  title: string,
  description: string,
  githubLink: string,
  image: string,
  op: string
) => {
  try {
    let response;
    response = await saveProfile(
      {
        name: name,
        title: title,
        description: description,
        githubLink: githubLink,
        image: image,
      },
      op
    );
    return response;
  } catch (error) {
    console.error("Error saving profile:", error);
    return;
  }
};

const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [loading, setLoading] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(true);

  const [id, setId] = useState(0);
  const [initName, setInitName] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState<File | string>("");

  const [likedProjects, setLikedProjects] = useState([]);
  const [likedByUsers, setLikedByUsers] = useState([]);

  const [project, setProject] = useState({
    name: "",
    title: "",
    description: "",
    githubLink: "",
    image: "",
  });

  const [index, setIndex] = useState(1);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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

  useEffect(() => {
    if (isLoggedin && currentPage === "home" && id !== 0) {
      fetchOtherProfile();
    }
  }, [id]);

  const handleProfileClick = () => {
    setCurrentPage("profile");
    setIsReadOnly(true);
  };

  const isFieldsEmpty = () => {
    if (name == "" || title == "" || description == "" || githubLink == "") {
      return true;
    }
    return false;
  };

  const handleHomeClick = () => {
    setCurrentPage("home");
    setIsReadOnly(true);
  };

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleSaveClick = async () => {
    if (isFieldsEmpty()) {
      setAlertMessage("Please fill all the fields");
      setAlertOpen(true);
      return;
    }

    setLoading(true);

    if (typeof profileImage === "object") {
      try {
        const imageResponse = await uploadProfileImage(profileImage);
        setProfileImage(
          `${imageResponse.imageUrl}?timestamp=${new Date().getTime()}`
        );
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        return;
      }
    }

    try {
      const op = "put";

      const response = await saveProfileData(
        name,
        title,
        description,
        githubLink,
        image,
        op
      );
      if (response) {
        setIsReadOnly(true);
        setName(response.name);
        setTitle(response.title);
        setDescription(response.description);
        setGithubLink(response.githubLink);
        setImage(response.image);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setSignUpSuccess(false);
    setIsLoggedin(true);
    setCurrentPage("home");
    fetchProfileData();
  };

  const handleLogout = () => {
    setIsLoggedin(false);
    setCurrentPage("login");
    localStorage.removeItem("accessToken");
    setId(0);
    setInitName("");
    setName("");
    setTitle("");
    setDescription("");
    setGithubLink("");
    setLikedProjects([]);
    setLikedByUsers([]);
    setIndex(1);
    setProfileImage("");
    setImage("");
    setProject({
      name: "",
      title: "",
      description: "",
      githubLink: "",
      image: "",
    });
    setProfileImage("");
  };

  const handleSignUp = () => {
    setCurrentPage("signup");
  };

  const handleSignUpSuccess = () => {
    setCurrentPage("login");
    setSignUpSuccess(true);
  };

  const handleSignInClick = () => {
    setCurrentPage("login");
  };

  const fetchProfileData = async () => {
    try {
      const profileData = await fetchProfile();
      setId(profileData.profile.id);
      setName(profileData.profile.name);
      setInitName(profileData.profile.name);
      setTitle(profileData.profile.title);
      setDescription(profileData.profile.description);
      setGithubLink(profileData.profile.githubLink);
      setImage(profileData.profile.image);

      setLikedByUsers(profileData.likedByUsers);
      setLikedProjects(profileData.likedProjects);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchOtherProfile = async () => {
    let validProfileFound = false;
    let tries = 0;
    let newIndex = index;

    while (!validProfileFound && tries < 10) {
      if (newIndex === id) newIndex++;
      try {
        const projectData = await getProfile(newIndex);
        if (projectData && projectData.name) {
          setProject({
            name: projectData.name,
            githubLink: projectData.githubLink,
            title: projectData.title,
            description: projectData.description,
            image: projectData.image,
          });
          validProfileFound = true;
        } else {
          newIndex++;
        }
      } catch (error) {
        console.error("Error fetching profile by index:", error);
        newIndex++;
      }
      tries++;
    }

    if (!validProfileFound) {
      setProject({
        name: "THERE IS NO MORE PROFILE",
        githubLink: "",
        title: "",
        description: "",
        image: "",
      });
    }

    setIndex(newIndex + 1);
  };

  const handleLikeButton = async () => {
    const response = await likeProject(index - 1);
    fetchOtherProfile();
  };

  const handleDislikeButton = async () => {
    fetchOtherProfile();
  };

  const onImageChange = (file: File) => {
    setProfileImage(file);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

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
          <Home
            project={project}
            handleLike={handleLikeButton}
            handleDislike={handleDislikeButton}
          />
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
            profileImage={profileImage}
            image={image}
            likedProjects={likedProjects}
            likedByUsers={likedByUsers}
            isReadOnly={isReadOnly}
            onImageChange={onImageChange}
            alertOpen={alertOpen}
            alertMessage={alertMessage}
            handleCloseAlert={handleCloseAlert}
          />
        ) : currentPage === "login" ? (
          <Login
            onLoginSuccess={handleLogin}
            onSignUpClick={handleSignUp}
            signUpSuccess={signUpSuccess}
          />
        ) : (
          <SignUp
            onSignUpSuccess={handleSignUpSuccess}
            onSignInClick={handleSignInClick}
          />
        )}
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
