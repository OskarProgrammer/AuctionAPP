//importing functions from react
import { useEffect, useState } from 'react'

//importing styles
import './App.css'

//importing bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importing layouts
import {MainLayout} from "./Layouts/MainLayout/MainLayout"

//importing pages
import {MainPage} from "./pages/MainPage/MainPage"

//creating routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
    
      {/* route --> '/' with element <MainPage/>*/}
      <Route index element={<MainPage/>}/>
  
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
