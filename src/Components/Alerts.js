// src/components/AlertList.js
import React, { useEffect, useState } from 'react';
import weatherService from '../services/weatherService';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await weatherService.fetchAlerts();
                setAlerts(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch alerts');
            }
        };
        fetchAlerts();
    }, []);

    return (
        <div className="card">
            <h3>Weather Alerts</h3>
            {error ? <p className="error">{error}</p> : (
                <ul>
                    {alerts.map((alert, index) => <li key={index}>{alert}</li>)}
                </ul>
            )}
        </div>
    );
};

export default Alerts;
