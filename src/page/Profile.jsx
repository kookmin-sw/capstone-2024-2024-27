import React, { useState, useEffect } from "react";
import "./Profile.css";
import MyTextField from "../components/MyTextField";
import MyListBox from "../components/MyListBox";
import PopupAlert from "../components/PopupAlert";

const defaultImage = "non-editable-profile.png";
const editableDefalultImage = "editable_profile.png";
const maxRows = 6;

function Profile({
  name,
  setName,
  title,
  setTitle,
  description,
  setDescription,
  githubLink,
  setGithubLink,
  profileImage,
  image,
  likedProjects,
  likedByUsers,
  isReadOnly,
  onImageChange,
  alertOpen,
  alertMessage,
  handleCloseAlert,
}) {
  const formatProjects = (projects) =>
    projects
      .filter((p) => p)
      .map((p) => ({
        primary: `${p.name}: `,
        secondary: `TITLE: ${p.title} GITHUB: ${p.githubLink}`,
      }));

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const getProfileImageSrc = () => {
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    } else if (image !== "") {
      return image;
    } else {
      if (isReadOnly) return defaultImage;
      else return editableDefalultImage;
    }
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <label
          htmlFor="profile-image-upload"
          className="profile__avatar-label"
          style={{ cursor: isReadOnly ? "default" : "pointer" }}
        >
          <img
            className="profile__avatar"
            src={getProfileImageSrc()}
            alt="User Avatar"
          />
        </label>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/png"
          onClick={() => console.log("file upload clicked")}
          onChange={handleImageChange}
          disabled={isReadOnly}
          style={{ display: "none" }}
        />
        <div className="profile__user-info">
          <span className="profile__label">USERNAME: </span>
          <div className="info__field">
            <MyTextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              isReadOnly={isReadOnly}
            />
          </div>
          <div className="profile__link">
            <span className="profile__label">Github Link: </span>{" "}
            <div className="info">
              <MyTextField
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                isReadOnly={isReadOnly}
              />
            </div>
          </div>
        </div>
      </div>
      {/* profile header */}

      <div className="profile__section">
        <h3>Project Title </h3>
        <div className="profile__title">
          <MyTextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxRows={1}
            isReadOnly={isReadOnly}
          />
        </div>
        <h3>Project Description</h3>
        <div className="profile__contents">
          <MyTextField
            value={description}
            maxRows={maxRows}
            onChange={(e) => setDescription(e.target.value)}
            isReadOnly={isReadOnly}
            scrollable={true}
          />
          <h3>Projects you like</h3>
          {/* <MyTextField
            value={formatProjects(likedProjects)}
            maxRows={maxRows}
            scrollable={true}
          /> */}
          <MyListBox items={formatProjects(likedProjects)} />
          <h3>People who like your project.</h3>
          {/* <MyTextField
            value={formatProjects(likedByUsers)}
            maxRows={maxRows}
            scrollable={true}
          /> */}
          <MyListBox items={formatProjects(likedByUsers)} />
        </div>
      </div>
      {/* profile section */}

      <PopupAlert
        alertOpen={alertOpen}
        title={alertMessage}
        handleClose={handleCloseAlert}
      />
    </div>
  );
}

export default Profile;
