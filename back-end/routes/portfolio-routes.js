const express = require("express"); 
const mongoose = require("mongoose");
const axios = require("axios");


const portfolioRouter = () => {

  const router = express.Router()

    // Portfolio Routes
    // get portfolio data from the database or wherever it's stored this is just temporary
  const portfoliosData = [
        // more portfolios will be added
   ];
    
  // function to get the current Bitcoin price in USD
  async function getCurrentBitcoinPrice() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      return response.data.bitcoin.usd;
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
      return null;
    }
  }
  
  router.get("/portfolios", async (req, res) => {
    try {
      const bitcoinPriceUSD = await getCurrentBitcoinPrice();
      if (!bitcoinPriceUSD) {
        throw new Error("Failed to fetch Bitcoin price");
      }
  
      const updatedPortfolios = await Promise.all(
        portfoliosData.map(async (portfolio) => {
          let { platformId, address } = portfolio;
  
          if (platformId !== "bitcoin") {
            return portfolio; // skip non-Bitcoin portfolios for now we can add ETH ADA and others here later
          }
  
          // get the balance from the Mempool API
          const url = `https://mempool.space/api/address/${address}`;
          const response = await axios.get(url);
          const { chain_stats, mempool_stats } = response.data;
  
          let confirmedBalance =
            chain_stats.funded_txo_sum - chain_stats.spent_txo_sum;
          let unconfirmedBalance =
            mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum;
          let totalBalanceSatoshis = confirmedBalance + unconfirmedBalance;
          let totalBalanceBTC = totalBalanceSatoshis / 100000000; // convert satoshis to Bitcoin
  
          let balanceUSD = totalBalanceBTC * bitcoinPriceUSD;
  
          // return the portfolio with the balance in USD
          return { ...portfolio, balance: `$${balanceUSD.toFixed(2)}` };
        })
      );
  
      res.json(updatedPortfolios);
    } catch (error) {
      console.error("Error fetching portfolio data with balance:", error);
      res
        .status(500)
        .json({ message: "Error fetching portfolio data with balance" });
    }
  });
  
  router.post("/addWallet", async (req, res) => {
    const { name, address, balance } = req.body;
  
    // make a new portfolio object
    const newPortfolio = {
      id: `portfolio-${portfoliosData.length + 1}`, // ID generation we can change later when we integrate database
      name,
      platformId: "bitcoin",
      address,
      balance,
    };
  
    portfoliosData.push(newPortfolio);
  
    res.json({
      portfolios: portfoliosData,
      message: `Address ${address} received and processed.`,
    });
  });
  
  router.delete("/deleteWallet/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`DELETE request to /api/deleteWallet with ID ${id}`);
    // find wallet by ID and delete it -- neds to be implemented
  
    //for now just send a message
    res.json({ message: `Wallet with ID ${id} deleted.` });
  });
  
  //For CryptoList API - Route handler for GET requests to the '/api/coins' endpoint
  
  router.get("/coins", async (req, res) => {
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

    return router
};

module.exports = portfolioRouter;