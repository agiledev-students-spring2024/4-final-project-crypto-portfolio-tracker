import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import './styles.css'

const News = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/news')
                const jsonData = await response.json()
                setData(jsonData.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchNews()
    }, [])

    return (
        <div className="container mx-auto h-screen w-screen p-4 dark:bg-dark-blue dark:text-white">
            <div className="text-center">
                <Header></Header>
                <div className="mx-1">
                    <h1 className="my-2 text-2xl font-extrabold">News</h1>
                    <div className="bg-gray-300 p-4">
                        <div className="h-screen overflow-y-auto">
                            {data.map((item, index) => (
                                <ListItem
                                    url={item.url}
                                    title={item.title}
                                    description={item.description}
                                    thumbnail={item.thumbnail}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ListItem = ({ url, title, description, thumbnail }) => (
    <a href={url}>
        <button className="my-1 block w-full rounded-lg bg-white from-pink-500 to-orange-500 p-4 text-black shadow-md hover:bg-gradient-to-r hover:text-white">
            {/* Content goes here */}

            <div className="flex flex-row">
                <div className="flex flex-col">
                    <p className="font-bold">{title}</p>
                    <p className="font-small">{description}</p>
                </div>
            </div>
        </button>
    </a>
)

export default News
