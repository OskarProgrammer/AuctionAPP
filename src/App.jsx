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
import { AccountLayout, accountLayoutLoader } from './Layouts/AccountLayout/AccountLayout'

//importing pages
import {loaderMainPage, MainPage} from "./pages/MainPage/MainPage"
import {loginAction, LoginPage} from "./pages/LoginPage/LoginPage"
import { registerAction, RegisterPage } from './pages/RegisterPage/RegisterPage'
import { logOutLoader, LogOutPage } from './pages/LogOutPage/LogOutPage'
import { accountLoader, AccountPage } from './pages/AccountPage/AccountPage'
import { accountBalanceLoader, AccountBalancePage } from './pages/AccountBalancePage/AccountBalancePage'
import { auctionAction, auctionListLoader, AuctionListPage } from "./pages/AuctionListPage/AuctionListPage"
import { userSettingsLoader, UserSettingsPage } from "./pages/UserSettingsPage/UserSettingsPage"
import { AccessDeniedPage } from "./pages/AccessDeniedPage/AccessDeniedPage"
import { basketLoader, BasketPage } from './pages/BasketPage/BasketPage'
import { auctionLoader, AuctionPage } from './pages/AuctionPage/AuctionPage'
import { ordersLoader, OrdersPage } from './pages/OrdersPage/OrdersPage'
import { finishedAuctionsLoader, FinishedAuctionsPage } from './pages/FinishedAuctionsPage/FinishedAuctionsPage'
import { orderAction } from './components/OrderTab/OrderTab'
import { deliveriesLoader, DeliveriesPage } from './pages/DeliveriesPage/DeliveriesPage'
import { profileLoader, ProfilePage } from './pages/ProfilePage/ProfilePage'
import { chatsLoader, ChatsPage } from './pages/ChatsPage/ChatsPage'


//creating routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>} loader={mainLayoutLoader} >
    
      {/* route --> '/' with element <MainPage/> , loader 'loaderMainPage'*/}
      <Route index element={<MainPage/>} loader={loaderMainPage}/>

      {/* route --> '/login' with element <LoginPage/> , action 'loginAction' */}
      <Route path="/login" element={<LoginPage/>} action={loginAction}/>

      {/* route --> '/register' with element <RegisterPage/> , action 'registerAction' */}
      <Route path="/register" element={<RegisterPage/>} action={registerAction}/>

      {/* route --> '/auction/:id' with element <AuctionPage/>, loader 'auctionLoader' */}
      <Route path="/auction/:id" element={<AuctionPage/>} loader={auctionLoader}/>

      {/* route --> '/user/:id' with element <ProfilePage/>, loader 'profileLoader' */}
      <Route path="/user/:id" element={<ProfilePage/>} loader={profileLoader}/>

      {/* route --> '/chats with element <ChatsPage/>, loader 'chatsLoader' */}
      <Route path="chats" element={<ChatsPage/>} loader={chatsLoader}/>

      {/* route --> '/account' layout with element <AccountLayout/> , loader 'accountLayoutLoader' */}
      <Route path="/account/" element={<AccountLayout/>} loader={accountLayoutLoader} errorElement={<AccessDeniedPage/>}>
          
          {/* route --> '/account/' with element <AccountPage/> , loader 'accountLoader' */}
          <Route index element={<AccountPage/>} loader={accountLoader}/>

          {/* route --> '/account/accountBalance with element <AccountBalancePage/>, loader 'accountBalanceLoader' */}
          <Route path="accountBalance" element={<AccountBalancePage/>} loader={accountBalanceLoader}/>

          {/* route --> '/account/auctionList' with element <AuctionListPage/> , loader 'auctionListLoader', action 'auctionAction' */}
          <Route path="auctionList" element={<AuctionListPage/>} loader={auctionListLoader} action={auctionAction}/>

          {/* route --> '/account/userSettings' with element <UserSettingsPage/>, loader 'userSettingsLoader' */}
          <Route path="userSettings" element={<UserSettingsPage/>} loader={userSettingsLoader}/>

          {/* route --> '/account/finishedAuctions' with element <FinishedAuctionsPage/> , loader 'finishedAuctionsLoader'*/}
          <Route path="finishedAuctions" element={<FinishedAuctionsPage/>} loader={finishedAuctionsLoader}/>

          {/* route --> '/account/basket' with element <BasketPage/>, loader 'basketLoader' */}
          <Route path="basket" element={<BasketPage/>} loader={basketLoader}/>

          {/* route --> '/account/orders' with element <OrdersPage/>, loader 'ordersLoader', action 'orderAction' */}
          <Route path="orders" element={<OrdersPage/>} loader={ordersLoader} action={orderAction}/>

          {/* route --> '/account/deliveries with element <DeliveriesPage/>, loader 'deliveriesLoader'*/}
          <Route path="deliveries" element={<DeliveriesPage/>} loader={deliveriesLoader}/>

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
