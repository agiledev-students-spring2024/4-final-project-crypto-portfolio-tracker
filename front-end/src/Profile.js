import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import './styles.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const Profile = (props) => {
    //User Authentication
    const jwtToken = localStorage.getItem('token') // the JWT token, if we have already received one and stored it in localStorage
    const user = jwtDecode(jwtToken)
    const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/')
    }

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

    if (isLoggedIn)
        return (
            <div className=" h-screen bg-white text-black dark:bg-alt-blue dark:text-white">
                <Header />
                <div className="pt-36 flex flex-col items-center justify-center ">
                    <h1 className="my-5 mb-8 text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                        Profile
                    </h1>

                    <p className="text-2xl font-extrabold">@{user.username}</p>

                    <form className="flex flex-col items-center" onSubmit="">
                        <input
                            className="my-2 mt-6 rounded-md border-b-4 p-4 dark:text-black"
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                        <input
                            className="my-2 rounded-md border-b-4 p-4 dark:text-black"
                            type="email"
                            name="email"
                            placeholder="Email address"
                        />
                        <input
                            className="my-2 rounded-md border-b-4 p-4 dark:text-black"
                            type="text"
                            name="password"
                            placeholder="Password"
                        />

                        <div className="flex flex-row space-x-3">
                            <button
                                type="submit"
                                className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-10 py-3 font-bold text-white"
                            >
                                Submit
                            </button>
                            <button
                                className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-10 py-3 font-bold text-white"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    else return navigate('/login')
}

export default Profile
