import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PriceHistogram = ({ currencyId }) => {
    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            const url = `http://localhost:5000/api/historical/${currencyId}`;

            try {
                const response = await axios.get(url);
                console.log("API Data:", response.data); // for debugging
                const data = response.data.prices.map(price => ({
                    date: new Date(price[0]).toISOString().split('T')[0], // converts timestamp to YYYY-MM-DD
                    price: price[1]
                }));
                setHistoricalData(data);
            } catch (error) {
                console.error('Failed to fetch historical data:', error);
            }
        };

        fetchHistoricalData();
    }, [currencyId]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="price" fill="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceHistogram;
