const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv").config({ path: "../.env" });

const portfolioRouter = () => {
  const router = express.Router();

  // Portfolio Routes
  // get portfolio data from the database or wherever it's stored this is just temporary
  const portfoliosData = [
    // more portfolios will be added
  ];

  // function to format large balance nubmers
  function formatNumber(num) {
    let parsedNum = parseFloat(num);
    if (parsedNum >= 1000000) {
      return (parsedNum / 1000000).toFixed(1) + "M";
    } else if (parsedNum >= 1000) {
      return (parsedNum / 1000).toFixed(1) + "K";
    } else {
      return parsedNum.toString(); // original number if its less than 1000
    }
  }
  async function getBitcoinBalance(address) {
    const url = `https://mempool.space/api/address/${address}`;
    try {
      const response = await axios.get(url);
      const { chain_stats, mempool_stats } = response.data;

      // confirmed and unconfirmed balances
      let confirmedBalance =
        chain_stats.funded_txo_sum - chain_stats.spent_txo_sum;
      let unconfirmedBalance =
        mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum;
      let totalBalanceSatoshis = confirmedBalance + unconfirmedBalance;

      // satoshis to Bitcoin
      let totalBalanceBTC = totalBalanceSatoshis / 100000000;

      return totalBalanceBTC;
    } catch (error) {
      console.error("Error fetching Bitcoin balance:", error);
      return 0;
    }
  }

  async function getEthereumBalance(address) {
    const apiKey = process.env.ETHERSCAN_API_KEY; // Ensure this matches your .env variable name
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await axios.get(url);
    return response.data.result / 1e18; // convert from Wei to Ether
  }

  async function getCardanoBalance(address) {
    const url = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`;
    const response = await axios.get(url, {
      headers: { project_id: BLOCKFROST_API_KEY },
    });
    return response.data.amount[0].quantity / 1e6; // convert from Lovelace to ADA
  }

  // function to get current price of ETH or ADA in USD
  let cachedPrices = { ethPrice: null, adaPrice: null };
  let lastPriceFetchTime = 0;
  async function getCoinPrices() {
    const now = Date.now();
    // check if the last fetched time is within 5 minutes
    if (
      cachedPrices.ethPrice &&
      cachedPrices.adaPrice &&
      now - lastPriceFetchTime < 5 * 60 * 1000
    ) {
      return cachedPrices;
    }

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,cardano&vs_currencies=usd"
      );
      cachedPrices = {
        ethPrice: response.data.ethereum.usd,
        adaPrice: response.data.cardano.usd,
      };
      lastPriceFetchTime = now;
      return cachedPrices;
    } catch (error) {
      console.error("Error fetching coin prices from CoinGecko:", error);
      return { ethPrice: 0, adaPrice: 0 }; //error
    }
  }

  // function to get the current Bitcoin price in USD
  let cachedBitcoinPrice = null;
  let lastFetchedTime = 0;
  async function getCurrentBitcoinPrice() {
    const now = Date.now();
    // if  last fetched time is within 5 minutes return the cached price so we dont need to constantly call api
    if (cachedBitcoinPrice && now - lastFetchedTime < 5 * 60 * 1000) {
      return cachedBitcoinPrice;
    }

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      cachedBitcoinPrice = response.data.bitcoin.usd;
      lastFetchedTime = now;
      return cachedBitcoinPrice;
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
      return null;
    }
  }

  router.get("/portfolios", async (req, res) => {
    try {
      const prices = await getCoinPrices();
      const updatedPortfolios = await Promise.all(
        portfoliosData.map(async (portfolio) => {
          switch (portfolio.platformId) {
            case "bitcoin":
              const bitcoinPriceUSD = await getCurrentBitcoinPrice();
              const btcBalance = await getBitcoinBalance(portfolio.address);
              const btcBalanceUSD = btcBalance * bitcoinPriceUSD;
              return {
                ...portfolio,
                balance: `$${formatNumber(btcBalanceUSD.toFixed(2))}`,
              };
            case "ethereum":
              const ethBalance = await getEthereumBalance(portfolio.address);
              const ethBalanceUSD = ethBalance * prices.ethPrice;
              return {
                ...portfolio,
                balance: `$${formatNumber(ethBalanceUSD.toFixed(2))}`,
              };
            case "cardano":
              const adaBalance = await getCardanoBalance(portfolio.address);
              return { ...portfolio, balance: `${adaBalance} ADA` };
            default:
              return portfolio; // case for other or unknown platformIds SHOULD NOT BE REACHED
          }
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
    const { name, address, platformId, balance } = req.body;

    // make a new portfolio object
    const newPortfolio = {
      id: `portfolio-${portfoliosData.length + 1}`, // ID generation we can change later when we integrate database
      name,
      platformId,
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

    const index = portfoliosData.findIndex((p) => p.id === id);
    if (index !== -1) {
      portfoliosData.splice(index, 1); // remove portfolio from array
      res.json({ message: `Wallet with ID ${id} deleted.` });
    } else {
      res.status(404).json({ message: `Wallet with ID ${id} not found.` });
    }
  });

  //For CryptoList API - Route handler for GET requests to the '/api/coins' endpoint

  router.get("/coins", async (req, res) => {
    const { page } = req.query;
    const offset = (page - 1) * 100; // CoinCap uses offset, not skip

    try {
      // Calls URL to fetch data from the CoinCap API
      const url = `https://api.coincap.io/v2/assets?limit=100&offset=${offset}`;
      const response = await axios.get(url);
      const data = response.data.data.map((coin) => ({
        id: coin.id,
        name: coin.name,
        priceUsd: parseFloat(coin.priceUsd).toFixed(2), // Format for simplicity
      }));
      res.json(data);
    } catch (error) {
      // Error checking
      console.error("Error fetching coin data:", error);
      res.status(500).send("Error fetching coin data");
    }
  });

  return router;
};

module.exports = portfolioRouter;
