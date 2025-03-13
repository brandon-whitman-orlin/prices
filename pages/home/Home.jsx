import React, { useEffect, useState } from "react";
import "./Home.css";

import peopleData from '../../backend/people.json';
import Person from '../../components/person/Person';

import Navbar from "../../components/navbar/Navbar";
import InfoCard from "../../components/infocard/InfoCard";
import PromiseCard from "../../components/promisecard/PromiseCard";
import ThemeChange from "../../components/themechange/ThemeChange";
import ThemeMenu from "../../components/themechange/ThemeMenu";

const backendURL = process.env.REACT_APP_BACKEND_URL;

import axios from "axios";

const LOCAL_MODE = false;

function Home() {
  const [gasData, setGasData] = useState(null);
  const [eggData, setEggData] = useState(null);

  const [unemploymentData, setUnemploymentData] = useState(null);

  // useEffect(() => {
  //   // If LOCAL_MODE is true, we won't fetch data from the backend
  //   if (LOCAL_MODE) {
  //     setGasData({
  //       title: "Gasoline Prices",
  //       desire: "negative",
  //       inauguration: "01-13-2025",
  //       description:
  //         "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
  //       sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
  //       sign: "$",
  //       units: "per Gallon",
  //       frequency: "week",
  //       lastUpdated: "12-01-2024",
  //       lastMeasure: "11-24-2024",
  //       currentMeasure: 3.5,
  //       dailyChange: "-0.15",
  //       inaugurationPercentageChange: "5.0",
  //     });

  //     setEggData({
  //       title: "Egg Prices",
  //       desire: "negative",
  //       inauguration: "12-01-2024",
  //       description:
  //         "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
  //       sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
  //       sign: "$",
  //       units: "a Dozen",
  //       frequency: "month",
  //       lastUpdated: "12-01-2024",
  //       lastMeasure: "11-01-2024",
  //       currentMeasure: 2.8,
  //       dailyChange: "-0.05",
  //       inaugurationPercentageChange: "4.0",
  //     });

  //     setUnemploymentData({
  //       title: "Unemployment",
  //       desire: "positive",
  //       inauguration: "12-01-2024",
  //       description:
  //         "The unemployment rate is the percentage of the civilian labor force (16+), residing in the 50 states or D.C., who are unemployed.",
  //       sourceUrl: "https://fred.stlouisfed.org/seriesBeta/UNRATE",
  //       sign: "%",
  //       units: "",
  //       frequency: "month",
  //       lastUpdated: "12-01-2024",
  //       lastMeasure: "11-01-2024",
  //       currentMeasure: 3.7,
  //       dailyChange: "-0.1",
  //       inaugurationPercentageChange: "0.2",
  //     });
  //   } else {
  //     fetchGasData();
  //     fetchEggData();
  //     fetchUnemploymentData();
  //   }

  //   const fetchGasData = async () => {
  //     try {
  //       const response = await axios.get(`${backendURL}/api/gas`);

  //       // Extract and transform API response
  //       const {
  //         currentGasPrice,
  //         mostRecentGasMeasure,
  //         lastGasMeasure,
  //         dailyGasPercentageChange,
  //         inaugurationGasDate,
  //         inaugurationGasPercentageChange,
  //       } = response.data;

  //       // Combine hardcoded and dynamic values
  //       const gasData = {
  //         title: "Gasoline Prices",
  //         desire: "negative",
  //         inauguration: inaugurationGasDate,
  //         description:
  //           "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
  //         sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
  //         sign: "$",
  //         units: "per Gallon",
  //         frequency: "week",

  //         lastUpdated: mostRecentGasMeasure,
  //         lastMeasure: lastGasMeasure,

  //         currentMeasure: currentGasPrice,
  //         dailyChange: dailyGasPercentageChange.toFixed(2),

  //         inaugurationPercentageChange:
  //           inaugurationGasPercentageChange.toFixed(2),
  //       };

  //       setGasData(gasData);
  //     } catch (error) {
  //       console.error("Error fetching Gas data:", error);
  //     }
  //   };

  //   const fetchEggData = async () => {
  //     try {
  //       const response = await axios.get(`${backendURL}/api/egg`);

  //       // Extract and transform API response
  //       const {
  //         currentEggPrice,
  //         mostRecentEggMeasure,
  //         lastEggMeasure,
  //         dailyEggPercentageChange,
  //         inaugurationEggDate,
  //         inaugurationEggPercentageChange,
  //       } = response.data;

  //       // Combine hardcoded and dynamic values
  //       const eggData = {
  //         title: "Egg Prices",
  //         desire: "negative",
  //         inauguration: inaugurationEggDate,
  //         description:
  //           "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
  //         sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
  //         sign: "$",
  //         units: "a Dozen",
  //         frequency: "month",

  //         lastUpdated: mostRecentEggMeasure,
  //         lastMeasure: lastEggMeasure,

  //         currentMeasure: currentEggPrice,
  //         dailyChange: dailyEggPercentageChange.toFixed(2),

  //         inaugurationPercentageChange:
  //           inaugurationEggPercentageChange.toFixed(2),
  //       };

  //       setEggData(eggData);
  //     } catch (error) {
  //       console.error("Error fetching Egg data:", error);
  //     }
  //   };

  //   const fetchUnemploymentData = async () => {
  //     try {
  //       const response = await axios.get(`${backendURL}/api/unemployment`);

  //       // Extract and transform API response
  //       const {
  //         currentUnemploymentRate,
  //         mostRecentUnemploymentMeasure,
  //         lastUnemploymentMeasure,
  //         dailyUnemploymentPercentageChange,
  //         inaugurationUnemploymentDate,
  //         inaugurationUnemploymentPercentageChange,
  //       } = response.data;

  //       // Combine hardcoded and dynamic values
  //       const unemploymentData = {
  //         title: "Unemployment",
  //         desire: "negative",
  //         inauguration: inaugurationUnemploymentDate,
  //         description:
  //           "The unemployment rate is the percentage of the civilian labor force (16+), residing in the 50 states or D.C., who are unemployed.",
  //         sourceUrl: "https://fred.stlouisfed.org/seriesBeta/UNRATE",
  //         sign: "%",
  //         units: "",
  //         frequency: "month",

  //         lastUpdated: mostRecentUnemploymentMeasure,
  //         lastMeasure: lastUnemploymentMeasure,

  //         currentMeasure: currentUnemploymentRate,
  //         dailyChange: dailyUnemploymentPercentageChange.toFixed(2),

  //         inaugurationPercentageChange:
  //           inaugurationUnemploymentPercentageChange.toFixed(2),
  //       };

  //       setUnemploymentData(unemploymentData);
  //     } catch (error) {
  //       console.error("Error fetching Unemployment data:", error);
  //     }
  //   };
  // }, []);

  // if (!gasData || !eggData || !unemploymentData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="home">
      <header className="header">
        <Navbar
          links={[
            <a href="/" className="active">
              Home
            </a>,
            <a href="/about">
              About
            </a>,
            <a href="/contact">Contact</a>,
            <div className="dropdown div-button" tabIndex={0}>Options <span className="dropdown-caret"></span>
              <ul className="dropdown-menu">
                <li><ThemeChange className="dropdown-option"/></li>
                <li><button className="dropdown-option">Language</button></li>
              </ul>
            </div>
          ]}
          name={<span><span>Politician</span><span>Promises</span></span>}
        />
      </header>
      <ThemeMenu/>
      <main className="main">
        <div className="hero-text">
          <div className="hero-h1">
            <h1>Politicians make promises.</h1>
            <h1>We track 'em.</h1>
          </div>
          <p>No opinions. No bias. Just impartial data telling the real story of political promises.</p>
          {LOCAL_MODE ? <p className="placeholder-notice">This is placeholder data. Do not take any information displayed on this site as fact.</p> : null}
        </div>
        <div className="infoCard-display">
          {/* <InfoCard info={gasData} />
          <InfoCard info={eggData} />
          <InfoCard info={unemploymentData} /> */}
          <PromiseCard
          quote="End the Russia-Ukraine war within 24 hours"
          grammar="promised to"
          speaker="Donald Trump"
          quoteSource="in a campaign video"
          articleLink="https://www.youtube.com/watch?v=lWW__4EfHCM"
          accuracy={0}
          />
          <PromiseCard
          quote="Close the Guantanamo Bay Detention Center"
          grammar="promised to"
          speaker="Barack Obama"
          quoteSource="in an executive order"
          articleLink="https://obamawhitehouse.archives.gov/blog/2016/02/23/president-obamas-plan-close-Guantanamo-about-closing-chapter-history"
          accuracy={0}
          />
          <PromiseCard
          quote="Reduce government spending by $2 trillion"
          grammar="promised to"
          speaker="Elon Musk"
          quoteSource="during a political rally"
          articleLink="https://www.bloomberg.com/news/videos/2024-10-28/elon-musk-we-can-cut-2-trillion-from-us-budget-video"
          accuracy={0}
          />
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
