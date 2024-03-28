// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require('cors');
const axios = require('axios');
const dotenv = require("dotenv");

app.use(cors());

app.get("/news", (req, res) => {
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


module.exports = app