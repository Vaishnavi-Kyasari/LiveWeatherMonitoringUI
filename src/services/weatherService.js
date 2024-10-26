// src/services/weatherService.js
import axios from 'axios';

const API_URL = 'http://localhost:8083/api/weather';

const fetchWeatherByCity = async (city) => {
    const response = await axios.get(`${API_URL}`, { params: { city } });
    return response.data;
};

// Correct the function declaration
const addWeatherData = async (weatherData) => {
    console.log("Sending Weather Data:", weatherData); // Log the data being sent
    try {
        const response = await axios.post(`${API_URL}/data`, weatherData);
        console.log("Response from Weather API:", response.data); // Log the response
        return response.data; // Return the response data if needed
    } catch (error) {
        // Log error details for easier debugging
        console.error("Error posting weather data:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'An unknown error occurred'); // Propagate a user-friendly error
    }
    
};

const fetchAlerts = async () => {
    const response = await axios.get(`${API_URL}/alerts`);
    return response.data;
};

export default {
    fetchWeatherByCity,
    addWeatherData,
    fetchAlerts,
};
