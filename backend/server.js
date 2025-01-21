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
const customInaugurationDate = "2021-01-20";

// Route to fetch gas price data
app.get('/api/gas', async (req, res) => {
    try {
        const response = await axios.get('https://api.eia.gov/v2/petroleum/pri/gnd/data/', {
            params: {
                api_key: eiaApiKey,
                frequency: 'weekly',
                'data[0]': 'value',
                'facets[duoarea][]': 'NUS',
                'facets[product][]': 'EPMR',
                start: '2020-01-20',
                sort: '[{"column":"period","direction":"desc"}]',
                offset: 0,
                length: 5000,
            },
        });

        const data = response.data.response.data;
        const gasPricesSinceInauguration = data.filter(
            (item) => item.period >= customInaugurationDate
        );

        res.json({
            recentPrice: data[0]?.value || null,
            inaugurationPrice: gasPricesSinceInauguration[0]?.value || null,
            gasPricesSinceInauguration,
        });
    } catch (error) {
        console.error('Error fetching gas data:', error);
        res.status(500).json({ error: 'Error fetching gas data' });
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
                limit: 5,
                sort_order: 'desc',
            },
        });

        const data = response.data.observations;
        const eggPricesSinceInauguration = data.filter(
            (item) => item.date >= customInaugurationDate
        );

        res.json({
            recentPrice: data[0]?.value || null,
            inaugurationPrice: eggPricesSinceInauguration[0]?.value || null,
            eggPricesSinceInauguration,
        });
    } catch (error) {
        console.error('Error fetching egg data:', error);
        res.status(500).json({ error: 'Error fetching egg data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});