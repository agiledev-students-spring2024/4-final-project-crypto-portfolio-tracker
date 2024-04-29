import React, { useState, useEffect } from 'react'
import {
    useNavigate,
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import Header from '../components/Header'
import '../css/CryptoList.css'
import '../css/styles.css'

const CryptoList = () => {
    // State management for Crypto data, Search-filtered data, Search query, and Pagination
    const [cryptoData, setCryptoData] = useState([])
    const [filteredCryptoData, setFilteredCryptoData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Favorite CryptoList
    const [favorites, setFavorites] = useState([]);
    // Mock state to simulate user sign-in status - this would normally come from your app's auth state
    const [isUserSignedIn, setIsUserSignedIn] = useState(false); // default to false, set to true when user is signed in
    // Sorting functionalities
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });



    // useEffect to fetch Crypto data based on page number
    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(
                    `https://api.coincap.io/v2/assets?limit=100&offset=${(currentPage - 1) * 100}`
                )
                const json = await response.json()
                setCryptoData(json.data)
                setFilteredCryptoData(json.data)
            } catch (error) {
                console.error('Error fetching crypto data:', error)
            }
        }
        fetchCryptoData()
    }, [currentPage]) // Re-runs when currentPage changes

    // Filters data from search query
    useEffect(() => {
        let sortedData = [...cryptoData];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'priceUsd') {
                    aValue = parsePrice(aValue);
                    bValue = parsePrice(bValue);
                } else if (sortConfig.key === 'changePercent24Hr') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredCryptoData(sortedData);
      }, [cryptoData, sortConfig]);

    // Pagination Start
    const handleNextPage = () =>
        setCurrentPage(currentPage < 5 ? currentPage + 1 : 5)
    const handlePreviousPage = () =>
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)

    const renderChangePercent = (crypto) => {
        if (!crypto.changePercent24Hr) {
            return '' // or some default value you want to show
        }
        return parseFloat(crypto.changePercent24Hr).toFixed(2) + '%'
    }

    // Favorite Crypto List
    const toggleFavorite = (cryptoId) => {
        if (!isUserSignedIn) {
            alert("You must be a registered user to add a Cryptocurrency to your Favorites. Please log into your account and try again!");
            return;
        }
        if (favorites.includes(cryptoId)) {
            // Remove from favorites
            setFavorites(favorites.filter((id) => id !== cryptoId));
        } else {
            // Add to favorites
            setFavorites([...favorites, cryptoId]);
        }
    };


    const renderStarIcon = (cryptoId) => {
        const isFavorite = favorites.includes(cryptoId);
        return (
            <button 
                className={`star-button ${isFavorite ? 'filled' : 'empty'}`}
                onClick={(event) => {
                    event.stopPropagation(); // Prevent row click event
                    toggleFavorite(cryptoId);
                }}
                aria-label={isUserSignedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Sign in to add to favorites"}
            >
                {isFavorite ? '★' : '☆'}
            </button>
        );
    };

    // Formats too large numbers
    const formatPrice = (price) => {
        const numPrice = parseFloat(price);

        // Check if the price is in the thousands or more
        if (numPrice >= 10000) {
          // Round to the nearest 1,000 and add the 'K' suffix
          return (numPrice / 1000).toFixed(2) + 'K';
        } else {
          // Format with commas for thousands, hundreds, and smaller
          return numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      };

    // Sort function
    const requestSort = (key) => {
    let direction = 'ascending';
    if (
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
    ) {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
    };

    const parsePrice = (price) => {
        if (price.toLowerCase().endsWith('k')) {
          return parseFloat(price) * 1000; // Convert back to full number
        }
        return parseFloat(price.replace(/,/g, '')); // Remove commas and convert to float
    };


    return (
        <div className="container">
            <Header />
            <div className="crypto-list-container">
                <div className="title-container">
                    <h1>Crypto Prices</h1>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('#')}>#</th>
                            <th onClick={() => requestSort('name')}>Name</th>
                            <th onClick={() => requestSort('priceUsd')}>Price</th>
                            <th onClick={() => requestSort('changePercent24Hr')}>24h %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCryptoData.map((crypto, index) => (
                            <tr key={crypto.id} >
                                <td>{index + 1 + (currentPage - 1) * 100}</td>
                                <td>
                                    <div className="flex flex-row align-items-center">
                                        <img
                                            src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                                            alt={crypto.name}
                                            className="crypto-icon"
                                        />
                                        {crypto.name}
                                        {renderStarIcon(crypto.id)} {/* Star icon next to the name */}
                                    </div>
                                </td>
                                <td>
                                    ${formatPrice(crypto.priceUsd)}
                                </td>
                                <td
                                    style={{
                                        color: crypto.changePercent24Hr.startsWith('-')
                                            ? 'red'
                                            : 'green',
                                    }}
                                >
                                    {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
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
        </div>
    )
}

export default CryptoList