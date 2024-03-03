import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles.css'

const Login = props => {
    return (
        <div className="container flex justify-center items-center h-screen w-screen">
            <div className="container flex flex-col items-center">
                <h1 className="mb-8 my-5 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Login
                </h1>
                
                <input className="p-4 my-4 border-b-4" type="text" name="username" placeholder="username" />
                <input className="p-4 my-4 border-b-4" type="text" name="password" placeholder="password" />

                <div className="container flex flex-row justify-center items-center mt-5">
                    <Link to="/register">
                        <p className="mr-3"> Register </p>
                    </Link>
                    <Link to="/forgot_password">
                        <p className="ml-3"> Forgot Password? </p>
                    </Link>
                </div>
                
                <Link to="/">
                    <button className="bg-black text-white font-bold mt-8 py-3 px-12 rounded">
                        Login
                    </button>
                </Link>
                
            </div>
        </div> 
    );
}

export default Login;
