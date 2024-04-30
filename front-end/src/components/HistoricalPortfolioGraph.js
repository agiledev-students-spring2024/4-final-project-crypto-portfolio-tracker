import React, { useState, useEffect } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'

const HistoricalPortfolioGraph = ({ username, range }) => {
    const [historicalData, setHistoricalData] = useState([])

    useEffect(() => {
        generateData()
    }, [range])

    const generateData = () => {
        let data = []
        let currentDate = new Date()
        const totalPoints = range === '24hours' ? 24 : 30
        const decrementAmount = range === '24hours' ? 3600000 : 86400000 // 1 hour in ms and 1 day in ms

        for (let i = 0; i < totalPoints; i++) {
            data.push({
                date: formatDate(
                    new Date(currentDate.getTime() - decrementAmount * i),
                    range
                ),
                totalWorth: Math.random() * 10000 + 5000, // Random value between 5000 and 15000
            })
        }

        data.reverse() // Reverse to have the oldest data first
        setHistoricalData(data)
    }

    const formatDate = (date, range) => {
        if (range === '24hours') {
            // Format to show hours and minutes: "HH:mm"
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        } else {
            // Format to show year, month, and day: "YYYY-MM-DD"
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        }
    }

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart
                data={historicalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Line
                    type="monotone"
                    dataKey="totalWorth"
                    stroke="#8884d8"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default HistoricalPortfolioGraph
