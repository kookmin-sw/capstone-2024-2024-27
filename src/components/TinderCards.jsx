import React, { useState, useEffect } from "react";

import "./TinderCards.css";
// import SwipeButtons from "./SwipeButtons";

function TinderCards({ people }) {
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {/* <h1>Tinder Cards</h1> */}
        <img
          className="tinderCards__image"
          src={people.url}
          alt={people.name}
        />
      </div>
    </div>
  );
}

export default TinderCards;
