import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'
import './styles.css'

const Login = (props) => {
    const [usernameInput, setUsername] = useState('')
    const [passwordInput, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        const loginInput = {
            username: usernameInput,
            password: passwordInput,
        }

        try {
            // POST request to the back-end with the Login
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInput),
            })

            const responseData = await response.json()
            console.log(responseData)
        } catch (error) {
            console.error('Error posting login data:', error)
        }

        setUsername('')
        setPassword('')
    }
    return (
        <div className="flex min-h-screen flex-col bg-white text-black dark:bg-dark-blue dark:text-white">
            <Header />
            <div className="flex flex-col items-center py-40">
                <h1 className="my-5 mb-8 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Login
                </h1>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleLogin}
                >
                    <input
                        className="my-4 rounded-md border-b-4 p-4 dark:text-black"
                        type="text"
                        name="username"
                        value={usernameInput}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                    <input
                        className="dark:border-primary my-4 rounded-md border-b-4 p-4 dark:text-black"
                        type="password"
                        name="password"
                        value={passwordInput}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />

                    <div className="container mt-5 flex flex-row items-center justify-center">
                        <Link to="/register">
                            <p className="mr-3"> Register </p>
                        </Link>
                        <Link to="/forgot_password">
                            <p className="ml-3 dark:text-orange-dark">
                                {' '}
                                Forgot Password?{' '}
                            </p>
                        </Link>
                    </div>
                    <button
                        className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-12 py-3 font-bold text-white"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
