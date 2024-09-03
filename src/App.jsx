//importing functions from react
import { useEffect, useState } from 'react'

//importing styles
import './App.css'

//importing bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importing layouts
import {MainLayout} from "./Layouts/MainLayout/MainLayout"

//importing pages
import {MainPage} from "./pages/MainPage/MainPage"
import {LoginPage} from "./pages/LoginPage/LoginPage"
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

//creating routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
    
      {/* route --> '/' with element <MainPage/>*/}
      <Route index element={<MainPage/>}/>

      {/* route --> '/login' with element <LoginPage/> */}
      <Route path="/login" element={<LoginPage/>}/>

      {/* route --> '/register' with element <RegisterPage/> */}
      <Route path="/register" element={<RegisterPage/>}/>

  </Route>
))

function App() {

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     setCounter(counter+=1)
  //   }, 1000);

  //   return () => clearInterval(interval);
  // })

  return (
    <>
      {/* setting router provider with router */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
