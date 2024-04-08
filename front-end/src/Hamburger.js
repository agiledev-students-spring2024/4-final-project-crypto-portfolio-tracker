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
import './styles.css'

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const jwtToken = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

    const User = ({ status }) => {
        if (status) {
            return (
                <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                </Link>
            )
        } else {
            return (
                <Link
                    to="/login"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />{' '}
                    Login
                </Link>
            )
        }
    }

    return (
        <div className="relative md:hidden">
            <button
                onClick={toggleMenu}
                className="absolute left-0 top-0 z-30 text-xl"
            >
                <FontAwesomeIcon
                    icon={isOpen ? faXmark : faBars}
                    style={{ fontSize: '32px' }}
                />
            </button>
            <div
                className={`fixed left-0 top-[50px] h-full w-2/3 bg-white p-5 transition-transform duration-300 ease-in-out dark:bg-dark-blue ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } z-20`}
            >
                <Link
                    to="/"
                    className="flex items-center px-4 py-2 pl-6 pt-4 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
                </Link>
                <User status={isLoggedIn} />
                <Link
                    to="/portfolio"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> My
                    Portfolio
                </Link>
                <Link
                    to="/cryptolist"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faArrowTrendUp} className="mr-2" />{' '}
                    Cryptocurrencies
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                </Link>
                <Link
                    to="/news"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> News
                </Link>
                <Link
                    to="/about"
                    className="flex items-center px-4 py-2 pl-6 text-lg font-medium"
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
