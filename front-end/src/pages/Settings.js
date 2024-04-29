import React, { useState } from 'react'
import '../css/styles.css'
import Header from '../components/Header'

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div
            className={`min-w-screen min-h-screen p-4 ${darkMode ? 'dark' : ''} dark:bg-dark-blue dark:text-white `}
        >
            <Header></Header>
            <br></br>
            <div className="text-md mb-4 flex items-center justify-between font-medium">
                Dark Mode
                <div
                    className={`flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-300 p-1 ${darkMode ? 'justify-end bg-orange-400' : 'justify-start'}`}
                    onClick={toggleDarkMode}
                >
                    <div className="h-6 w-6 rounded-full bg-white shadow-md"></div>
                </div>
            </div>

            <div>
                <label
                    htmlFor="currency-select"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Currency
                </label>
                <select
                    id="currency-select"
                    className="form-select m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat p-2 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                >
                    <option>🇺🇸 USD</option>
                    <option>🇪🇺 EUR</option>
                    <option>🇬🇧 GBP</option>
                    <option>BTC</option>
                    {/* TODO: add more currencies */}
                </select>
            </div>
        </div>
    )
}

export default Settings
