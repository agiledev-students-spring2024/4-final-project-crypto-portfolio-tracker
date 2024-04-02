// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require('cors');
const axios = require('axios');
const dotenv = require("dotenv");

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = {
        status: "login accepted",
        message: "login successful",
        username: username,
        password: password,
    };

    res.json(data);
 });

 app.post("/api/forgot_password", async (req, res) => {
    const email = req.body.email;

    const data = {
        status: "Email accepted",
        message: "Email has been sent",
        email: email,
    };
    
    res.json(data);
 });

 app.post("/api/register", async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const data = {
        status: "User Registration successful",
        message: "User has been registered",
        name: name,
        username: username,
        email: email,
        password: password,
    };
    
    res.json(data);
 });


app.get("/api/news", (req, res, next) => {
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
  const offset = (page - 1) * 100;

  try {
    const url = `https://api.coincap.io/v2/assets?limit=100&offset=${offset}`;
    const response = await axios.get(url);
    const data = response.data.data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol, // Add the symbol property
      priceUsd: parseFloat(coin.priceUsd).toFixed(2),
      iconUrl: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`, // Add the iconUrl property
    }));
    res.json(data);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    res.status(500).send('Error fetching coin data');
  }
});

module.exports = app;
