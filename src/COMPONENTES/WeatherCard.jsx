import React from "react"

export default function WeatherCard({ fecha, max, min }) {

  const fechaObjeto = new Date(fecha)

  const nombreDia = fechaObjeto.toLocaleDateString("es-ES", {
    weekday: "long"
  })

  const fechaFormateada = fechaObjeto.toLocaleDateString("es-AR")

  return (

    <div className="forecastCard">

      <h2>{nombreDia}</h2>

      <h3>{fechaFormateada}</h3>

      <p>🌡️ Max: {max}°C</p>

      <p>❄️ Min: {min}°C</p>

    </div>

  )
}