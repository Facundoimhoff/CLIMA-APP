import React from "react"

import { useLocation, useNavigate } from "react-router-dom"


//recibe las ciudades encontradas y muestra una lista de ciudades con un botón para ver el clima de cada una
export default function CityList() {

  const location = useLocation()

  const navigate = useNavigate()

  const ciudades = location.state?.ciudades || [] //se obtiene el array con todas las ciudades encontradas. Si no hay ciudades, se asigna un array vacío.

  return (

    <div className="card">

      <button onClick={() => navigate("/")}>
        Nueva búsqueda
      </button>

      <h2>Ciudades encontradas</h2>

      {
        ciudades.map((c, index) => (

          <div key={index} className="cityItem">

            <p>{c.display_name}</p>

            <button
              onClick={() =>
                navigate(`/weather/${c.lat}/${c.lon}`)
              }
            >
              Ver clima
            </button>

          </div>

        ))
      }

    </div>

  )
}