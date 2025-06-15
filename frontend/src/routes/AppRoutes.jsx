import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>


    <Routes>
        <Route path='/' element={<div>Home</div>}></Route>
        <Route path='/register' element={<div>Register</div>}></Route>
        <Route path='login'v element={<div>Login</div>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes