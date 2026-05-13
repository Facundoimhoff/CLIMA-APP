import React, { useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

export default function SearchBar() {

  const [ciudad, setCiudad] = useState("")

  const navigate = useNavigate()

  const buscarCiudad = async () => {

    if (ciudad.trim() === "") {
      alert("Ingrese una ciudad")
      return
    }

    try {

      const respuesta = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json`
      )

      navigate("/cities", {
        state: {
          ciudades: respuesta.data
        }
      })

    } catch (error) {

      console.log(error)

      alert("Error al buscar ciudad")

    }
  }

  return (

    <div className="card">

      <h1>🌤 Aplicación del Clima</h1>

      <p>Buscá una ciudad</p>

      <input
        type="text"
        placeholder="Ej: Buenos Aires"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />

      <button onClick={buscarCiudad}>
        Buscar
      </button>

    </div>

  )
}