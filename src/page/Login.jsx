import React from "react";
import "./Login.css";

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const redirectUri = "http://localhost:3000";
const scope = "user";
const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

function Login({ onLogin }) {
  const handleGitHubLogin = () => {
    //console.log(clientId);
    window.location.href = authUrl;
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <a href={authUrl}>Login with GitHub</a>
      {/* <button onClick={handleGitHubLogin}>Login with GitHub</button> */}
    </div>
  );
}

export default Login;
