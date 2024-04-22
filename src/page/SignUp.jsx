import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import Header from "../components/Header";

const SignUp = ({ onSignUpSuccess }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://52.79.82.218:8000/user/signup",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        alert("User successfully created! Please log in.");
        onSignUpSuccess();
      }
    } catch (error) {
      console.error("Sign up error:", error);
      // 회원가입 실패 처리
      //console.log(error.respose.data.message);
      alert(`Error code: "${error.response.data.message}", Sign up failed.`);
    }
  };

  return (
    <div className="signup">
      <Header currentPage="signup" />
      <h2>회원가입</h2>
      <form className="signup__form" onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일 확인"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
