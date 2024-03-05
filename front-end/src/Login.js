import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles.css'

const Login = (props) => {
    return (
        <div className="container flex h-screen w-screen items-center justify-center dark:bg-zinc-900 dark:text-white">
            <div className="container flex flex-col items-center">
                <h1 className="my-5 mb-8 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Login
                </h1>

                <input
                    className="my-4 border-b-4 p-4 dark:border-primary dark:bg-black"
                    type="text"
                    name="username"
                    placeholder="username"
                />
                <input
                    className="my-4 border-b-4 p-4 dark:border-primary dark:bg-black"
                    type="password"
                    name="password"
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

                <Link to="/">
                    <button className="bg-secondary mt-8 rounded bg-orange-light px-12 py-3 font-bold text-white dark:bg-orange-dark dark:text-black">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Login
