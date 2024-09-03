// importing styles
import "./AuctionListPage.css"

// importing functions and components from react library 
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"


export const AuctionListPage = () => {
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


    // preview page of auctions list
    return (
        <div className="container-fluid p-3 text-center">
            <h1 className="display-4 fw-bold mb-5">List of your auctions</h1>
        </div>
    )
}