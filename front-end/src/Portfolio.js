import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import './styles.css'
import './Portfolio.css'
import PriceHistogram from './PriceHistogram'

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

const Portfolio = () => {
    //User Authentication
    const jwtToken = localStorage.getItem('token') // the JWT token, if we have already received one and stored it in localStorage
    const user = jwtDecode(jwtToken)
    const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

    const navigate = useNavigate()

    useEffect(() => {
        // send the request to the server api, including the Authorization header with our JWT token in it
        axios
            .get(`http://localhost:5000/api/protected/`, {
                headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
            })
            .then((res) => {
                setResponse(res.data) // store the response data

                console.log(response)
            })
            .catch((err) => {
                console.log(
                    'The server rejected the request for this protected resource... we probably do not have a valid JWT token.'
                )
                setIsLoggedIn(false) // update this state variable, so the component re-renders
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    //Portfolio
    const [showPortfolios, setShowPortfolios] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [address, setAddress] = useState('')
    const [walletName, setWalletName] = useState('')
    const [portfolios, setPortfolios] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState('bitcoin') // btc as default
    const [chartData, setChartData] = useState([])

    // make platform IDs to abbreviations
    const cryptoAbbreviations = {
        bitcoin: 'BTC',
        ethereum: 'ETH',
        cardano: 'ADA',
        // add more mappings as we go
    }
    useEffect(() => {
        // fetch portfolio data when ShowPortfolio is true
        const fetchPortfolios = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/portfolios/${user.username}`
                )
                const data = await response.json()
                if (Array.isArray(data)) {
                    setPortfolios(data)
                } else {
                    console.error('Received data is not an array:', data)
                    setPortfolios([])
                }
            } catch (error) {
                console.error('Error fetching portfolio data:', error)
                setPortfolios([])
            }
        }

        fetchPortfolios()
    }, [showPortfolios]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // get data for pie chart composition every time data in backend is updated
        const aggregateData = () => {
            const dataMap = portfolios.reduce((acc, portfolio) => {
                const balanceUSD = parseFloat(
                    portfolio.balance.replace(/[^\d.-]/g, '')
                )
                const abbreviation =
                    cryptoAbbreviations[portfolio.platformId] ||
                    portfolio.platformId.toUpperCase()
                if (acc[abbreviation]) {
                    acc[abbreviation] += balanceUSD
                } else {
                    acc[abbreviation] = balanceUSD
                }
                return acc
            }, {})

            const newData = Object.keys(dataMap).map((key) => ({
                name: key, // Use abbreviation
                value: dataMap[key],
            }))

            setChartData(newData)
        }

        aggregateData()
    }, [portfolios]) // eslint-disable-line react-hooks/exhaustive-deps

    // Function to handle adding new wallet or exchange
    const handleAddWallet = async (e) => {
        e.preventDefault()

        const newPortfolio = {
            username: user.username,
            name: walletName,
            platformId: selectedCurrency,
            address: address,
            balance: '$0', // default value for now
        }
        try {
            // POST request to the back-end with the Bitcoin address
            const response = await fetch(
                `http://localhost:5000/api/addWallet`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPortfolio),
                }
            )

            const responseData = await response.json()
            console.log(responseData)

            // update front end portfolio list
            setPortfolios([...portfolios, newPortfolio])
        } catch (error) {
            console.error('Error posting wallet data:', error)
        }

        setAddress('') // reset the address
        setWalletName('')
        setSelectedCurrency('bitcoin')
        setShowAddModal(false)
        setShowPortfolios(false)
    }

    const handleDeletePortfolio = async (name) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/deleteWallet/${user.username}/${name}`,
                {
                    method: 'DELETE',
                }
            )

            const responseData = await response.json()
            console.log(responseData)
            setPortfolios(portfolios.filter((portfolio) => portfolio.name !== name))
        } catch (error) {
            console.error('Error deleting wallet data:', error)
        }
    }

    const toggleAddModal = () => setShowAddModal(!showAddModal)

    // Define colors for the pie chart
    const COLORS = ['#9B5DE5', '#00F5D4', '#00BBF9', '#21FA90 ', '#F2DD6E']

    if (isLoggedIn)
        return (
            <div className="flex h-screen flex-col items-center overflow-auto bg-white text-black dark:bg-alt-blue dark:text-white">
                <Header />
                <div className="content mt-16 w-full p-5">
                    <div className="portfolio-graph">
                        <h2 className="my-2 text-2xl font-extrabold">
                            Portfolio Composition
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={renderCustomLabel}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="portfolio-graph">
                        <h2 className="my-2 text-2xl font-extrabold">
                            Portfolio Performance
                        </h2>
                        <PriceHistogram currencyId="bitcoin" />
                    </div>
                </div>

                <div className="flex w-fit flex-col items-center px-5 py-2 pb-44 shadow-md">
                    <table className="w-fit overflow-hidden rounded-lg text-left">
                        <thead className="bg-orange-light text-white">
                            <tr>
                                <th className="p-3 font-semibold">Name</th>
                                <th className="p-3 font-semibold">Address</th>
                                <th className="p-3 font-semibold">Balance</th>
                                <th className="p-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="dark:bg-dark-blue">
                            {portfolios.map((portfolio) => (
                                <tr
                                    key={portfolio.id}
                                    className="border-b border-gray-700"
                                >
                                    <td className="p-3">{portfolio.name}</td>
                                    <td className="p-3">{`${portfolio.address.substring(0, 5)}...${portfolio.address.substring(portfolio.address.length - 4)}`}</td>
                                    <td className="p-3">{portfolio.balance}</td>
                                    <td className="p-3">
                                        <button
                                            className="text-s rounded bg-red-500 px-3 py-1 font-medium text-white hover:bg-red-700"
                                            onClick={() =>
                                                handleDeletePortfolio(
                                                    portfolio.name
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="mt-4 rounded bg-orange-light px-4 py-2 font-semibold text-white hover:bg-orange-dark"
                        onClick={toggleAddModal}
                    >
                        Add Wallet/Exchange
                    </button>
                </div>

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
                                <form onSubmit={handleAddWallet}>
                                    <input
                                        type="text"
                                        name="walletName"
                                        placeholder="Portfolio Name"
                                        value={walletName}
                                        onChange={(e) =>
                                            setWalletName(e.target.value)
                                        }
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder={`${selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)} Wallet Address`} // dynamically update placeholder text based off crypto type
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        required
                                    />
                                    <div className="mt-4">
                                        <select
                                            className="block w-11/12 rounded-md border border-gray-300 bg-white px-4 py-2 text-black shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                                            value={selectedCurrency}
                                            onChange={(e) =>
                                                setSelectedCurrency(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="bitcoin">
                                                Bitcoin (BTC)
                                            </option>
                                            <option value="ethereum">
                                                Ethereum (ETH)
                                            </option>
                                            <option value="cardano">
                                                Cardano (ADA)
                                            </option>
                                            {/* we can add more options here*/}
                                        </select>
                                    </div>
                                    <div className="py-2">
                                        <button type="submit">
                                            Add Wallet
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                /* Coinbase connect logic  will go here*/
                                            }}
                                        >
                                            Add Coinbase Exchange
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    else return navigate('/login')
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
