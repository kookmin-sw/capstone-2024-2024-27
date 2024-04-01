import React, { useState } from "react";
import "./Home.css";

import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";

import { useNavigate } from "react-router-dom";

function Home() {
  const [people, setPeople] = useState([
    {
      name: "steve jobs",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1280px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    },
    {
      name: "mark zuckerberg",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/1280px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    },
    {
      name: "ahri",
      url: require("../files/IMG_0870.jpeg"),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
  };

  return (
    <div className="home">
      <h1>Project Title</h1>
      <TinderCards people={people[currentIndex]} />
      <div className="home__textbox">
        <textarea readOnly value="프로젝트 설명" />
      </div>
      <SwipeButtons onButtonClick={handleButtonClick} />
    </div>
  );
}

export default Home;
