import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles.css'

const Register = (props) => {
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
                    type="text"
                    name="email"
                    placeholder="email"
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
