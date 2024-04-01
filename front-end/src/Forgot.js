import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'
import './styles.css'

const Forgot = (props) => {
    const [emailInput, setEmail] = useState('')

    const handleForgot = async (e) => {
        e.preventDefault()

        const forgotInput = {
            email: emailInput,
        }

        try {
            // POST request to the back-end with the Login
            const response = await fetch(
                'http://localhost:5000/api/forgot_password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(forgotInput),
                }
            )

            const responseData = await response.json()
            console.log(responseData)
        } catch (error) {
            console.error('Error posting forgot password data:', error)
        }

        setEmail('')
    }
    return (
        <div className="flex min-h-screen flex-col bg-white text-black dark:bg-dark-blue dark:text-white">
            <Header />

            <div className="flex flex-col items-center py-40">
                <h1 className="my-5 mb-8 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    New Password
                </h1>

                <p className="w-48 text-sm">
                    {' '}
                    Please enter the email you used to create your account{' '}
                </p>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleForgot}
                >
                    <input
                        className="my-4 rounded-md border-b-4 p-4 dark:text-black"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={emailInput}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-secondary hover:bg-oragne-dark mt-8 rounded bg-orange-light px-12 py-3 font-bold text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Forgot
