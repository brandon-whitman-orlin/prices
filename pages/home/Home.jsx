import React, { useEffect, useState } from "react";
import './Home.css';
import InfoCard from '../../components/infocard/InfoCard';

import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Home() {
    const [gasData, setGasData] = useState(null);
    const [eggData, setEggData] = useState(null);

    useEffect(() => {
        const fetchGasData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/gas`); // Your backend API

                // Extract and transform API response
                const { currentPrice, mostRecentMeasure, lastMeasure, dailyPercentageChange, inaugurationDate, inaugurationPercentageChange, } = response.data;

                // Combine hardcoded and dynamic values
                const gasData = {
                    title: "Gasoline Prices",
                    desire: "negative",
                    inauguration: inaugurationDate,
                    description: "Regular gasoline is a type of unleaded gasoline with an octane rating of 87. It's the most common type of gasoline used in the world.",
                    sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
                    units: "per Gallon",
                    frequency: "week",

                    lastUpdated: mostRecentMeasure,
                    lastMeasure: lastMeasure,

                    currentPrice: currentPrice,
                    dailyChange: dailyPercentageChange.toFixed(2),

                    inaugurationPercentageChange: inaugurationPercentageChange.toFixed(2),
                };

                setGasData(gasData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchEggData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/egg`); // Your backend API

                // Extract and transform API response
                const { currentPrice, mostRecentMeasure, lastMeasure, dailyPercentageChange, inaugurationDate, inaugurationPercentageChange, } = response.data;

                // Combine hardcoded and dynamic values
                const eggData = {
                    title: "Egg Prices",
                    desire: "negative",
                    inauguration: inaugurationDate,
                    description: "Large white, Grade A chicken eggs, sold in a carton of a dozen. Includes organic, non-organic, cage free, free range, and traditional.",
                    sourceUrl: "https://fred.stlouisfed.org/seriesBeta/APU0000708111",
                    units: "a Dozen",
                    frequency: "month",

                    lastUpdated: mostRecentMeasure,
                    lastMeasure: lastMeasure,

                    currentPrice: currentPrice,
                    dailyChange: dailyPercentageChange.toFixed(2),

                    inaugurationPercentageChange: inaugurationPercentageChange.toFixed(2),
                };

                setEggData(eggData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchGasData();
        fetchEggData();
    }, []);

    if (!gasData || !eggData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="home">
            <InfoCard info={gasData} />
            <InfoCard info={eggData} />
        </section>
    );
}

export default Home;
