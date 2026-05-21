import React from "react"

//Se usa react-router-dom para manejar las rutas de la aplicación
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SearchBar from "./COMPONENTES/SearchBar"
import CityList from "./COMPONENTES/CityList"
import WeatherDetail from "./COMPONENTES/WeatherDetail"

function AppClima() {

  return (  

    <BrowserRouter> 

      <div className="container">

        <Routes> 

          <Route
            path="/" //Ruta principal, que muestra la barra de búsqueda
            element={<SearchBar />}
          />

          <Route
            path="/cities" //Ruta para la lista de ciudades, luego de buscar una ciudad
            element={<CityList />}
          />

          <Route
            path="/weather/:lat/:lon" //Ruta para el detalle del clima, con parámetros de latitud y longitud, luego de seleccionar una ciudad de la lista
            
            element={<WeatherDetail />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default AppClima