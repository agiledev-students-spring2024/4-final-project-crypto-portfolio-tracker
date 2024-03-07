import React, { useState } from 'react'
import './styles.css'
import Header from './Header'

const About = (props) => {
    return (
        <div className="flex min-h-screen flex-col bg-white text-black dark:bg-dark-blue dark:text-white">
            <Header />
            <div className="flex flex-col items-center px-6 py-12">
                <h1 className="mb-4 text-4xl font-bold">About Us </h1>
                <br></br>
                <p className="mb-8 text-lg">
                    The Crypto Portfolio Tracker and Analyzer aims to empower
                    individual crypto investors by providing a comprehensive and
                    intuitive platform to track and analyze the performance of
                    their cryptocurrency investments. In the fast-paced and
                    volatile crypto market, staying informed is key to making
                    educated investment decisions. Our application addresses
                    this need by offering real-time market data, insightful
                    analysis, and user-friendly data visualization to cater to
                    both novice and experienced traders.
                </p>
            </div>
        </div>
    )
}

export default About
