// src/Components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
    return (
        <div className="card">
            <h2>Weather Data for {weatherData.city}</h2>
            <p>Main Condition: {weatherData.maincondition}</p>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Feels Like: {weatherData.feelslike}°C</p>
            <p>Timestamp: {weatherData.timestamp}</p>
        </div>
    );
};

export default WeatherDisplay;
