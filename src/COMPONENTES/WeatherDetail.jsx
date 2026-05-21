import React, { useEffect, useState } from "react"

import axios from "axios"

import { useParams, useNavigate } from "react-router-dom"

import WeatherCard from "./WeatherCard"


// Componente que muestra el detalle del clima para una ciudad seleccionada, incluyendo la temperatura actual, humedad, sensación térmica y un pronóstico de 7 días. Utiliza la API de Open-Meteo para obtener los datos climáticos basados en la latitud y longitud de la ciudad seleccionada.
export default function WeatherDetail() {

  const { lat, lon } = useParams() // Se obtienen los parámetros de latitud y longitud de la URL, que se pasan desde la lista de ciudades al seleccionar una ciudad para ver su clima

  const navigate = useNavigate()

  const [clima, setClima] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {

    obtenerClima()

  }, [lat, lon])

  const obtenerClima = async () => { // Función para obtener el clima desde la API de Open-Meteo, utilizando la latitud y longitud obtenidas de los parámetros de la URL. Maneja el estado de carga y errores durante la solicitud.

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

  const obtenerIconoClima = (codigo) => { // Función para obtener un ícono y descripción del clima basado en el código de clima proporcionado por la API.
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

  const obtenerEmojiSensacion = (temperatura) => { // Función para obtener un emoji que representa la sensación térmica basada en la temperatura.

    if (temperatura >= 30) return "🥵"

    if (temperatura >= 20) return "😎"

    if (temperatura >= 10) return "🙂"

    return "🥶"

  }

  if (loading) { // Si el estado de carga es verdadero, se muestra un mensaje de carga y un spinner mientras se obtienen los datos del clima.

  return (

    <div className="loadingContainer">

      <div className="spinner"></div>

      <h2>Cargando clima...</h2>

    </div>

  )

}
  if (error) {

    return <h2>{error}</h2>

  }

  return ( // Si se obtuvieron los datos del clima correctamente, se muestra el detalle del clima actual y el pronóstico de 7 días utilizando el componente WeatherCard para cada día del pronóstico.

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