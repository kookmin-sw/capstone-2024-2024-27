import React, { useState, useEffect } from "react";

import "./TinderCards.css";
import SwipeButtons from "./SwipeButtons";

function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: "steve jobs",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1280px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    },
    {
      name: "mark zuckerberg",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/1280px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
  };
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        <h1>Tinder Cards</h1>
        <img
          className="tinderCards__image"
          src={people[currentIndex].url}
          alt={people[currentIndex].name}
        />
      </div>
      <h3>{people[currentIndex.name]}</h3>
      <SwipeButtons onButtonClick={handleButtonClick} />
    </div>
  );
}

export default TinderCards;

{
  /* <div className="tinderCards__cardContainer">
            <h1>Tinder Cards</h1>
            {people.map(person => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={['up', 'down']}
                >                    
                    <div 
                style={{ backgroundImage: `url(${person.url})` }}
                    className="card"
                    >
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div> */
}
