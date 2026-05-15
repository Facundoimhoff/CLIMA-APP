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

    } catch (error) {

      console.log(error)

      setError("No se pudo obtener el clima")

    } finally {

      setLoading(false)

    }
  }

  const obtenerIconoClima = (codigo) => {

    codigo = Number(codigo)

    if (codigo === 0) {
      return "☀️ DESPEJADO"
    }

    if (codigo === 1) {
      return "🌤️ MAYORMENTE DESPEJADO"
    }

    if (codigo === 2) {
      return "⛅ PARCIALMENTE NUBLADO"
    }

    if (codigo === 3) {
      return "☁️ NUBLADO"
    }

    if (codigo === 45) {
      return "🌫️ NIEBLA"
    }

    if (codigo === 51) {
      return "🌦️ LLOVIZNA LEVE"
    }

    if (codigo === 53) {
      return "🌦️ LLOVIZNA MODERADA"
    }

    if (codigo === 55) {
      return "🌧️ LLOVIZNA INTENSA"
    }

    if (codigo >= 71 && codigo <= 77) {
      return "❄️ NIEVE"
    }

    if (codigo === 95) {
      return "⛈️ TORMENTA"
    }

    if (codigo === 96) {
      return "⛈️ TORMENTA CON GRANIZO"
    }

    return "🌍 CLIMA DESCONOCIDO"

  }

  const obtenerEmojiSensacion = (temperatura) => {

    if (temperatura >= 30) return "🥵"

    if (temperatura >= 20) return "😎"

    if (temperatura >= 10) return "🙂"

    return "🥶"

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

      <h1>
        {obtenerIconoClima(clima.current.weather_code)}
      </h1>

      <p>
        🌡️ Temperatura:
        {" "}
        {clima.current.temperature_2m}°C
      </p>

      <p>
        💧 Humedad:
        {" "}
        {clima.current.relative_humidity_2m}%
      </p>

      <p>
        {obtenerEmojiSensacion(clima.current.apparent_temperature)}
        {" "}
        Sensación térmica:
        {" "}
        {clima.current.apparent_temperature}°C
      </p>

      <h2>Pronóstico de 7 días</h2>

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