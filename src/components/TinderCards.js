import React, { useState, useEffect } from "react";
//import TinderCard from 'react-tinder-card';
import "./TinderCards.css";

// function TinderCards() {
//   const [people, setPeople] = useState([]);
//   // const people = [];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const q = query(collection(database, 'people'));
//       const querySnapshot = await getDocs(q);

//       const peopleData = querySnapshot.docs.map(doc => doc.data());
//       setPeople(peopleData);
//     };
//     fetchUsers();
//   }, []);

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

  //   useEffect(() => {}, []);

  return (
    <div className="tinderCards__cardContainer">
      <h1>Cards</h1>
      {/* <img src={`${people.url}`} /> */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1280px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
        className="card"
      />
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
