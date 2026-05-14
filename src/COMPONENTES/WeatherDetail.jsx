import React, { useEffect, useState } from "react"

import axios from "axios"

import { useParams, useNavigate } from "react-router-dom"

import WeatherCard from "./WeatherCard"

export default function WeatherDetail() {

  const { lat, lon } = useParams()

  const navigate = useNavigate()

  const [clima, setClima] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {

    obtenerClima()

  }, [lat, lon])

  const obtenerClima = async () => {

    try {

      setLoading(true)

      setError("")

      const respuesta = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      )

      setClima(respuesta.data)

      setLoading(false)

    } catch (error) {

      console.log(error)

      setError("No se pudo obtener el clima")

      setLoading(false)

    }
  }

  if (loading) {
    return <h2>Cargando...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (

    <div className="card">

      <button onClick={() => navigate(-1)}>
        Volver
      </button>

      <h1>🌤️ Clima actual</h1>

      <p>🌡️ Temperatura: {clima.current.temperature_2m}°C</p>

      <p>💧 Humedad: {clima.current.relative_humidity_2m}%</p>

      <p>🥶 Sensación térmica: {clima.current.apparent_temperature}°C</p>

      <h2>Pronóstico</h2>

      <div className="forecastContainer">

        {
          clima.daily.time.map((dia, index) => (

            <WeatherCard
              key={index}
              fecha={dia}
              max={clima.daily.temperature_2m_max[index]}
              min={clima.daily.temperature_2m_min[index]}
            />

          ))
        }

      </div>

    </div>

  )
}