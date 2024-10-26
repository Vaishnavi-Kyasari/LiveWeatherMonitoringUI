import React, { useState } from 'react';

const WeatherForm = ({ handlePostWeatherData }) => {
    // State variables to manage form data
    const [temperature, setTemperature] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [mainCondition, setMainCondition] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Log to confirm the function is passed correctly
    console.log("handlePostWeatherData:", handlePostWeatherData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the timestamp format (basic validation)
        const timestampPattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/; // DD-MM-YYYY HH:MM
        if (!timestampPattern.test(timestamp)) {
            setError("Timestamp must be in format DD-MM-YYYY HH:MM");
            return;
        }

        // Convert the timestamp to ISO format
        try {
            const [datePart, timePart] = timestamp.split(' '); // Split date and time
            const [day, month, year] = datePart.split('-'); // Split the date into components
            const isoTimestamp = `${year}-${month}-${day}T${timePart}:00Z`; // Rearrange to ISO format

            // Constructing the weather data object
            const weatherData = {
                temperature: parseFloat(temperature),
                feelslike: parseFloat(feelsLike),
                maincondition: mainCondition,
                timestamp: isoTimestamp, // Use the ISO format
                city: city,
            };

            await handlePostWeatherData(weatherData);
            setMessage("Weather data submitted successfully!");
            setError(null);
            // Reset fields after successful submission
            setTemperature('');
            setFeelsLike('');
            setMainCondition('');
            setTimestamp('');
            setCity('');
        } catch (error) {
            console.error("Error posting weather data:", error);
            setError("Failed to submit data: " + (error.message || "Unknown error"));
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Submit Weather Data</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="City" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Temperature (°C)" 
                    value={temperature} 
                    onChange={(e) => setTemperature(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Feels Like (°C)" 
                    value={feelsLike} 
                    onChange={(e) => setFeelsLike(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Main Condition" 
                    value={mainCondition} 
                    onChange={(e) => setMainCondition(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Timestamp (DD-MM-YYYY HH:MM)" 
                    value={timestamp} 
                    onChange={(e) => setTimestamp(e.target.value)} 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default WeatherForm;
