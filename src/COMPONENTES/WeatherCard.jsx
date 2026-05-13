import React from "react"

export default function WeatherCard({ fecha, max, min }) {

  return (

    <div className="forecastCard">

      <h3>{fecha}</h3>

      <p>🌡 Max: {max}°C</p>

      <p>❄ Min: {min}°C</p>

    </div>

  )
}