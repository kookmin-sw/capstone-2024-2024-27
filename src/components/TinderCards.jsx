import React from "react";

import "./TinderCards.css";

function TinderCards({ image }) {
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        <img className="tinderCards__image" src={image} alt="projectImage" />
      </div>
    </div>
  );
}

export default TinderCards;
