// importing styles
import "./AccountBalancePage.css"

// importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"


export const AccountBalancePage = () => {
    // getting loader data
    const loaderData = useLoaderData()

    // initializing useState variable
    let [currentUserData, setCurrentUserData] = useState(loaderData)

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


// loader function
export const accountBalanceLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo() 

    // returning currentUser
    return currentUser
}