import React from "react";
import "./PromiseCard.css";

import peopleData from '../../backend/people.json'; // Import the data

const PromiseCard = ({ quote, grammar="said", speaker, quoteSource, articleLink, accuracy }) => {
  // Get the speaker details from peopleData based on the speaker name
  const speakerDetails = peopleData[speaker];

  // If speaker details are not found, return an error or a fallback UI
  if (!speakerDetails) {
    return <p>Speaker not found</p>;
  }

  // Determine the class to be applied based on accuracy
  let accuracyClass = "";
  if (accuracy === 100) {
    accuracyClass = "accurate";
  } else if (accuracy === 0) {
    accuracyClass = "inaccurate";
  } else {
    accuracyClass = "inconclusive";
  }

  return (
    <a className="promise-card" href={articleLink} target="_blank" rel="noopener noreferrer">
      <div className="quote-and-speaker">
        <div className="speaker-image-wrapper" style={{backgroundImage: `url(${speakerDetails.imageLow})`}}>
            <img className="speaker-image" src={speakerDetails.imageSmall} alt={`Picture of ${speaker}`} />
        </div>
        <div className="quote-and-quote-source">
            <h3 className="speaker">{speaker} <span className="said">{grammar}:</span></h3>
            <q className="speaker-quote">"{quote}"<cite className="quote-source">{quoteSource}</cite></q>
        </div>
      </div>
      <div className={`quote-accuracy ${accuracyClass}`}>
        {accuracy === 100 ? (
          <span className="accuracy"><span className="accuracy-emoji">😀</span><span className="accuracy-text">Accurate</span></span>
        ) : accuracy === 0 ? (
          <span className="accuracy"><span className="accuracy-emoji">😠</span><span className="accuracy-text">Inaccurate</span></span>
        ) : (
          <span className="accuracy"><span className="accuracy-emoji">😐</span><span className="accuracy-text">Inconclusive</span></span>
        )}
      </div>
    </a>
  );
};

export default PromiseCard;
