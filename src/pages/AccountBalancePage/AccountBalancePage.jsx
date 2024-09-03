// importing styles
import "./AccountBalancePage.css"

// importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"

// importing functions and components from react library
import { useEffect, useState } from "react"


export const AccountBalancePage = () => {

    // initializing useState variable
    let [currentUserData, setCurrentUserData] = useState({})

    // creating useEffect with interval
    useEffect(()=>{
        // declaring interval
        const interval = setInterval(async () => {
            // getting data about current user
            const data = await getCurrentUserInfo()
            // setting state of 'userData' to new 'data'
            setCurrentUserData(data)
        }, 1);

        // clearing the interval
        return () => { clearInterval(interval) }
    })


    // preview page of account balance
    return (
        <div className="container-fluid p-3 text-center">
            <h1 className="display-4 fw-bold mb-5">Account balance page</h1>
            <p className="fs-4">Current balance: {currentUserData.balance}</p>
        </div>
    )
}