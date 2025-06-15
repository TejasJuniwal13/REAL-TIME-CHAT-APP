import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'

const AppRoutes = () => {
  return (
    <BrowserRouter>


    <Routes>
        <Route path='/' element={<div>Home</div>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='login'v element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes