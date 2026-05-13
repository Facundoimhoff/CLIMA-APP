import React from "react"

import { useLocation, useNavigate } from "react-router-dom"

export default function CityList() {

  const location = useLocation()

  const navigate = useNavigate()

  const ciudades = location.state?.ciudades || []

  return (

    <div className="card">

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