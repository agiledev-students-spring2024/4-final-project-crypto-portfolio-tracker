import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const emailParam = queryParams.get('email')
        if (emailParam) setEmail(decodeURIComponent(emailParam))
    }, [location])

    return (
        <div className="container flex h-screen w-screen items-center justify-center dark:bg-dark-blue dark:text-white">
            <div className="container flex flex-col items-center">
                <h1 className="my-5 mb-8 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Register
                </h1>

                <input
                    className="my-4 border-b-4 p-4 dark:text-black"
                    type="text"
                    name="name"
                    placeholder="name"
                />
                <input
                    className="my-4 border-b-4 p-4 dark:text-black"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="my-4 border-b-4 p-4 dark:text-black"
                    type="text"
                    name="username"
                    placeholder="username"
                />
                <input
                    className="my-4 border-b-4 p-4 dark:text-black"
                    type="text"
                    name="password"
                    placeholder="password"
                />

                <Link to="/">
                    <button className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-12 py-3 font-bold text-white">
                        Submit
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Register
