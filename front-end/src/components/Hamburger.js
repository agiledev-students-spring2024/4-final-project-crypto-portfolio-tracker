import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faXmark,
    faHome,
    faSignInAlt,
    faCog,
    faInfoCircle,
    faBriefcase,
    faNewspaper,
    faArrowTrendUp,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import '../css/styles.css'

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)

    const jwtToken = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we have a JWT token, set this to true

    const User = ({ status }) => {
        return status ? (
            <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </Link>
        ) : (
            <Link
                to="/login"
                className="flex items-center px-4 py-2 text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
            </Link>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="relative text-3xl text-black dark:text-white"
            >
                <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
            </button>
            <div
                className={`fixed left-0 top-[4rem] h-[calc(100%-4rem)] w-2/3 bg-white pl-5 pt-5 text-black transition-transform duration-300 ease-in-out dark:bg-alt-blue dark:text-white ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ zIndex: 30 }} 
            >
                <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
                </Link>
                <User status={isLoggedIn} />
                <Link
                    to="/portfolio"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> My
                    Portfolio
                </Link>
                <Link
                    to="/cryptolist"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faArrowTrendUp} className="mr-2" />{' '}
                    Cryptocurrencies
                </Link>
                <Link
                    to="/about"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />{' '}
                    About
                </Link>
            </div>
        </div>
    )
}

export default Hamburger
