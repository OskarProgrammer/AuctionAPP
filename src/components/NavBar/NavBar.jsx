
//importing functions and components from react library
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

// importing styles
import "./NavBar.css"
import { getRequest } from "../../api_functions/functions"


// nav bar used in src/Layouts/MainLayout/MainLayout.jsx
export const NavBar = (props) => {
    
    // creating dynamic variable of props.currentUser.isLogged to create dynamic changes of navbar
    let [state, setState] = useState(props.currentUser.isLogged)


    // setting the interval that get the data from 'http://localhost:3000/currentUser/' every milisecond
    useEffect(()=>{ 
        const interval = setInterval(async () => {
            const data = await getRequest('http://localhost:3000/currentUser/') 
            setState( data.isLogged )
        }, 1);

        return () => { clearInterval(interval) }
    }, [])
    

    return (
        // nav bar
        <div className="container-fluid d-flex bg-light border border-1 border-dark shadow-lg p-3 rounded">

            {/* left side of the navbar */}
            <div className="col-6 d-flex gap-3">

                {/* button to the '/' route */}
                <NavLink to="/" className="btn btn-outline-dark">
                    {/* home icon from bootstrap page */}
                    <i className="bi bi-house fs-2"/>
                </NavLink>

                {/* button to the '/account/' route */}
                {state ? 
                    <Link to="/account/" className="btn btn-outline-dark">
                        {/* settings icon from bootstrap page */}
                        <i class="bi bi-gear fs-2" />
                    </Link> 
                : ""}

                

                {/* button to the '/account/auctionList */}
                {state ? 
                    <Link to="/account/auctionList" className="btn btn-outline-success">
                        {/* plus icon from bootstrap page */}
                        <i class="bi bi-plus-lg fs-2"/>
                    </Link> 
                : ""}

            </div>

            {/*  right side of the navbar */}
            <div className="col-6 d-flex justify-content-end gap-3 ">

                {/* rendering if user is not logged in */}
                {!state ? 
                    <>
                        {/* button to the '/login' route  */}
                        <NavLink to="/login" className="btn btn-outline-dark fw-bold d-flex">
                            <p className="my-auto">Sign in</p>
                        </NavLink>

                        {/* button to the '/register' route  */}
                        <NavLink to="/register" className="btn btn-outline-dark fw-bold d-flex">
                            <p className="my-auto">Sign up</p>
                        </NavLink>
                    </> : ""}
                

                {/* button to the '/account/orders */}
                {state ? 
                    <NavLink to="/account/orders" className="btn btn-outline-dark icon-30" >
                        {/* box icon from bootstrap icons */}
                        <i class="bi bi-box-seam-fill fs-2"/>
                    </NavLink>
                : ""}

                {/* button to the '/account/basket */}
                {state ? 
                    <NavLink to="/account/basket" className="btn btn-outline-dark icon-30" >
                        {/* basket icon from bootstrap icons */}
                        <i class="bi bi-basket fs-2"/>
                    </NavLink>
                : ""}

                {/*  rendering if user is logged in */}
                {state ? 
                    <>
                        {/* button to the '/account/logOut' route  */}
                        <NavLink to="/account/logOut" className="btn btn-outline-danger fw-bold d-flex">
                            <p className="my-auto">Log out</p>
                        </NavLink>
                    </> : ""}
                
            </div>

        </div>
    )
}


