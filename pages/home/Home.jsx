import React, { useEffect, useState } from "react";
import "./Home.css";

import peopleData from '../../backend/people.json';
import Person from '../../components/person/Person';

import Navbar from "../../components/navbar/Navbar";
import InfoCard from "../../components/infocard/InfoCard";
import PromiseCard from "../../components/promisecard/PromiseCard";

const backendURL = process.env.REACT_APP_BACKEND_URL;

import axios from "axios";

const LOCAL_MODE = true;

function Home() {
  const [gasData, setGasData] = useState(null);
  const [eggData, setEggData] = useState(null);

  const [unemploymentData, setUnemploymentData] = useState(null);

  useEffect(() => {
    // If LOCAL_MODE is true, we won't fetch data from the backend
    if (LOCAL_MODE) {
      setGasData({
        title: "Gasoline Prices",
        desire: "negative",
        inauguration: "01-13-2025",
        description:
          "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
        sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
        sign: "$",
        units: "per Gallon",
        frequency: "week",
        lastUpdated: "12-01-2024",
        lastMeasure: "11-24-2024",
        currentMeasure: 3.5,
        dailyChange: "-0.15",
        inaugurationPercentageChange: "5.0",
      });

      setEggData({
        title: "Egg Prices",
        desire: "negative",
        inauguration: "12-01-2024",
        description:
          "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
        sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
        sign: "$",
        units: "a Dozen",
        frequency: "month",
        lastUpdated: "12-01-2024",
        lastMeasure: "11-01-2024",
        currentMeasure: 2.8,
        dailyChange: "-0.05",
        inaugurationPercentageChange: "4.0",
      });

      setUnemploymentData({
        title: "Unemployment",
        desire: "positive",
        inauguration: "12-01-2024",
        description:
          "The unemployment rate is the percentage of the civilian labor force (16+), residing in the 50 states or D.C., who are unemployed.",
        sourceUrl: "https://fred.stlouisfed.org/seriesBeta/UNRATE",
        sign: "%",
        units: "",
        frequency: "month",
        lastUpdated: "12-01-2024",
        lastMeasure: "11-01-2024",
        currentMeasure: 3.7,
        dailyChange: "-0.1",
        inaugurationPercentageChange: "0.2",
      });
    } else {
      fetchGasData();
      fetchEggData();
      fetchUnemploymentData();
    }

    const fetchGasData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/gas`);

        // Extract and transform API response
        const {
          currentGasPrice,
          mostRecentGasMeasure,
          lastGasMeasure,
          dailyGasPercentageChange,
          inaugurationGasDate,
          inaugurationGasPercentageChange,
        } = response.data;

        // Combine hardcoded and dynamic values
        const gasData = {
          title: "Gasoline Prices",
          desire: "negative",
          inauguration: inaugurationGasDate,
          description:
            "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
          sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
          sign: "$",
          units: "per Gallon",
          frequency: "week",

          lastUpdated: mostRecentGasMeasure,
          lastMeasure: lastGasMeasure,

          currentMeasure: currentGasPrice,
          dailyChange: dailyGasPercentageChange.toFixed(2),

          inaugurationPercentageChange:
            inaugurationGasPercentageChange.toFixed(2),
        };

        setGasData(gasData);
      } catch (error) {
        console.error("Error fetching Gas data:", error);
      }
    };

    const fetchEggData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/egg`);

        // Extract and transform API response
        const {
          currentEggPrice,
          mostRecentEggMeasure,
          lastEggMeasure,
          dailyEggPercentageChange,
          inaugurationEggDate,
          inaugurationEggPercentageChange,
        } = response.data;

        // Combine hardcoded and dynamic values
        const eggData = {
          title: "Egg Prices",
          desire: "negative",
          inauguration: inaugurationEggDate,
          description:
            "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
          sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
          sign: "$",
          units: "a Dozen",
          frequency: "month",

          lastUpdated: mostRecentEggMeasure,
          lastMeasure: lastEggMeasure,

          currentMeasure: currentEggPrice,
          dailyChange: dailyEggPercentageChange.toFixed(2),

          inaugurationPercentageChange:
            inaugurationEggPercentageChange.toFixed(2),
        };

        setEggData(eggData);
      } catch (error) {
        console.error("Error fetching Egg data:", error);
      }
    };

    const fetchUnemploymentData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/unemployment`);

        // Extract and transform API response
        const {
          currentUnemploymentRate,
          mostRecentUnemploymentMeasure,
          lastUnemploymentMeasure,
          dailyUnemploymentPercentageChange,
          inaugurationUnemploymentDate,
          inaugurationUnemploymentPercentageChange,
        } = response.data;

        // Combine hardcoded and dynamic values
        const unemploymentData = {
          title: "Unemployment",
          desire: "negative",
          inauguration: inaugurationUnemploymentDate,
          description:
            "The unemployment rate is the percentage of the civilian labor force (16+), residing in the 50 states or D.C., who are unemployed.",
          sourceUrl: "https://fred.stlouisfed.org/seriesBeta/UNRATE",
          sign: "%",
          units: "",
          frequency: "month",

          lastUpdated: mostRecentUnemploymentMeasure,
          lastMeasure: lastUnemploymentMeasure,

          currentMeasure: currentUnemploymentRate,
          dailyChange: dailyUnemploymentPercentageChange.toFixed(2),

          inaugurationPercentageChange:
            inaugurationUnemploymentPercentageChange.toFixed(2),
        };

        setUnemploymentData(unemploymentData);
      } catch (error) {
        console.error("Error fetching Unemployment data:", error);
      }
    };
  }, []);

  if (!gasData || !eggData || !unemploymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <header className="header">
        <Navbar
          links={[
            <a href="/" className="active">
              Home
            </a>,
            <a href="/about" className="custom-class">
              About
            </a>,
            <a href="/contact">Contact</a>,
          ]}
          name="PoliticalPromises"
        />
      </header>
      <main className="main">
        <div className="hero-text">
          <div className="hero-h1">
            <h1>Politicians make promises.</h1>
            <h1>We track 'em.</h1>
          </div>
          <p>Political promises aren't just words—they're strategic tools of manipulation. We're your weapon against political deceit.</p>
          {LOCAL_MODE ? <p className="placeholder-notice">This is placeholder data. Do not take any information displayed on this site as fact.</p> : null}
        </div>
        <div className="infoCard-display">
          {/* <InfoCard info={gasData} />
          <InfoCard info={eggData} />
          <InfoCard info={unemploymentData} /> */}
          <PromiseCard
          quote="Every American will get $1000"
          speaker="Donald Trump"
          quoteSource="in an interview"
          articleLink="https://example.com"
          accuracy={0}
          />
          <PromiseCard
          quote="The Earth will explode in 2 days"
          speaker="Barack Obama"
          quoteSource="in a speech"
          articleLink="https://example.com"
          accuracy={100}
          />
          <PromiseCard
          quote="Space is not real"
          speaker="Elon Musk"
          quoteSource="in a tweet"
          articleLink="https://example.com"
          accuracy={50}
          />
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
