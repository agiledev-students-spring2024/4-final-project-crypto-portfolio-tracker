import React from 'react'
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import '../css/styles.css'

const Header = () => {
    return (
        <header className="header w-full bg-white shadow-md dark:bg-alt-blue">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <div className="flex items-center">
                    <div className="md:hidden">
                        <Hamburger />
                    </div>
                    <Link
                        to="/"
                        className="logo-gradient ml-4 text-xl font-bold"
                    >
                        CryptoTracker
                    </Link>
                </div>
                <ul className="hidden flex-1 items-center justify-center space-x-4 md:flex">
                    <li>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/portfolio"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            My Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cryptolist"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Cryptocurrencies
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/news"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            News
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
