import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'
import './CryptoList.css'

const CryptoList = props => {
    // Mock data for cryptocurrency list, will need to make this dynamic later
    const initialCryptoList = [
        { id: 1, name: 'Bitcoin', price: '$67,571.03' },
        { id: 2, name: 'Ethereum', price: '$3,591.16' },
        { id: 3, name: 'Tether', price:  '$1.005' },
        { id: 4, name: 'BNB', price:  '$414.27' },
        { id: 5, name: 'Solana', price:  '$128.88' },
        { id: 6, name: 'XRP', price:  '$0.6474' },
        { id: 7, name: 'Lido Staked Ether', price:  '$3,582.16' },
        { id: 8, name: 'USDC',price: '$1' },
        { id: 9, name: 'Cardano', price:  '$0.766' },
        { id: 10, name: 'Dogecoin', price:  '$0.1753' },
        
    ];

    // State for the filtered list
    const [filteredCryptoList, setFilteredCryptoList] = useState(initialCryptoList);
    // State for the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearchChange = event => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        // Filter the crypto list based on the search query
        const filteredList = initialCryptoList.filter(crypto =>
            crypto.name.toLowerCase().includes(query)
        );
        setFilteredCryptoList(filteredList);
    };

    return (
        <div className="crypto-list-container">
            <Header></Header>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="crypto-list">
                {filteredCryptoList.map(crypto => (
                    <div key={crypto.id} className="crypto-item">
                        <span className="crypto-name">{crypto.name}</span>
                        <span className="crypto-price">{crypto.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CryptoList;