import React from "react"

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
            path="/"
            element={<SearchBar />}
          />

          <Route
            path="/cities"
            element={<CityList />}
          />

          <Route
            path="/weather/:lat/:lon"
            element={<WeatherDetail />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default AppClima
