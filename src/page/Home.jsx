import React, { useState } from "react";
import "./Home.css";

import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";
import MyTextField from "../components/MyTextField";
import PopupAlert from "../components/PopupAlert";

const empty_image = "empty_image.png";

function Home({ project, handleLike, handleDislike }) {
  return (
    <div className="home">
      {/* <Title defalutValue={title} /> */}
      {project.title ? (
        <>
          <h2 className="home__title">{project.title}</h2>
          <h1 className="home__name">{project.name}</h1>
        </>
      ) : (
        <h1>There is no more profile.</h1>
      )}
      <TinderCards image={project.image ? project.image : empty_image} />
      {/* <MyTextField value={title} /> */}
      {/* <TinderCards people={people[currentIndex]} /> */}
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
