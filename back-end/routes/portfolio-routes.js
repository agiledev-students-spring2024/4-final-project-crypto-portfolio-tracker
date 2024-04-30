const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const Moralis = require("moralis").default;
const axios = require("axios");
const { useSyncExternalStore } = require("react");
const dotenv = require("dotenv").config({ path: "../.env" });
// Portfolio Routes
const portfolioRouter = () => {
  const router = express.Router();

  // Helper Functions
  //-------------------------------------

  // function to format large balance nubmers
  function formatNumber(num) {
    let parsedNum = parseFloat(num);
    if (parsedNum >= 1000000) {
      return (parsedNum / 1000000).toFixed(1) + "M";
    } else if (parsedNum >= 1000) {
      return (parsedNum / 1000).toFixed(1) + "K";
    } else {
      return parsedNum.toFixed(2); // original number if its less than 1000 up to 2 decimal places
    }
  }

  // function to calculate total worth of portfolios and timestamp
  async function calculateTotalBalance(user, updatedPortfolios) {
    const datetime = new Date();
    let total_balance = 0;

    updatedPortfolios.forEach((portfolio) => {
      total_balance += portfolio.true_balance;
    });

    const lastEntry = user.portfolioHistory[user.portfolioHistory.length - 1];
    if (
      !lastEntry ||
      lastEntry.date.toDateString() !== datetime.toDateString()
    ) {
      user.portfolioHistory.push({ date: datetime, totalWorth: total_balance });
      await user.save();
    }

    return { total_balance, datetime };
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
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await axios.get(url);
    return response.data.result / 1e18; // convert from Wei to Ether
  }

  async function getCardanoBalance(address) {
    const url = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`;
    const response = await axios.get(url, {
      headers: { project_id: process.env.BLOCKFROST_API_KEY },
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

  router.get("/portfolios/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log("Something went wrong: user not found:", username);
        next();
      }

      const portfoliosData = user.portfolio;
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
                true_balance: btcBalanceUSD,
              };
            case "ethereum":
              const ethBalance = await getEthereumBalance(portfolio.address);
              const ethBalanceUSD = ethBalance * prices.ethPrice;
              return {
                ...portfolio,
                balance: `$${formatNumber(ethBalanceUSD.toFixed(2))}`,
                true_balance: ethBalanceUSD,
              };
            case "cardano":
              const adaBalance = await getCardanoBalance(portfolio.address);
              const adaBalanceUSD = adaBalance * prices.adaPrice; // Convert ADA balance to USD
              return {
                ...portfolio,
                balance: `$${formatNumber(adaBalanceUSD.toFixed(2))}`,
                true_balance: adaBalanceUSD,
              };
            default:
              return portfolio; // case for other or unknown platformIds SHOULD NOT BE REACHED
          }
        })
      );

      const { total_balance, datetime } = await calculateTotalBalance(
        user,
        updatedPortfolios
      );

      res.json({
        portfolios: updatedPortfolios,
        totalWorth: total_balance.toFixed(2),
        datetime,
      });
      
    } catch (error) {
      console.error("Error fetching portfolio data with balance:", error);
      res
        .status(500)
        .json({ message: "Error fetching portfolio data with balance" });
    }
  });

  router.post("/addWallet", async (req, res) => {
    const {
      username,
      name,
      address,
      platformId,
      balance,
      portfolioId,
      true_balance,
    } = req.body;

    // make a new portfolio object
    const newPortfolio = {
      portfolioId,
      name,
      platformId,
      address,
      balance,
      true_balance,
    };

    const user = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { portfolio: newPortfolio } }
    );

    if (!user) {
      console.log("Something went wrong: user not found");
      next();
    } else {
      res.json({
        message: `Address ${address} received and processed.`,
      });
    }
  });

  router.delete("/deleteWallet/:username/:portfolioId", async (req, res) => {
    const { username, portfolioId } = req.params;

    console.log("Attempting to delete portfolio with ID:", portfolioId);

    if (!portfolioId) {
      return res.status(400).json({ message: "No portfolio ID provided." });
    }

    try {
      const user = await User.updateOne(
        { username: username },
        { $pull: { portfolio: { portfolioId: portfolioId } } }
      );
      if (user.modifiedCount === 0) {
        throw new Error("Portfolio not found or already deleted");
      }
      res.json({
        message: `Wallet with ID ${portfolioId} deleted successfully.`,
      });
    } catch (err) {
      console.error("Error deleting wallet data:", err);
      res
        .status(404)
        .json({ message: `Wallet with ID ${portfolioId} not found.` });
    }
  });

  // PUT request to rename portfolio
  router.put("/renamePortfolio/:username/:portfolioId", async (req, res) => {
    const { username, portfolioId } = req.params;
    const { newName } = req.body;

    try {
      const user = await User.findOne({ username });
      const portfolio = user.portfolio.find(
        (p) => p.portfolioId === portfolioId
      );
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }

      // update the name of the portfolio
      portfolio.name = newName;
      await user.save();
      res
        .status(200)
        .json({ message: "Portfolio renamed successfully", portfolio });
    } catch (error) {
      console.error("Error renaming portfolio:", error);
      res.status(500).json({ message: "Error renaming portfolio" });
    }
  });

  // requests for histograph data
  router.get("/portfolioHistory/:username", async (req, res) => {
    const { username } = req.params;
    const { range } = req.query; // '30days' or '24hours'

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const now = new Date();
      let history = user.portfolioHistory.filter((entry) => {
        let timeDiff = now - entry.date;
        if (range === "30days") {
          return timeDiff <= 30 * 24 * 60 * 60 * 1000;
        } else if (range === "24hours") {
          return timeDiff <= 24 * 60 * 60 * 1000;
        }
      });

      res.json(
        history.map((entry) => ({
          date: entry.date,
          totalWorth: entry.totalWorth,
        }))
      );
    } catch (error) {
      console.error("Error fetching historical data:", error);
      res.status(500).send("Failed to fetch historical data");
    }
});

  router.post("/addNFT", async (req, res) => {
    const { username, address } = req.body;

    async function getNFTCollection() {
      try {
        await Moralis.start({
          apiKey: `${process.env.MORALIS_API_KEY}`
        });
      
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          "chain": "0x1",
          "format": "decimal",
          "normalizeMetadata": true,
          "address": `${address}`
        });
      
        return response.raw.result;

      } catch (e) {
        console.error(e);
      }
  }

    const user = await User.findOne({username: username});

    if(!user){
      console.log("Something went wrong: user not found")
      next();
    } else {
      getNFTCollection().then(NFTs => {
        NFTs.map(NFT => {
          if(NFT.normalized_metadata !== null){
            const id = mongoose.Types.ObjectId
            const newNFT = {
              id,
              name: NFT.name,
              address: NFT.token_address,
              balance: "$0",
              image: NFT.normalized_metadata.image,
            };
            
            user.nfts.push(newNFT);
          }
          
        })
        user.save();
      })

      res.json({message: "NFT Collection Added"});
    }

});

  router.get("/nfts/:username", async (req, res) => {
    const { username } = req.params;

    try{
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log("Something went wrong: user not found:", username);
        next();
      }

      res.json(user.nfts)

    } catch (error){
      console.error("Error fetching nfts:", error);
      res
        .status(500)
        .json({ message: "Error fetching portfolio nfts" });
    }
  })

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
