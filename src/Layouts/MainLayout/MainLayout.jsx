//importing components
import { NavBar } from "../../components/NavBar/NavBar"

//importing components and functions
import { Outlet } from "react-router-dom"

//Layout with all things , navbar, links, title
export const MainLayout = () => {

    return (
        <div className="container-fluid">

            {/* title of the page */}
            <h1 className="display-4 fw-bold text-center p-3">Auction App</h1>
            
            {/* navbar */}
            <NavBar/>

            {/* main content container */}
            <div className="container-fluid my-3">
                <Outlet/>
            </div>

        </div>
    )
}