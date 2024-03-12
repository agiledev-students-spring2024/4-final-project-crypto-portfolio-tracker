import React, { useState } from 'react'
import './styles.css'
import Header from './Header'
import { Link } from 'react-router-dom'

const Home = (props) => {
    return (
        <div className="flex min-h-screen flex-col bg-white text-black dark:bg-dark-blue dark:text-white">
            <Header />
            <div className="flex flex-col items-center px-6 py-12">
                <h1 className="mb-4 text-4xl font-bold">
                    Jump start your crypto portfolio{' '}
                </h1>
                <p className="mb-8 text-lg">
                    CryptoTracker is the easiest place to track your cryptos in
                    one place. Sign up and get started today.
                </p>
                <form className="w-full max-w-md">
                    <div className="mb-6 flex flex-col items-stretch">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="mb-4 rounded-md px-4 py-3 text-black"
                        />
                        <Link to="/register" className="block text-center">
                            <button className="hover:bg-oragne-dark rounded-md bg-orange-light py-3 font-bold text-white transition duration-300 w-full">
                                Sign Up
                            </button>
                        </Link>
                        <p className="mb-8 text-sm py-2">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home
