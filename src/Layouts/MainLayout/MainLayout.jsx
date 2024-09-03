//importing components
import { NavBar } from "../../components/NavBar/NavBar"

// importing api functions
import { getRequest } from "../../api_functions/functions"

//importing components and functions
import { Outlet, useLoaderData } from "react-router-dom"
import { useEffect } from "react"

//Layout with all things , navbar, links, title
export const MainLayout = () => {

    // getting data from loader function
    let loaderData = useLoaderData()

    return (
        <div className="container-fluid">

            {/* title of the page */}
            <h1 className="display-4 fw-bold text-center p-3">Auction App</h1>
            
            {/* navbar , giving in props currentUser */}
            <NavBar currentUser={loaderData}/>

            {/* main content container */}
            <div className="container-fluid my-3">
                <Outlet/>
            </div>

        </div>
    )
}

// main layout loader which will return the data about user that is currently logged
export const mainLayoutLoader = async () => {
    
    // getting data from endpoint 'http://localhost:3000/currentUser/'  
    const currentUser = await getRequest("http://localhost:3000/currentUser/")

    // returning gathered data
    return currentUser
}