// importing styles
import { getRequest } from "../../api_functions/functions"
import "./AccountLayout.css"

//importing functions and components from react library
import { NavLink, Outlet, redirect } from "react-router-dom"


export const AccountLayout = () => {


    return (
        // whole layout 
        <div className="container-fluid d-flex gap-2">

            {/* left side of the layout */}
            <div className="col-1 bg-light d-flex flex-column gap-3 p-3 shadow-lg border border-dark rounded sideBar">
                
                {/* balance money button */}
                <NavLink to="" className="btn btn-outline-dark icon-30" >
                    <i className="bi bi-bank"/>
                </NavLink>


            </div>

            {/* right side of the layout */}
            <div className="col-11">
                <Outlet />
            </div>

        </div>
    )
}


// loader that saves from uncontrolled going to routes '/account/*'
export const accountLayoutLoader = async () => {

    // getting current user tuple from endpoint 'http://localhost:3000/currentUser/'
    const currentUser = await getRequest('http://localhost:3000/currentUser/')

    // checking if there is logged user
    if (!currentUser.isLogged){
        // redirecting to main route '/'
        return redirect("/")   
    }

    return null
}