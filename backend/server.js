// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the cors package
const app = express();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const customInaugurationDate = "2025-01-20";

// Enable CORS for all requests
app.use(cors());

// Define a route that fetches data from the Treasury API
app.get('/api/gas', async (req, res) => {
    try {
        const response = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=ibhMj971OWWxzKIy0oyFZWy4XAu6jbbopVODC7CW&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=2020-01-20&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000`, {
        });
        const data = response.data["response"]["data"];

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

        const response2 = await axios.get(`https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=ibhMj971OWWxzKIy0oyFZWy4XAu6jbbopVODC7CW&frequency=weekly&data[0]=value&facets[duoarea][]=NUS&facets[product][]=EPMR&start=${customInaugurationDate}&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, {
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
        console.error('Error fetching debt data:', error);
        res.status(500).json({ error: 'Error fetching debt data' });
    }
});

app.get('/api/egg', async (req, res) => {
    try {
        const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: 'APU0000708111',
                api_key: '5017b8ad554443b2480edb73c64009ac',
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
                api_key: '5017b8ad554443b2480edb73c64009ac',
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
        console.error('Error fetching debt data:', error);
        res.status(500).json({ error: 'Error fetching debt data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
};
