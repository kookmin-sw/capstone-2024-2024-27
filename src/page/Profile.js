import React from "react";
import Header from "../components/Header";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <Header backButton="/" />
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
