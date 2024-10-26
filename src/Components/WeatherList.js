import React from 'react';

const WeatherList = ({ weatherData }) => {
    return (
        <div>
            <h2>Submitted Weather Data</h2>
            {weatherData.length === 0 ? (
                <p>No weather data submitted yet.</p>
            ) : (
                <ul>
                    {weatherData.map((data, index) => (
                        <li key={index}>
                            <strong>City:</strong> {data.city}, 
                            <strong> Temperature:</strong> {data.temperature} °C, 
                            <strong> Feels Like:</strong> {data.feelslike} °C, 
                            <strong> Condition:</strong> {data.maincondition}, 
                            <strong> Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WeatherList;
