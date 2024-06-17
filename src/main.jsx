import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FindRestaurantPage from './pages/FindRestaurantPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
// import ResultsPage from '.pages/ResultsPage'
import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="find-restaurant-page" element={<FindRestaurantPage />} />
      <Route path='profile-page' element={<ProfilePage/>} />
      {/* <Route path='/results-page' element={<ResultsPage/>}/> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)