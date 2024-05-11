import React, { useState, useEffect } from "react";
import "./App.css";
import {
  fetchProfile,
  saveProfile,
  getProfile,
  likeProject,
  uploadProfileImage,
  getProfileImage,
} from "./utils/api";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login2";
import SignUp from "./page/SignUp2";

const saveProfileData = async (
  name: string,
  title: string,
  description: string,
  githubLink: string,
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
      },
      op
    );
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

  const [id, setId] = useState(0);
  const [initName, setInitName] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [likedProjects, setLikedProjects] = useState([]);
  const [likedByUsers, setLikedByUsers] = useState([]);

  const [project, setProject] = useState({
    name: "",
    title: "",
    description: "",
    githubLink: "",
    // image: "",
  });

  const [index, setIndex] = useState(1);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    // console.log("Profile fetched successfully: ", project);
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
    console.log("profile clicked");
  };

  const isFieldsEmpty = () => {
    if (name == "" || title == "" || description == "" || githubLink == "") {
      return true;
    }
    return false;
  };

  const isPost = () => {
    if (initName == "") {
      return true;
    }
    return false;
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
    console.log("done__icon clicked");
    // const op = isPost() ? "post" : "put";
    const op = "put";
    if (isFieldsEmpty()) {
      alert("Please fill all the fields");
    } else {
      setIsReadOnly(true);
      const response = await saveProfileData(
        name,
        title,
        description,
        githubLink,
        op
      );
      if (response) {
        setName(response.name);
        setTitle(response.title);
        setDescription(response.description);
        setGithubLink(response.githubLink);
      }
      if (profileImage) {
        try {
          const imageResponse = await uploadProfileImage(profileImage);
          setProfileImage(imageResponse.imageUrl);
          console.log("Image uploaded successfully:", imageResponse);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      console.log("99 handleSave: ", response);
    }
    // setName(response.name);
  };

  const handleLogin = () => {
    setIsLoggedin(true);
    setCurrentPage("home");
    fetchProfileData();
    console.log("login success");
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
    setProject({
      name: "",
      title: "",
      description: "",
      githubLink: "",
      // image: "",
    });
    setProfileImage("");
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
      const profileImage = await getProfileImage();
      setId(profileData.profile.id);
      console.log("profileData.profile.id : ", profileData.profile.id);
      console.log("200 profileImage: ", profileImage);
      setName(profileData.profile.name);
      setInitName(profileData.profile.name);
      setTitle(profileData.profile.title);
      setDescription(profileData.profile.description);
      setGithubLink(profileData.profile.githubLink);
      setProfileImage(profileImage.src || "");
      console.log("195 current ID : ", id);

      setLikedByUsers(profileData.likedByUsers);
      setLikedProjects(profileData.likedProjects);

      console.log("138 fetchProfileData: ", profileData);
    } catch (error) {
      console.error("202 Error fetching profile:", error);
    }
  };

  const fetchOtherProfile = async () => {
    let validProfileFound = false;
    let tries = 0; // 무한 루프 방지를 위한 시도 횟수 카운터
    let newIndex = index;

    while (!validProfileFound && tries < 10) {
      console.log("210 Fetching other profile by index:", newIndex);
      // 유효한 프로필을 찾거나 시도 횟수가 10회를 넘지 않을 때까지 반복
      if (newIndex === id) newIndex++;
      try {
        const projectData = await getProfile(newIndex);
        // const projectImage = await getImage(newIndex);
        if (projectData && projectData.name) {
          setProject({
            name: projectData.name,
            githubLink: projectData.githubLink,
            title: projectData.title,
            description: projectData.description,
            // image: projectImage,
          });
          validProfileFound = true;
          console.log("223 Valid profile fetched:", projectData);
        } else {
          newIndex++; // 유효하지 않은 프로필일 경우, 인덱스 증가
          console.log("226 Empty profile found, skipping to next...");
        }
      } catch (error) {
        console.error("229 Error fetching profile by index:", error);
        newIndex++; // 에러 발생 시 다음 인덱스로 이동
        console.log("231 Error on profile fetch, skipping to next index..."); // 네트워크 오류 등 예외 발생 시 반복 중단
      }
      tries++; // 시도 횟수 증가
    }

    if (!validProfileFound) {
      setProject({
        name: "THERE IS NO MORE PROFILE",
        githubLink: "",
        title: "",
        description: "",
        // image: "",
      });
    }

    setIndex(newIndex + 1); // 마지막으로 확인한 인덱스에서 다음 인덱스로 업데이트
  };

  const handleLikeButton = async () => {
    console.log("handleLikeButton index: ", index - 1);

    const response = await likeProject(index - 1);
    console.log("handleLikeButton Clicked: ", response);
    fetchOtherProfile();
  };

  const handleDislikeButton = async () => {
    console.log("handleDislikeButton: ", index);
    fetchOtherProfile();
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfileImage(file);
    console.log("Image temporarily saved: ", file);
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
        // onLikeButton={fetchOtherProfile}
      />
      <div className="App-body">
        {currentPage === "home" && isLoggedin ? (
          <Home
            project={project}
            profineImage={profileImage}
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
            likedProjects={likedProjects}
            likedByUsers={likedByUsers}
            isReadOnly={isReadOnly}
            onImageUpload={handleImageUpload}
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
