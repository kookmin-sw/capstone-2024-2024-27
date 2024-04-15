import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

function Profile() {
  const [user, setUser] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);

  var projects = "1. Project A\n2. project B\n3. Project C";
  var peopleYouLike = "1. User A\n2. User B\n3. User C";
  var peopleWhoLikeYou = "1. User A\n2. User B\n3. User C";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log("current token", process.env.REACT_APP_GITHUB_ACCESS_TOKEN);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <img
          className="profile__avatar"
          src={user.avatar_url}
          alt="User Avatar"
        />
        <div className="profile__user-info">
          <span className="profile__label">Username: </span>
          {user.name}
          <div className="profile__link">
            <span className="profile__label">Github Link: </span>{" "}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.html_url}
            </a>
          </div>
        </div>
      </div>

      <div className="profile__section">
        {/* <h3>Projects you want to do</h3>
        <textarea
          className="profile__textarea"
          readOnly={isReadOnly}
          value={projects}
        />
        <h3>People you like</h3>
        <textarea
          className="profile__textarea"
          readOnly={isReadOnly}
          value={peopleYouLike}
        />
        <h3>People who like you</h3>
        <textarea
          className="profile__textarea"
          readOnly={isReadOnly}
          value={peopleWhoLikeYou}
        /> */}
        <h3>Projects you want to do</h3>
        <TextField
          id="profile__textarea"
          multiline
          rows={5}
          defaultValue={peopleWhoLikeYou}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: isReadOnly,
          }}
        />
        <h3>People you like</h3>
        <TextField
          id="profile__textarea"
          multiline
          rows={5}
          defaultValue={peopleWhoLikeYou}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: isReadOnly,
          }}
        />
        <h3>People who like you</h3>
        <TextField
          id="profile__textarea"
          multiline
          rows={5}
          defaultValue={peopleWhoLikeYou}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: isReadOnly,
          }}
        />
      </div>
    </div>
  );
}

export default Profile;
