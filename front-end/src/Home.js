import React, { useState } from 'react';
import './styles.css';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
      <div className="flex flex-col min-h-screen bg-dark-blue text-white">
        <Header />
    
        <div className="flex flex-col items-center px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Jump start your crypto portfolio </h1>
          <p className="text-lg mb-8">CryptoTracker is the easiest place to track your cryptos in one place. Sign up and get started today.</p>
          <form className="w-full max-w-md">
            <div className="flex flex-col items-stretch mb-6">
              <input 
                type="email" 
                placeholder="Email address"
                className="px-4 py-3 mb-4 rounded-md text-black"
              />
              <button 
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 rounded-md transition duration-300"
              >
                <Link to="/register">Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default Home;