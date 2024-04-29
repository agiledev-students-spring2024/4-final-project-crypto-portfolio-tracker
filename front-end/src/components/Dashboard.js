import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import '../css/styles.css'

import { jwtDecode } from 'jwt-decode'

const Dashboard = (props) => {
    //User Authentication
    const jwtToken = localStorage.getItem('token') // the JWT token, if we have already received one and stored it in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

    const user = (isLoggedIn) ? jwtDecode(jwtToken) : " "

        return (
                    <div
                        className="mt-24 mx-3 flex flex-col items-center rounded-2xl p-8 shadow-2xl dark:bg-dark-blue"
                    >
                        <h1 className="my-5 mb-8 text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                            Dashboard
                        </h1>


                        <div className="flex flex-row space-x-3">
                            <Link to="/portfolio">
                            <button
                                className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-10 py-3 font-bold text-white"
                            >
                                View Portfolio
                            </button>
                            </Link>
                        </div>

                    </div>
        )
}

export default Dashboard
