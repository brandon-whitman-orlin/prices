const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file (useful for local development)

const app = express();
const port = process.env.PORT || 5000; // Use the port Render provides or fallback to 5000

const eiaApiKey = process.env.EIA_API_KEY;
const fredApiKey = process.env.FRED_API_KEY;

console.log("From Render Environment (EIA) from Backend:", eiaApiKey);
console.log("From Render Environment (FRED) from Backend:", fredApiKey);

// Middleware
app.use(cors()); // Enable CORS to allow requests from your frontend

// Custom date for filtering data
const customInaugurationDate = "2025-01-20";

// Route to fetch gas price data
app.get('/api/gas', async (req, res) => {
    try {
        const response = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=${eiaApiKey}&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=2020-01-20&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000`, {
        });
        const data = response.data["response"]["data"];

        console.log(typeof data);
        console.log("Gas data[0]: ", data[0]);
        console.log("Gas data[0][\"period\"]: ", data[0]["period"]);
        const firstPeriod = data[0]["period"];
        console.log("First period: ", firstPeriod);

        const mostRecentMeasure = formatDate(data[0]["period"]);
        // console.log("Most recently measured on: ", mostRecentMeasure);

        const currentPrice = parseFloat(data[0]["value"]);
        // console.log("The current price is: ", currentPrice);

        const lastMeasure = formatDate(data[1]["period"]);
        // console.log("The last measure was on: ", lastMeasure);

        const lastPrice = parseFloat(data[1]["value"]);
        // console.log("The last price was: ", lastPrice);

        const dailyPercentageChange = ((currentPrice - lastPrice) / lastPrice) * 100;
        // console.log("Giving us a daily percentage change of: ", dailyPercentageChange);

        const response2 = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=${eiaApiKey}&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=${customInaugurationDate}&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, {
        });

        const data2 = response2.data["response"]["data"];

        const inaugurationDate = formatDate(data2[0]["period"]);
        // console.log("The measure at inauguration was on: ", inaugurationDate);

        const inaugurationPrice = parseFloat(data2[0]["value"]);
        // console.log("The price at inauguration was: ", inaugurationPrice);

        const inaugurationPercentageChange = ((currentPrice - inaugurationPrice) / inaugurationPrice) * 100;
        // console.log("Giving us a percentage change since inauguration of: ", inaugurationPercentageChange);

        // console.log("-------------------------");

        // Send the fetched data to the client
        res.json({
            currentPrice,
            mostRecentMeasure,

            lastPrice,
            lastMeasure,

            dailyPercentageChange,

            inaugurationDate,
            inaugurationPrice,
            inaugurationPercentageChange,
        });
    } catch (error) {
        console.error('Error fetching Gas data:', error);
        res.status(500).json({ error: 'Error fetching Gas data' });
    }
});

// Route to fetch egg price data
app.get('/api/egg', async (req, res) => {
    try {
        const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: 'APU0000708111',
                api_key: fredApiKey,
                file_type: 'json',
                limit: 5, // Limit to 5 results
                sort_order: 'desc' // Sort in descending order
            }
        });
        const data = response.data.observations;
        // console.log("Egg Data: ", data);

        const mostRecentMeasure = formatDate(data[0]["date"]);
        // console.log("Most recently measured on: ", mostRecentMeasure);

        const currentPrice = parseFloat(data[0]["value"]);
        // console.log("The current price is: ", currentPrice);

        const lastMeasure = formatDate(data[1]["date"]);
        // console.log("The last measure was on: ", lastMeasure);

        const lastPrice = parseFloat(data[1]["value"]);
        // console.log("The last price was: ", lastPrice);

        const dailyPercentageChange = ((currentPrice - lastPrice) / lastPrice) * 100;
        // console.log("Giving us a daily percentage change of: ", dailyPercentageChange);

        const response2 = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: 'APU0000708111',
                api_key: fredApiKey,
                file_type: 'json',
                limit: 5, // Limit to 5 results
                sort_order: 'asc', // Sort in ascending order
                observation_start: customInaugurationDate // Start from this date
            }
        });

        const data2 = response2.data.observations;
        // console.log("Egg Data 2: ", data2);

        const inaugurationDate = formatDate(data2[0]["date"]);
        // console.log("The measure at inauguration was on: ", inaugurationDate);

        const inaugurationPrice = parseFloat(data2[0]["value"]);
        // console.log("The price at inauguration was: ", inaugurationPrice);

        const inaugurationPercentageChange = ((currentPrice - inaugurationPrice) / inaugurationPrice) * 100;
        // console.log("Giving us a percentage change since inauguration of: ", inaugurationPercentageChange);

        // console.log("-------------------------");

        // Send the fetched data to the client
        res.json({
            currentPrice,
            mostRecentMeasure,

            lastPrice,
            lastMeasure,

            dailyPercentageChange,

            inaugurationDate,
            inaugurationPrice,
            inaugurationPercentageChange,
        });
    } catch (error) {
        console.error('Error fetching Egg data:', error);
        res.status(500).json({ error: 'Error fetching Egg data' });
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
};