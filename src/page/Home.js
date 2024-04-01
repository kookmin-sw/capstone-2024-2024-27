import React from "react";
import "./Home.css";

import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";

import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <TinderCards />
      {/* <h1>??프로젝트 설명??</h1> */}
    </div>
  );
}

export default Home;
