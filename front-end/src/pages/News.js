import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import '../css/styles.css'

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
        <div className="news-container">
            <div className="news-header">
                <h2 className="news-title">Latest News</h2>
            </div>
            <div className="h-[28rem] overflow-y-auto p-3 mt-8">
                <div className="overflow-y-auto">
                    {data.map((item, index) => (
                        <ListItem
                            url={item.url}
                            title={item.title}
                            thumbnail={item.thumbnail}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const ListItem = ({ url, title, description, thumbnail }) => (
    <a href={url}>
        <button className="my-1 block w-full rounded-lg bg-white from-pink-500 to-orange-500 p-4 text-black shadow-2xl hover:bg-gradient-to-r hover:text-white dark:bg-dark-blue dark:text-white ">
            {/* Content goes here */}

            <div className="flex flex-row">
                <div className="flex flex-col space-y-4">
                    <img src={thumbnail} />
                    <p className="font-bold">{title}</p>
                </div>
            </div>
        </button>
    </a>
)

export default News