import React, { useState } from "react";
import "./Home.css";

import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";
import MyTextField from "../components/MyTextField";

function Home({ project, profineImage, handleLike, handleDislike }) {
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
      url: require("../assets/IMG_0870.jpeg"),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // const handleButtonClick = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
  // };

  return (
    <div className="home">
      {/* <Title defalutValue={title} /> */}
      {project.title ? (
        <>
          <h2>{project.title}</h2>
          <h1>{project.name}</h1>
        </>
      ) : (
        <h1>(Please edit your profile.)</h1>
      )}

      {/* <MyTextField value={title} /> */}
      <TinderCards people={people[currentIndex]} />
      <div className="home__description">
        <MyTextField
          value={project.description}
          backgroundColor="white"
          minRows={5}
          maxRows={10}
        />
      </div>
      <SwipeButtons
        className="home__buttons"
        onLikeButtonClick={handleLike}
        onDislikeButtonClick={handleDislike}
      />
    </div>
  );
}

export default Home;
