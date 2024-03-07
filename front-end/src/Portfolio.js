import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'
import './Portfolio.css'
// REQUIRES INSTALLATION OF Recharts Library.
// Use command 'npm install recharts' for use
import { PieChart, Pie, Cell, Text, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// For column graph if needed to rollback
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Portfolio = () => {
    // State for the list of assets and new asset inputs
    const [portfolioAssets, setPortfolioAssets] = useState([
      { id: 1, name: 'BTC', amount: 0.5, value: 701.03 },
      { id: 2, name: 'ETH', amount: 1, value: 391.16 },
      { id: 3, name: 'SOL', amount: 2, value: 129.41 },
      { id: 4, name: 'BCH', amount: 1, value: 452.89 },
      { id: 5, name: 'ETC', amount: 10, value: 35.11 },
    ]);
    const [newAsset, setNewAsset] = useState({ name: '', amount: '', value: '' });
  
    // Add a new asset to the portfolio
    const addNewAsset = (e) => {
      e.preventDefault();
      const updatedAssets = [
        ...portfolioAssets,
        {
          id: portfolioAssets.length + 1,
          name: newAsset.name,
          amount: Number(newAsset.amount),
          value: Number(newAsset.value),
        },
      ];
      setPortfolioAssets(updatedAssets);
      setNewAsset({ name: '', amount: '', value: '' }); // Reset form
    };
  
    // Calculate total value for the portfolio
    const totalValue = portfolioAssets.reduce(
        (acc, asset) => acc + (asset.amount * parseFloat(asset.value)),
        0
    );
  
    // Map the data to include a percentage value for the pie chart
    const pieData = portfolioAssets.map((asset) => ({
      name: asset.name,
      value: ((asset.amount * parseFloat(asset.value)) / totalValue) * 100,
    }));
  
    // Define colors for the pie chart
    const COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347'];
  
    return (
        <div className="portfolio-container">
            <Header></Header>
            <div className="portfolio-content">
            <div className="portfolio-graph">
                <h2>Portfolio Performance Graph</h2>
                    <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80} // Adjust radius if necessary
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={renderCustomLabel}
                            labelLine={false} // Hide label lines if they clutter the chart
                            >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>

                        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                        <Legend />
                    </PieChart>
                    </ResponsiveContainer>
            </div>
            <div className="my-portfolio">
                <h2>My Portfolio</h2>
                    <div className="portfolio-assets">
                        <div className="portfolio-asset-header">
                            <span>Coin</span>
                            <span>Number</span>
                            <span>Value per Coin</span>
                            <span>Total Value</span>
                        </div>
                        {portfolioAssets.map((asset) => (
                            <div key={asset.id} className="portfolio-asset-item">
                            <span>{asset.name}</span>
                            <span>{asset.amount}</span>
                            <span>${asset.value.toFixed(2)}</span>
                            <span>${(asset.amount * asset.value).toFixed(2)}</span>
                    </div>
                    ))}
            </div>
            <form onSubmit={addNewAsset} className="add-asset-form">
              <input
                type="text"
                placeholder="Coin name"
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Number"
                value={newAsset.amount}
                onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
              />
              <input
                type="number"
                placeholder="Value per Coin"
                value={newAsset.value}
                onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
              />
              <button type="submit">Add Coin</button>
                </form>
                </div>
            </div>
        </div>  
    );
}


// Needed for charting
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = outerRadius + 10; // Label position outside the outerRadius
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <g>
        <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {name}
        </text>
        <text x={x} y={y + 20} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

export default Portfolio;

/*

      <Text
        x={x}
        y={y}
        fill="red" // or any color you want for the labels
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{
          fontSize: '0.8em', // Adjust font size as needed
        }}
      >
        {`${name}: ${(percent * 100).toFixed(2)}%`}
      </Text>

*/