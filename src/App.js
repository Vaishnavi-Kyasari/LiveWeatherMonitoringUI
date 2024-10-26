// src/App.js
import React, { useState, useEffect } from 'react';
import WeatherDisplay from './Components/WeatherDisplay';
import Alerts from './Components/Alerts';
import weatherService from './services/weatherService';
import CityWeatherForm from './Components/CityWeatherForm';
import DailySummary from './Components/DailySummary';
import WeatherForm from './Components/WeatherForm';
import WeatherList from './Components/WeatherList';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState(null); // To track error state

    const handleFetchWeather = async (city) => {
        try {
            const data = await weatherService.fetchWeatherByCity(city);
            setWeatherData(data);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(error.message || 'Error fetching weather data'); // Set error message
        }
    };

    const [weatherDataList, setWeatherDataList] = useState([]); // State to hold submitted weather data

    const handlePostWeatherData = async (weatherData) => {
        try {
            await weatherService.addWeatherData(weatherData); // Assuming this is your API call
            setWeatherDataList([...weatherDataList, weatherData]); // Update the list with the new data
        } catch (error) {
            console.error("Error posting weather data:", error);
            throw error; // Re-throw error for further handling in WeatherForm
        }
    };
    const loadAlerts = async () => {
        try {
            const alertsData = await weatherService.fetchAlerts();
            setAlerts(alertsData);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            console.error("Error fetching alerts:", error);
            setError(error.message || 'Error fetching alerts'); // Set error message
        }
    };
    
    useEffect(() => {
        loadAlerts();
    }, []);

    return (
        <div className="App">
            <div className="app-container">
                <h1>Weather Monitoring System</h1>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error messages */}
                <CityWeatherForm fetchWeather={handleFetchWeather} />
                
            <WeatherForm handlePostWeatherData={handlePostWeatherData} />
                <div className="card-container">
                    {weatherData && <WeatherDisplay weatherData={weatherData} />}
                    <WeatherList weatherData={weatherDataList} /> {/* Pass the data to the new component */}
                    {alerts.length > 0 && <Alerts alerts={alerts} />}
                    <DailySummary />
                </div>
            </div>
        </div>
    );
};

export default App;
