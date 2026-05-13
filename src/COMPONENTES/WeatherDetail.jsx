import React, { useEffect, useState } from "react"

import axios from "axios"

import { useParams } from "react-router-dom"

import WeatherCard from "./WeatherCard"

export default function WeatherDetail() {

  const { lat, lon } = useParams()

  const [clima, setClima] = useState(null)

  useEffect(() => {

    obtenerClima()

  }, [])

  const obtenerClima = async () => {

    try {

      const respuesta = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`

      )

      setClima(respuesta.data)

    } catch (error) {

      console.log(error)

      alert("Error al obtener clima")

    }
  }

  if (!clima) {
    return <h2>Cargando...</h2>
  }

  return (

    <div className="card">

      <h1>🌤 Clima actual</h1>

      <p>🌡 Temperatura: {clima.current.temperature_2m}°C</p>

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