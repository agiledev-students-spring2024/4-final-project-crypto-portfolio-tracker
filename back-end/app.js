// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require('cors');
const axios = require('axios');
const dotenv = require("dotenv");

app.use(cors());

app.get("/news", (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
        headers: {
          'X-RapidAPI-Key': '31fd1e50c7msh80e380145cecaaap1403b6jsn6eeeb915efcc',
          'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
        }
      };
    
    axios
        .request(options)
        .then(apiResponse => res.json(apiResponse.data))
        .catch(err => next(err))
}); 

//For CryptoList API - Route handler for GET requests to the '/api/coins' endpoint

app.get('/api/coins', async (req, res) => {
    const { page } = req.query;
    const offset = (page - 1) * 100; // CoinCap uses offset, not skip

    try {
        // Calls URL to fetch data from the CoinCap API
        const url = `https://api.coincap.io/v2/assets?limit=100&offset=${offset}`;
        const response = await axios.get(url);
        const data = response.data.data.map(coin => ({
            id: coin.id,
            name: coin.name,
            priceUsd: parseFloat(coin.priceUsd).toFixed(2), // Format for simplicity
        }));
        res.json(data);
    } catch (error) {
        // Error checking
        console.error('Error fetching coin data:', error);
        res.status(500).send('Error fetching coin data');
    }
});

module.exports = app;
