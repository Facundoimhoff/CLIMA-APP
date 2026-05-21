import React, { useState } from "react"

import axios from "axios" 

import { useNavigate } from "react-router-dom"

//Guarda la ciudad ingresada por el usuario en el estado "ciudad" y tiene una función "buscarCiudad" que hace una solicitud a la API
export default function SearchBar() {

  const [ciudad, setCiudad] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const buscarCiudad = async () => {

    setLoading(true)

    if (ciudad.trim() === "") {
      alert("Ingrese una ciudad")
      return
    }

    try {

      const respuesta = await axios.get(`https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json`
      )

      navigate("/cities", { // Navega a la ruta de la lista de ciudades, pasando los resultados de la búsqueda en el estado
        state: {
          ciudades: respuesta.data
        }
      })

      setLoading(false)

    } catch (error) {

      console.log(error)

      alert("Error al buscar ciudad")

    }
  }

  if (loading) {

  return (

    <div className="loadingContainer2">

      <div className="spinner2"></div>

      <h2>Buscando ciudades...</h2>

    </div>

  )

}
 
  return (

    <div className="card">

      <h1> Aplicación del Clima</h1>

      <p>Buscá una ciudad</p>

      <input
        type="text"
        placeholder="Ej: San Francisco"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />

      <button onClick={buscarCiudad}>
        Buscar
      </button>

    </div>

  )
}