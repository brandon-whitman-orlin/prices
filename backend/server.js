const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file (useful for local development)

const app = express();
const port = process.env.PORT || 5000; // Use the port Render provides or fallback to 5000

const eiaApiKey = process.env.EIA_API_KEY;
const fredApiKey = process.env.FRED_API_KEY;

// console.log("From Render Environment (EIA) from Backend:", eiaApiKey);
// console.log("From Render Environment (FRED) from Backend:", fredApiKey);

// Middleware
app.use(cors()); // Enable CORS to allow requests from your frontend

// Custom date for filtering data
const customGasInaugurationDate = "2025-01-13"; // When gas was measured closest to but before the inauguration date
const customEggInaugurationDate = "2024-12-01"; // When eggs were measured closest to but before the inauguration date

// Route to fetch gas price data
app.get('/api/gas', async (req, res) => {
    try {
        const gasResponse = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=${eiaApiKey}&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=2024-01-01&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000`, {
        });
        const gasData = gasResponse.data["response"]["data"];

        // console.log(typeof data);
        // console.log("Gas data[0]: ", data[0]);
        // console.log("Gas data[0][\"period\"]: ", data[0]["period"]);
        // const firstPeriod = data[0]["period"];
        // console.log("First period: ", firstPeriod);

        // const mostRecentMeasureA = formatDate(data[0]["period"]);
        // console.log("mostRecentMeasureA: ", mostRecentMeasureA);

        const mostRecentGasMeasure = formatDate(gasData[0]["period"]);
        // console.log("Most recently measured on: ", mostRecentGasMeasure);

        const currentGasPrice = parseFloat(gasData[0]["value"]);
        // console.log("The current price is: ", currentGasPrice);

        const lastGasMeasure = formatDate(gasData[1]["period"]);
        // console.log("The last measure was on: ", lastGasMeasure);

        const lastGasPrice = parseFloat(gasData[1]["value"]);
        // console.log("The last price was: ", lastGasPrice);

        const dailyGasPercentageChange = ((currentGasPrice - lastGasPrice) / lastGasPrice) * 100;
        // console.log("Giving us a daily percentage change of: ", dailyGasPercentageChange);

        const gasResponse2 = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=${eiaApiKey}&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=${customGasInaugurationDate}&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, {
        });

        const gasData2 = gasResponse2.data["response"]["data"];
        // console.log("gasData2: ", gasData2);

        const inaugurationGasDate = formatDate(gasData2[0]["period"]);
        // console.log("The measure at inauguration was on: ", inaugurationGasDate);

        const inaugurationGasPrice = parseFloat(gasData2[0]["value"]);
        // console.log("The price at inauguration was: ", inaugurationGasPrice);

        const inaugurationGasPercentageChange = ((currentGasPrice - inaugurationGasPrice) / inaugurationGasPrice) * 100;
        // console.log("Giving us a percentage change since inauguration of: ", inaugurationGasPercentageChange);

        // console.log("-------------------------");

        // Send the fetched data to the client
        res.json({
            currentGasPrice,
            mostRecentGasMeasure,

            lastGasPrice,
            lastGasMeasure,

            dailyGasPercentageChange,

            inaugurationGasDate,
            inaugurationGasPrice,
            inaugurationGasPercentageChange,
        });
    } catch (error) {
        console.error('Error fetching Gas data:', error);
        res.status(500).json({ error: 'Error fetching Gas data' });
    }
});

// Route to fetch egg price data
app.get('/api/egg', async (req, res) => {
    try {
        const eggResponse = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: 'APU0000708111',
                api_key: fredApiKey,
                file_type: 'json',
                limit: 5, // Limit to 5 results
                sort_order: 'desc' // Sort in descending order
            }
        });
        const eggData = eggResponse.data.observations;
        // console.log("Egg Data: ", eggData);

        const mostRecentEggMeasure = formatDate(eggData[0]["date"]);
        // console.log("Most recently measured on: ", mostRecentEggMeasure);

        const currentEggPrice = parseFloat(eggData[0]["value"]);
        // console.log("The current price is: ", currentEggPrice);

        const lastEggMeasure = formatDate(eggData[1]["date"]);
        // console.log("The last measure was on: ", lastEggMeasure);

        const lastEggPrice = parseFloat(eggData[1]["value"]);
        // console.log("The last price was: ", lastEggPrice);

        const dailyEggPercentageChange = ((currentEggPrice - lastEggPrice) / lastEggPrice) * 100;
        // console.log("Giving us a daily percentage change of: ", dailyEggPercentageChange);

        const eggResponse2 = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: 'APU0000708111',
                api_key: fredApiKey,
                file_type: 'json',
                limit: 5, // Limit to 5 results
                sort_order: 'asc', // Sort in ascending order
                observation_start: customEggInaugurationDate // Start from this date
            }
        });

        const eggData2 = eggResponse2.data.observations;
        // console.log("Egg Data 2: ", eggData2);

        const inaugurationEggDate = formatDate(eggData2[0]["date"]);
        // console.log("The measure at inauguration was on: ", inaugurationEggDate);

        const inaugurationEggPrice = parseFloat(eggData2[0]["value"]);
        // console.log("The price at inauguration was: ", inaugurationEggPrice);

        const inaugurationEggPercentageChange = ((currentEggPrice - inaugurationEggPrice) / inaugurationEggPrice) * 100;
        // console.log("Giving us a percentage change since inauguration of: ", inaugurationEggPercentageChange);

        // console.log("-------------------------");

        // Send the fetched data to the client
        res.json({
            currentEggPrice,
            mostRecentEggMeasure,

            lastEggPrice,
            lastEggMeasure,

            dailyEggPercentageChange,

            inaugurationEggDate,
            inaugurationEggPrice,
            inaugurationEggPercentageChange,
        });
    } catch (error) {
        console.error('Error fetching Egg data:', error);
        res.status(500).json({ error: 'Error fetching Egg data' });
    }
});

// Route to fetch unemployment price data
app.get('/api/unemployment', async (req, res) => {
    try {
        // Define the request payload
        const unemploymentRequestData = {
            seriesid: ['CUUR0000SA0', 'SUUR0000SA0'], // Example series IDs
            startyear: '2011',
            endyear: '2014',
        };

        // Make the POST request to the API
        const unemploymentResponse = await axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', unemploymentRequestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Unemployment Response: ", unemploymentResponse);

        // const mostRecentEggMeasure = formatDate(eggData[0]["date"]);
        // console.log("Most recently measured on: ", mostRecentEggMeasure);

        // const currentEggPrice = parseFloat(eggData[0]["value"]);
        // console.log("The current price is: ", currentEggPrice);

        // const lastEggMeasure = formatDate(eggData[1]["date"]);
        // console.log("The last measure was on: ", lastEggMeasure);

        // const lastEggPrice = parseFloat(eggData[1]["value"]);
        // console.log("The last price was: ", lastEggPrice);

        // const dailyEggPercentageChange = ((currentEggPrice - lastEggPrice) / lastEggPrice) * 100;
        // console.log("Giving us a daily percentage change of: ", dailyEggPercentageChange);

        // const eggResponse2 = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
        //     params: {
        //         series_id: 'APU0000708111',
        //         api_key: fredApiKey,
        //         file_type: 'json',
        //         limit: 5, // Limit to 5 results
        //         sort_order: 'asc', // Sort in ascending order
        //         observation_start: customEggInaugurationDate // Start from this date
        //     }
        // });

        // const eggData2 = eggResponse2.data.observations;
        // console.log("Egg Data 2: ", eggData2);

        // const inaugurationEggDate = formatDate(eggData2[0]["date"]);
        // console.log("The measure at inauguration was on: ", inaugurationEggDate);

        // const inaugurationEggPrice = parseFloat(eggData2[0]["value"]);
        // console.log("The price at inauguration was: ", inaugurationEggPrice);

        // const inaugurationEggPercentageChange = ((currentEggPrice - inaugurationEggPrice) / inaugurationEggPrice) * 100;
        // console.log("Giving us a percentage change since inauguration of: ", inaugurationEggPercentageChange);

        // console.log("-------------------------");

        // Send the fetched data to the client
        res.json({
            // currentEggPrice,
            // mostRecentEggMeasure,

            // lastEggPrice,
            // lastEggMeasure,

            // dailyEggPercentageChange,

            // inaugurationEggDate,
            // inaugurationEggPrice,
            // inaugurationEggPercentageChange,
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