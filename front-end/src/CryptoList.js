import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'
import './CryptoList.css'


const CryptoList = () => {

    // State management for Crypto data, Search-filtered data, Search query, and Pagination
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredCryptoData, setFilteredCryptoData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect to fetch Crypto data based on page number
    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(`https://api.coincap.io/v2/assets?limit=100&offset=${(currentPage - 1) * 100}`);
                const json = await response.json();
                setCryptoData(json.data);
                setFilteredCryptoData(json.data);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };
        fetchCryptoData();
    }, [currentPage]); // Re-runs when currentPage changes

    // Filters data from search query
    useEffect(() => {
        const filteredList = cryptoData.filter(crypto =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCryptoData(filteredList);
    }, [searchQuery, cryptoData]); // Re-runs when searchQuery or cryptoData changes


    // Pagination Start
    const handleNextPage = () => setCurrentPage(currentPage < 5 ? currentPage + 1 : 5);
    const handlePreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

    const renderChangePercent = (crypto) => {
        if (!crypto.changePercent24Hr) {
            return ''; // or some default value you want to show
        }
        return parseFloat(crypto.changePercent24Hr).toFixed(2) + '%';
    };

    return (
        <div className="crypto-list-container">
            <Header />
            <div className="title-container">
                <h1>Today's Crypto Prices</h1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                    </tr>
                </thead>
                <tbody>
                {filteredCryptoData.map((crypto, index) => (
                    <tr key={crypto.id}>
                        <td>{index + 1 + ((currentPage - 1) * 100)}</td>
                        <td>
                            <img
                                src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                                alt={crypto.name}
                                className="crypto-icon"
                            />
                            {crypto.name}
                        </td>
                        <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                        <td style={{ color: crypto.changePercent24Hr.startsWith('-') ? 'red' : 'green' }}>
                        {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                        </td>
                        <td style={{ 
                            color: crypto.changePercent24Hr && crypto.changePercent24Hr.startsWith('-') ? 'red' : 'green'
                        }}>
                            {renderChangePercent(crypto)}
                        </td>
                    </tr>
                ))}
        </tbody>
            </table>
            <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>

            {/* Display current page number */}
            <span>Page {currentPage} of 5</span> 

            <button 
                onClick={handleNextPage} 
                disabled={currentPage === 5} // Disable button on the 5th page
                style={{ 
                    backgroundColor: currentPage === 5 ? '#ccc' : '', // Style to grey out button
                    cursor: currentPage === 5 ? 'default' : 'pointer', // Style to change cursor
                }}
            >
                Next
            </button>
        </div>
        </div>
    );
};

export default CryptoList;