import React, { useState, useEffect } from "react";

import "./TinderCards.css";
// import SwipeButtons from "./SwipeButtons";

function TinderCards({ people }) {
  // const [people, setPeople] = useState([
  //   {
  //     name: "steve jobs",
  //     url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1280px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
  //   },
  //   {
  //     name: "mark zuckerberg",
  //     url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/1280px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
  //   },
  //   {
  //     name: "ahri",
  //     url: require("../files/IMG_0870.jpeg"),
  //   },
  // ]);

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
