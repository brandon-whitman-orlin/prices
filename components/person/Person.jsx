import React from 'react';
import peopleData from '../../backend/people.json';

const Person = ({ personName }) => {
  // Get the details of the person based on the name provided as a prop
  const personDetails = peopleData[personName];

  // If the person is not found, display a message
  if (!personDetails) {
    return <p>Person not found!</p>;
  }

  return (
    <div>
      <h2>{personName}</h2>
      <img src={personDetails.image} alt={personName}/>
      <p>{personDetails.description}</p>
      <a href={personDetails.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a>
    </div>
  );
};

export default Person;

// backgroundImage: `url(${personDetails.image-low})`