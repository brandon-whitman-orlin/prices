import React, { useMemo, useState, useEffect } from "react";
import "./InfoCard.css";

import { ReactComponent as UpGraph } from "../../assets/icons/upgraph.svg";
import { ReactComponent as DownGraph } from "../../assets/icons/downgraph.svg";

const InfoCard = ({ info }) => {
  const {
    desire,
    inaugurationPercentageChange = 0,
    title,
    currentMeasure = 0,
    sign = "",
    units = "",
    dailyChange = 0,
    frequency = "period",
    lastMeasure = "N/A",
    inauguration = "N/A",
    description = "No description available.",
    lastUpdated = "Unknown",
    sourceUrl = "",
  } = info || {};

  // State to track if screen width is <= 525px
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 525);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 525);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if the change is positive or negative based on desire
  const getChangeClass = (change) => {
    if (
      (desire === "positive" && change > 0) ||
      (desire === "negative" && change < 0)
    ) {
      return "positive";
    }
    return "negative";
  };

  const cardClass = useMemo(
    () => getChangeClass(inaugurationPercentageChange),
    [desire, inaugurationPercentageChange]
  );

  const upColor = useMemo(
    () =>
      desire === "positive" && inaugurationPercentageChange > 0
        ? `var(--positive)`
        : `var(--negative)`,
    [desire, inaugurationPercentageChange]
  );

  const downColor = useMemo(
    () =>
      desire === "negative" && inaugurationPercentageChange > 0
        ? `var(--positive)`
        : `var(--negative)`,
    [desire, inaugurationPercentageChange]
  );

  // Format the current measure display based on sign and units
  const formattedMeasure =
    sign === "$"
      ? `${sign}${currentMeasure}`
      : `${currentMeasure}${sign || ""}`;

  return (
    <div
      className={`infoCard ${cardClass}`}
      style={{
        "--upColor": upColor,
        "--downColor": downColor,
      }}
    >
      {/* Header with Title and Amount */}
      <div className="infoCard-header">
        <h3 className="title">{title}</h3>
        <h4 className="amount">
          {formattedMeasure} {units}
        </h4>
      </div>

      <div className="infoCard-divider"></div>

      {dailyChange !== 0 ? (
        <h3
          className={`change ${
            isSmallScreen ? getChangeClass(dailyChange) : ""
          }`}
        >
          {!isSmallScreen &&
            (dailyChange > 0 ? (
              <UpGraph className="icon up-icon" aria-hidden="true" />
            ) : (
              <DownGraph className="icon down-icon" aria-hidden="true" />
            ))}
          {dailyChange > 0
            ? `Up ${Math.abs(dailyChange)}%`
            : `Down ${Math.abs(dailyChange)}%`}
          {` since last ${frequency} `}
          <span className="measure-date">({lastMeasure}).</span>
        </h3>
      ) : (
        <h3 className="change">
          No change since last {frequency}{" "}
          <span className="measure-date">({lastMeasure}).</span>
        </h3>
      )}

      {inaugurationPercentageChange !== 0 ? (
        <h3
          className={`change ${
            isSmallScreen ? getChangeClass(inaugurationPercentageChange) : ""
          }`}
        >
          {!isSmallScreen &&
            (inaugurationPercentageChange > 0 ? (
              <UpGraph className="icon up-icon" aria-hidden="true" />
            ) : (
              <DownGraph className="icon down-icon" aria-hidden="true" />
            ))}
          {inaugurationPercentageChange > 0
            ? `Up ${Math.abs(inaugurationPercentageChange)}%`
            : `Down ${Math.abs(inaugurationPercentageChange)}%`}
          {` since inauguration `}
          <span className="measure-date">({inauguration}).</span>
        </h3>
      ) : (
        <h3 className="change">
          No change since inauguration{" "}
          <span className="measure-date">({inauguration}).</span>
        </h3>
      )}

      <p className="description">{description}</p>

      <div className="controls">
        <div className="last-updated">
          {`Last Updated: ${lastUpdated}`}
          {sourceUrl && (
            <>
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
