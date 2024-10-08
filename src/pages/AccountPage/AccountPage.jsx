//importing styles
import "./AccountPage.css"

//importing functions and components from react library
import { useEffect, useState } from "react"

//importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"
import { Link, useLoaderData } from "react-router-dom"

export const AccountPage = () => {

    //getting loader data
    const loaderData = useLoaderData()

    // declaring and initlazing useState variable
    let [userData, setUserData] = useState(loaderData)

    return (
        <div className="container-fluid text-center p-3 d-flex flex-column gap-4">

            {/* header of the page */}
            <h1 className="display-5 fw-bold ">Welcome {userData.login} !</h1>


            <div className="col-lg-10 col-md-10 col-sm-11 col-12 bg-light mx-auto shadow-lg p-3">

                {/* header of the subpage */}
                <h3 className="display-6">Account Info</h3>

                {/* user balance section */}
                <p className="fs-5 mt-3 fw-bold"> Your balance info : </p>
                <p className="fs-5"> Balance : {parseInt(userData.balance)}</p>

                {/* link to '/account/accountBalance */}
                <Link to="/account/accountBalance" className="btn btn-outline-success shadow-lg">Top up</Link>


                {/* user info section */}
                <p className="fs-5 mt-3 fw-bold"> Your user info : </p>
                <p className="fs-5">Login : {userData.login} </p>
                <p className="fs-5" type="password">Password : {userData.password} </p>
                
                {/* link to '/account/userSettings' */}
                <Link to="/account/userSettings" className="btn btn-outline-success shadow-lg">Change your data</Link>

            </div>
        </div>
    )
}

// loader function
export const accountLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo()

    // returning currentUser
    return currentUser
}