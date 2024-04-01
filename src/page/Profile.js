import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

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
        <h3>Projects you want to do</h3>
        <textarea className="profile__textarea" readOnly />
        <h3>People you like</h3>
        <textarea className="profile__textarea" readOnly />
        <h3>People who like you</h3>
        <textarea className="profile__textarea" readOnly />
      </div>
    </div>
  );
}

export default Profile;
