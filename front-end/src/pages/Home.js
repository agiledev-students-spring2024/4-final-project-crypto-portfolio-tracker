import React, { useState, useEffect } from 'react'
import '../css/styles.css'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Dashboard from '../components/Dashboard'
import News from './News'

const Home = (props) => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/register?email=${encodeURIComponent(email)}`)
    }

    //User Authentication
    const jwtToken = localStorage.getItem('token') // the JWT token, if we have already received one and stored it in localStorage
    const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false
    const user = (isLoggedIn) ? jwtDecode(jwtToken) : " "

    const navigate = useNavigate()

    // try to load the protected data from the server when this component first renders
    useEffect(() => {
        // send the request to the server api, including the Authorization header with our JWT token in it
        axios
            .get(`http://localhost:5000/api/protected/`, {
                headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
            })
            .then((res) => {
                setResponse(res.data) // store the response data
                console.log(response)
            })
            .catch((err) => {
                console.log(
                    'The server rejected the request for this protected resource... we probably do not have a valid JWT token.'
                )
                setIsLoggedIn(false) // update this state variable, so the component re-renders
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoggedIn && response.success) {
        return (
            <div className="flex h-screen flex-col bg-white text-black dark:bg-alt-blue dark:text-white">
                <Header />

                <Dashboard />

                <News />

            </div>
        )
    } else
        return (
            <div className="flex min-h-screen flex-col bg-white text-black dark:bg-alt-blue dark:text-white">
                <Header />
                <div className="mt-16 flex flex-col items-center px-6 py-12">
                    <h1 className="mb-4 text-4xl font-bold">
                        Jump start your crypto portfolio{' '}
                    </h1>
                    <p className="mb-8 text-lg">
                        CryptoTracker is the easiest place to track your cryptos
                        in one place. Sign up and get started today.
                    </p>
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                        <div className="mb-6 flex flex-col items-stretch">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="mb-4 rounded-md px-4 py-3 text-black"
                            />
                            <button
                                type="submit"
                                className="hover:bg-oragne-dark w-full rounded-md bg-orange-light py-3 font-bold text-white transition duration-300"
                            >
                                Sign Up
                            </button>
                            <p className="mb-8 py-2 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
}

export default Home
