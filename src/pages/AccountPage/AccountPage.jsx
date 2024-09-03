//importing styles
import "./AccountPage.css"

//importing functions and components from react library
import { useEffect, useState } from "react"

//importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"
import { Link } from "react-router-dom"

export const AccountPage = () => {

    let [userData, setUserData] = useState({})

    useEffect(()=>{
        // declaring interval
        const interval = setInterval(async () => {
            // getting data about current user
            const data = await getCurrentUserInfo()
            // setting state of 'userData' to new 'data'
            setUserData(data)
        }, 1);

        // clearing the interval
        return () => { clearInterval(interval) }
    })

    return (
        <div className="container-fluid text-center p-3 d-flex flex-column gap-4">
            <h1 className="display-5 fw-bold ">Welcome {userData.login} !</h1>
            <div className="col-6 bg-light mx-auto shadow-lg p-3">
                <h3 className="display-6">Account Info</h3>
                <p className="fs-5"> Balance : {userData.balance}</p>
                <Link className="btn btn-outline-success">Top up</Link>
            </div>
        </div>
    )
}