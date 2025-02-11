import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/AdminPages/AdminLogin.jsx'
import AdminPrivateRoute from './AdminPrivateRoute'
import Dash from '../components/admin/Dash'

import '../App.css'
import AdminSignup from '../pages/AdminPages/AdminSignup.jsx'
import Products from '../pages/AdminPages/Products.jsx'

export default function AdminRoutes() {
  return (
   <>
   <Routes> 
    <Route path='/login' element={<AdminLogin/>}/>
    <Route path='/signUp' element={<AdminSignup/>}/>
    <Route element={<AdminPrivateRoute/>}>
    <Route path='/dash' element={<Dash/>}/>

    <Route path='/products' element={<Products/>}/>
    </Route>
   </Routes>
   </>
  )
}
