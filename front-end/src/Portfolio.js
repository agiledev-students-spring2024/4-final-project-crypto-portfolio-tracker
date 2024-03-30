import React, { useState, useEffect } from 'react'
import Header from './Header'
import './Portfolio.css'
// REQUIRES INSTALLATION OF Recharts Library.
// Use command 'npm install recharts' for use
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

// For column graph if needed to rollback
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Portfolio = () => {
    const [showPortfolios, setShowPortfolios] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [bitcoinAddress, setBitcoinAddress] = useState('')
    // State for the list of assets and new asset inputs
    const [portfolioAssets] = useState([
        { id: 1, name: 'BTC', amount: 0.5, value: 701.03 },
        { id: 2, name: 'ETH', amount: 1, value: 391.16 },
        { id: 3, name: 'SOL', amount: 2, value: 129.41 },
        { id: 4, name: 'BCH', amount: 1, value: 452.89 },
        { id: 5, name: 'ETC', amount: 10, value: 35.11 },
    ])

    // Mockup data for the existing portfolios gonna make this come from backend later
    const portfolios = [
        {
            id: 'portfolio-1',
            name: 'Coinbase',
            balance: '$557',
            address: '0xa177...5e38',
        },
        // ... other portfolios
    ]

    // Function to handle adding new wallet or exchange
    const handleAddWalletOrExchange = async (e) => {
        e.preventDefault()

        const walletData = { address: bitcoinAddress }
        try {
            // POST request to the back-end with the Bitcoin address
            const response = await fetch('/api/addWallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(walletData),
            })

            const responseData = await response.json()

            console.log(responseData)
        } catch (error) {
            console.error('Error posting wallet data:', error)
        }

        // Reset the bitcoin address input and close the modal
        setBitcoinAddress('')
        setShowAddModal(false)
    }
    const togglePortfolios = () => setShowPortfolios(!showPortfolios)
    const toggleAddModal = () => setShowAddModal(!showAddModal)

    // Calculate total value for the portfolio
    const totalValue = portfolioAssets.reduce(
        (acc, asset) => acc + asset.amount * parseFloat(asset.value),
        0
    )

    // Map the data to include a percentage value for the pie chart
    const pieData = portfolioAssets.map((asset) => ({
        name: asset.name,
        value: ((asset.amount * parseFloat(asset.value)) / totalValue) * 100,
    }))

    // Define colors for the pie chart
    const COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347']

    return (
        <div className="portfolio-container">
            <Header></Header>
            <div className="portfolio-content">
                {/* All Portfolios Button */}
                <button
                    className="all-portfolios-button"
                    onClick={togglePortfolios}
                >
                    All Portfolios
                </button>

                {/* Portfolios List */}
                {showPortfolios && (
                    <div className="portfolios-list">
                        {portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="portfolio-item">
                                <span>{portfolio.name}</span>
                                <span>{portfolio.balance}</span>
                                <span>{portfolio.address}</span>
                            </div>
                        ))}
                        <button
                            className="add-wallet-exchange-button"
                            onClick={toggleAddModal}
                        >
                            Add Wallet/Exchange
                        </button>
                    </div>
                )}

                {/* Add Wallet/Exchange Modal */}
                {showAddModal && (
                    <div className="modal">
                        <div className="modal-background">
                            <div className="modal-content">
                                <span
                                    className="modal-close-button"
                                    onClick={toggleAddModal}
                                >
                                    &times;
                                </span>
                                <h2>Add Wallet or Exchange</h2>
                                <form onSubmit={handleAddWalletOrExchange}>
                                    <input
                                        type="text"
                                        name="bitcoinAddress"
                                        placeholder="Bitcoin Wallet Address"
                                        value={bitcoinAddress}
                                        onChange={(e) =>
                                            setBitcoinAddress(e.target.value)
                                        }
                                    />
                                    <button type="submit">Add Wallet</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            /* Coinbase connect logic  will go here*/
                                        }}
                                    >
                                        Add Coinbase Exchange
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="portfolio-graph">
                    <h2>Portfolio Composition</h2>
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
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => `${value.toFixed(2)}%`}
                            />
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
                            <div
                                key={asset.id}
                                className="portfolio-asset-item"
                            >
                                <span>{asset.name}</span>
                                <span>{asset.amount}</span>
                                <span>${asset.value.toFixed(2)}</span>
                                <span>
                                    ${(asset.amount * asset.value).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Needed for charting
const RADIAN = Math.PI / 180
const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
}) => {
    const radius = outerRadius + 10 // Label position outside the outerRadius
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <g>
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {name}
            </text>
            <text
                x={x}
                y={y + 20}
                fill="#fff"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    )
}

export default Portfolio