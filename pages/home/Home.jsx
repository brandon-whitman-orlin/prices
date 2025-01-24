import React, { useEffect, useState } from "react";
import './Home.css';

import Navbar from '../../components/navbar/Navbar';
import InfoCard from '../../components/infocard/InfoCard';

const backendURL = process.env.REACT_APP_BACKEND_URL;

import axios from "axios";

function Home() {

    const [gasData, setGasData] = useState(null);
    const [eggData, setEggData] = useState(null);

    const [unemploymentData, setUnemploymentData] = useState(null);

    useEffect(() => {

        const fetchGasData = async () => {
            try {

                // const response111 = await axios.get(`${backendURL}/api/test`);
                // console.log(response111.data);

                const response = await axios.get(`${backendURL}/api/gas`);

                // Extract and transform API response
                const { currentGasPrice, mostRecentGasMeasure, lastGasMeasure, dailyGasPercentageChange, inaugurationGasDate, inaugurationGasPercentageChange, } = response.data;

                // Combine hardcoded and dynamic values
                const gasData = {
                    title: "Gasoline Prices",
                    desire: "negative",
                    inauguration: inaugurationGasDate,
                    description: "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
                    sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
                    sign: "$",
                    units: "per Gallon",
                    frequency: "week",

                    lastUpdated: mostRecentGasMeasure,
                    lastMeasure: lastGasMeasure,

                    currentMeasure: currentGasPrice,
                    dailyChange: dailyGasPercentageChange.toFixed(2),

                    inaugurationPercentageChange: inaugurationGasPercentageChange.toFixed(2),
                };

                setGasData(gasData);
            } catch (error) {
                console.error('Error fetching Gas data:', error);
            }
        };

        const fetchEggData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/egg`);

                // Extract and transform API response
                const { currentEggPrice, mostRecentEggMeasure, lastEggMeasure, dailyEggPercentageChange, inaugurationEggDate, inaugurationEggPercentageChange, } = response.data;

                // Combine hardcoded and dynamic values
                const eggData = {
                    title: "Egg Prices",
                    desire: "negative",
                    inauguration: inaugurationEggDate,
                    description: "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
                    sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
                    sign: "$",
                    units: "a Dozen",
                    frequency: "month",

                    lastUpdated: mostRecentEggMeasure,
                    lastMeasure: lastEggMeasure,

                    currentMeasure: currentEggPrice,
                    dailyChange: dailyEggPercentageChange.toFixed(2),

                    inaugurationPercentageChange: inaugurationEggPercentageChange.toFixed(2),
                };

                setEggData(eggData);
            } catch (error) {
                console.error('Error fetching Egg data:', error);
            }
        };

        const fetchUnemploymentData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/unemployment`);

                // Extract and transform API response
                const { currentUnemploymentRate, mostRecentUnemploymentMeasure, lastUnemploymentMeasure, dailyUnemploymentPercentageChange, inaugurationUnemploymentDate, inaugurationUnemploymentPercentageChange, } = response.data;

                // Combine hardcoded and dynamic values
                const unemploymentData = {
                    title: "Unemployment",
                    desire: "negative",
                    inauguration: inaugurationUnemploymentDate,
                    description: "The unemployment rate is the percentage of the civilian labor force (16+), residing in the 50 states or D.C., who are unemployed.",
                    sourceUrl: "https://fred.stlouisfed.org/seriesBeta/UNRATE",
                    sign: "%",
                    units: "",
                    frequency: "month",

                    lastUpdated: mostRecentUnemploymentMeasure,
                    lastMeasure: lastUnemploymentMeasure,

                    currentMeasure: currentUnemploymentRate,
                    dailyChange: dailyUnemploymentPercentageChange.toFixed(2),

                    inaugurationPercentageChange: inaugurationUnemploymentPercentageChange.toFixed(2),
                };

                setUnemploymentData(unemploymentData);
            } catch (error) {
                console.error('Error fetching Unemployment data:', error);
            }
        };

        fetchGasData();
        fetchEggData();
        fetchUnemploymentData();
    }, []);

    // if (!gasData || !eggData || !unemploymentData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="home">
            <header className="header">
                <Navbar
                    links={[
                        <a href="/" className="active">Home</a>,
                        <a href="/about" className="custom-class">About</a>,
                        <a href="/contact">Contact</a>
                    ]} name="My Website" />
            </header>
            <main className="main">
                <h1>HOW IS THE PRESIDENT DOING?</h1>
                <h3>The president of the United States of America is supposed to care for the country. Let's see how the current president is doing so far:</h3>

                <InfoCard info={gasData} />
                <InfoCard info={eggData} />
                <InfoCard info={unemploymentData} />
            </main>
            <footer className="footer"></footer>
        </div>
    );
}

export default Home;
