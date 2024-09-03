//importing functions from react
import { useEffect, useState } from 'react'

//importing styles
import './App.css'

//importing bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//importing functions and components from react library
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importing layouts
import {MainLayout, mainLayoutLoader} from "./Layouts/MainLayout/MainLayout"

//importing pages
import {MainPage} from "./pages/MainPage/MainPage"
import {loginAction, LoginPage} from "./pages/LoginPage/LoginPage"
import { registerAction, RegisterPage } from './pages/RegisterPage/RegisterPage'
import { AccountLayout } from './Layouts/AccountLayout/AccountLayout'
import { logOutLoader, LogOutPage } from './pages/LogOutPage/LogOutPage'

//creating routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLayoutLoader} >
    
      {/* route --> '/' with element <MainPage/> */}
      <Route index element={<MainPage/>}/>

      {/* route --> '/login' with element <LoginPage/> , action 'loginAction' */}
      <Route path="/login" element={<LoginPage/>} action={loginAction}/>

      {/* route --> '/register' with element <RegisterPage/> , action 'registerAction' */}
      <Route path="/register" element={<RegisterPage/>} action={registerAction}/>

      {/* route --> '/account' layout with element <AccountLayout/> */}
      <Route path="/account/" element={<AccountLayout/>} >
          
          {/* route --> '/account/logOut' with element <LogOutPage/>, loader 'logOutLoader' */}
          <Route path="logOut" element={<LogOutPage/>} loader={logOutLoader}/>

      </Route>

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
