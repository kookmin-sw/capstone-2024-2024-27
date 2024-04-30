import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { saveProfile, fetchProfile } from "../utils/profileApi";

function Profile({
  name,
  setName,
  title,
  setTitle,
  description,
  setDescription,
  githubLink,
  setGithubLink,
  projectsYouLike,
  peopleWhoLikeYou,
  isReadOnly,
}) {
  return (
    <div className="profile">
      <div className="profile__header">
        <img
          className="profile__avatar"
          src="IMG_0870.jpeg"
          alt="User Avatar"
        />
        <div className="profile__user-info">
          <span className="profile__label">USERNAME: </span>
          <TextField
            id="profile__textarea"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ readOnly: isReadOnly }}
            variant="outlined"
            className={
              isReadOnly
                ? "profile__textarea-readonly"
                : "profile__textarea-editable"
            }
          />
          <div className="profile__link">
            <span className="profile__label">Github Link: </span>{" "}
            <TextField
              id="profile__textarea"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              InputProps={{ readOnly: isReadOnly }}
              variant="outlined"
              fullWidth
              className={
                isReadOnly
                  ? "profile__textarea-readonly"
                  : "profile__textarea-editable"
              }
            />
          </div>
        </div>
      </div>

      <div className="profile__section">
        <span className="profile__label">Project Title </span>
        <div className="profile__title">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{ readOnly: isReadOnly, style: { height: "" } }}
            variant="outlined"
            fullWidth
            className={
              isReadOnly
                ? "profile__textarea-readonly"
                : "profile__textarea-editable"
            }
          />
        </div>
        <h3>Project you want to do</h3>
        <TextField
          id="profile__textarea"
          multiline
          minRows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
          className={
            isReadOnly
              ? "profile__textarea-readonly profile__textarea-scrollable"
              : "profile__textarea-editable profile__textarea-scrollable"
          }
          InputProps={{
            readOnly: isReadOnly,
          }}
        />
        <h3>Projects you like</h3>
        <TextField
          id="profile__textarea"
          multiline
          minRows={5}
          defaultValue={projectsYouLike}
          variant="outlined"
          fullWidth
          className="profile__textarea-readonly profile__textarea-scrollable"
        />
        <h3>People who like your project.</h3>
        <TextField
          id="profile__textarea"
          multiline
          minRows={5}
          defaultValue={peopleWhoLikeYou}
          variant="outlined"
          fullWidth
          className="profile__textarea-readonly profile__textarea-scrollable"
        />
      </div>
    </div>
  );
}

export default Profile;
