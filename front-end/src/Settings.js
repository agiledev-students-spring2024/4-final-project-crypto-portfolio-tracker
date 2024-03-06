import React, { useState } from 'react';
import './styles.css';
import Header from './Header';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`p-4 ${darkMode ? 'dark' : ''}`}>
        <Header></Header>
        <br></br>
      <div className="flex justify-between items-center mb-4 text-md font-medium">
        Dark Mode
        <div className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${darkMode ? 'bg-orange-400 justify-end' : 'justify-start'}`}
             onClick={toggleDarkMode}>
          <div className="bg-white w-6 h-6 rounded-full shadow-md"></div>
        </div>
      </div>

      <div>
        <label htmlFor="currency-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
        <select id="currency-select" className="form-select block w-full p-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <option>🇺🇸 USD</option>
          <option>🇪🇺 EUR</option>
          <option>🇬🇧 GBP</option>
          <option>BTC</option>
          {/* TODO: add more currencies */}
        </select>
      </div>
    </div>
  );
};

export default Settings;

