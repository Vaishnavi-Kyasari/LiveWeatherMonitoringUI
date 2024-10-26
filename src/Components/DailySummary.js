// src/Components/DailySummary.js
import React, { useEffect, useState } from 'react';
import weatherService from '../services/weatherService';

const DailySummary = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading

    const fetchDailySummary = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const data = await weatherService.fetchDailySummary(); // Replace with the actual method
            setSummaryData(data);
            setError(null); // Reset any previous errors
        } catch (err) {
            setError(err.message || 'Error fetching daily summary');
            setSummaryData(null); // Reset summary data on error
        } finally {
            setLoading(false); // Set loading to false after fetch attempt
        }
    };

    useEffect(() => {
        fetchDailySummary();
    }, []);

    return (
        <div>
            <h5>Daily Summary</h5>
           
            {summaryData && !loading && (
                <div className="summary-container">
                    <h3>Summary for {summaryData.date}</h3>
                    <p><strong>Temperature:</strong> {summaryData.temperature}°C</p>
                    <p><strong>Condition:</strong> {summaryData.condition}</p>
                    <p><strong>Humidity:</strong> {summaryData.humidity}%</p>
                    {/* Add other relevant fields as necessary */}
                </div>
            )}
        </div>
    );
};

export default DailySummary;
