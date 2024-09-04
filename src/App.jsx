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
import { AccountLayout, accountLayoutLoader } from './Layouts/AccountLayout/AccountLayout'
import { logOutLoader, LogOutPage } from './pages/LogOutPage/LogOutPage'
import { accountLoader, AccountPage } from './pages/AccountPage/AccountPage'
import { accountBalanceLoader, AccountBalancePage } from './pages/AccountBalancePage/AccountBalancePage'
import { auctionAction, auctionListLoader, AuctionListPage } from "./pages/AuctionListPage/AuctionListPage"
import { userSettingsLoader, UserSettingsPage } from "./pages/UserSettingsPage/UserSettingsPage"

//importing api functions
import { getRequest, putRequest } from './api_functions/functions'

//creating routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLayoutLoader} >
    
      {/* route --> '/' with element <MainPage/> */}
      <Route index element={<MainPage/>}/>

      {/* route --> '/login' with element <LoginPage/> , action 'loginAction' */}
      <Route path="/login" element={<LoginPage/>} action={loginAction}/>

      {/* route --> '/register' with element <RegisterPage/> , action 'registerAction' */}
      <Route path="/register" element={<RegisterPage/>} action={registerAction}/>

      {/* route --> '/account' layout with element <AccountLayout/> , loader 'accountLayoutLoader' */}
      <Route path="/account/" element={<AccountLayout/>} loader={accountLayoutLoader}>
          
          {/* route --> '/account/' with element <AccountPage/> , loader 'accountLoader' */}
          <Route index element={<AccountPage/>} loader={accountLoader}/>

          {/* route --> '/account/accountBalance with element <AccountBalancePage/>, loader 'accountBalanceLoader' */}
          <Route path="accountBalance" element={<AccountBalancePage/>} loader={accountBalanceLoader}/>

          {/* route --> '/account/auctionList' with element <AuctionListPage/> , loader 'auctionListLoader', action 'auctionAction' */}
          <Route path="auctionList" element={<AuctionListPage/>} loader={auctionListLoader} action={auctionAction}/>

          {/* route --> '/account/userSettings' with element <UserSettingsPage/>, loader 'userSettingsLoader' */}
          <Route path="userSettings" element={<UserSettingsPage/>} loader={userSettingsLoader}/>

          {/* route --> '/account/logOut' with element <LogOutPage/>, loader 'logOutLoader' */}
          <Route path="logOut" element={<LogOutPage/>} loader={logOutLoader}/>

      </Route>

  </Route>
))

function App() {
  
  return (
    <>
      {/* setting router provider with router */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
