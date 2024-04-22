import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Header from "../components/Header";

const Login = ({ onLoginSuccess, onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://52.79.82.218:8000/user/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      onLoginSuccess();
    } catch (error) {
      console.error("Login error:", error);
      // 로그인 실패 처리
      alert(`Error code: ${error.code}, Login failed.`);
    }
  };

  return (
    <div className="login">
      <Header currentPage="login" />
      <h2>Login</h2>
      <form className="login__form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="login__signup">
        <p>If you are not signed in, please Signup.</p>
        <button onClick={onSignUpClick}>SIGN UP</button>
      </div>
    </div>
  );
};

export default Login;
