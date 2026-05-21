import React from "react"

export default function WeatherCard({ fecha, max, min }) {

  const fechaObjeto = new Date(fecha)

  const nombreDia = fechaObjeto.toLocaleDateString("es-ES", {
    weekday: "long"
  })

  const fechaFormateada = fechaObjeto.toLocaleDateString("es-AR")

  // El componente WeatherCard recibe las props de fecha, temperatura máxima y mínima para un día específico del pronóstico. 
  // Formatea la fecha para mostrar el nombre del día de la semana y la fecha en formato local, y luego muestra esta información junto con las temperaturas máxima y mínima en una tarjeta de pronóstico.
  return (

    <div className="forecastCard">

      <h2>{nombreDia}</h2>

      <h3>{fechaFormateada}</h3>

      <p>🌡️ Max: {max}°C</p>

      <p>❄️ Min: {min}°C</p>

    </div>

  )
}