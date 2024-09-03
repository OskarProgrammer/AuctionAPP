
//importing functions and components from react library
import { NavLink } from "react-router-dom"

// importing styles
import "./NavBar.css"


// nav bar used in src/Layouts/MainLayout/MainLayout.jsx
export const NavBar = (props) => {

    return (
        // nav bar
        <div className="container-fluid d-flex bg-light border border-1 border-dark shadow-lg p-3 rounded">

            {/* left side of the navbar */}
            <div className="col-6">

                {/* button to the '/' route */}
                <NavLink to="/" className="btn btn-outline-dark">
                    {/* home icon from bootstrap page */}
                    <i className="bi bi-house fs-2"/>
                </NavLink>

            </div>

            {/*  right side of the navbar */}
            <div className="col-6 d-flex justify-content-end gap-3 ">

                {/* rendering if user is not logged in */}
                {!props.currentUser.isLogged ? 
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

                {/*  rendering if user is logged in */}
                {props.currentUser.isLogged ? 
                    <>
                        {/* button to the '/account/logOut' route  */}
                        <NavLink to="" className="btn btn-outline-danger fw-bold d-flex">
                            <p className="my-auto">Log out</p>
                        </NavLink>
                    </> : ""}
                
            </div>

        </div>
    )
}


