// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User.js")
app.use(cors());
app.use(express.json());

// the following are used for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

app.use(passport.initialize())

// connect to the database
try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MongoDB.`)
} catch (err) {
    console.log(
      `Error connecting to MongoDB Atlas: ${err}`
    )
  }

const authenticationRoutes = require("./routes/user-authentication.js")
const protectedRoutes = require("./routes/protected-content-routes.js")
const portfolioRoutes = require("./routes/portfolio-routes.js")
// Import the favorites routes const favoritesRoutes = require("./routes/favorites-routes.js");


app.use("/api", authenticationRoutes())
app.use("/api/protected/", protectedRoutes())
app.use("/api", portfolioRoutes())
// Use the favorites routes app.use("/api", favoritesRoutes); 

app.get("/api/news", (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",
    headers: {
      "X-RapidAPI-Key": "31fd1e50c7msh80e380145cecaaap1403b6jsn6eeeb915efcc",
      "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((apiResponse) => res.json(apiResponse.data))
    .catch((err) => next(err));
});

module.exports = app;
