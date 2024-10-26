// src/Components/CityWeatherForm.js
import React, { useState } from 'react';
import weatherService from '../services/weatherService';

const CityWeatherForm = ({ fetchWeather }) => {
    const [city, setCity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (city) {
            await fetchWeather(city);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="city-weather-form">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                required
            />
            <button type="submit">Fetch Weather</button>
        </form>
    );
};

export default CityWeatherForm;
