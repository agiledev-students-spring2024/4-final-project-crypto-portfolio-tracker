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
    faWallet,
} from '@fortawesome/free-solid-svg-icons'
import '../css/styles.css'

const Menu = () => {
    const jwtToken = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

    const User = ({ status }) => {
        if (status) {
            return (
                <Link
                    to="/profile"
                    className="flex h-full w-1/4 flex-col items-center justify-center font-medium"
                >
                    <FontAwesomeIcon icon={faUser} className="mb-2 text-3xl" />
                    <p className="text-sm"> Profile </p>
                </Link>
            )
        } else {
            return (
                <Link
                    to="/login"
                    className="flex h-full w-1/4 flex-col items-center justify-center font-medium"
                >
                    <FontAwesomeIcon
                        icon={faSignInAlt}
                        className="mb-2 text-3xl"
                    />{' '}
                    <p className="text-sm"> Login </p>
                </Link>
            )
        }
    }

    return (
        <div className="fixed bottom-0 z-50 flex h-28 w-full flex-row items-center justify-evenly rounded-t-lg dark:bg-[#19294D]">
            <Link
                to="/"
                className="flex h-full w-1/4 flex-col items-center justify-center font-medium"
            >
                <FontAwesomeIcon icon={faHome} className="mb-2 text-3xl" />
                <p className="text-sm"> Home </p>
            </Link>
            <Link
                to="/portfolio"
                className="flex h-full w-1/4 flex-col items-center justify-center font-medium"
            >
                <FontAwesomeIcon icon={faWallet} className="mb-2 text-3xl" />
                <p className="text-sm"> Portfolio </p>
            </Link>

            <Link
                to="/cryptolist"
                className="flex h-full w-1/4 flex-col items-center justify-center font-medium"
            >
                <FontAwesomeIcon
                    icon={faArrowTrendUp}
                    className="mb-2 text-3xl"
                />{' '}
                <p className="text-sm"> CryptoList</p>
            </Link>

            <User status={isLoggedIn} />
        </div>
    )
}

export default Menu
