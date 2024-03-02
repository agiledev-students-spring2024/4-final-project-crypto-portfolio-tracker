import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles.css'

const Register = props => {
    return (
        <div className="container flex justify-center items-center h-screen w-screen">
            <div className="container flex flex-col items-center">
                <h1 className="mb-8 my-5 flex justify-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Register
                </h1>

                <input className="p-4 my-4 border-b-4" type="text" name="name" placeholder="name" />
                <input className="p-4 my-4 border-b-4" type="text" name="email" placeholder="email" />
                <input className="p-4 my-4 border-b-4" type="text" name="username" placeholder="username" />
                <input className="p-4 my-4 border-b-4" type="text" name="password" placeholder="password" />
                
                <Link to="/">
                    <button className="bg-black text-white font-bold mt-8 py-3 px-12 rounded">
                        Submit
                    </button>
                </Link>
                
            </div>
        </div> 
    );
}

export default Register;
