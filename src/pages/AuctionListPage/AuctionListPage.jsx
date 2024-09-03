// importing styles
import "./AuctionListPage.css"

// importing functions and components from react library 
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUserInfo } from "../../api_functions/functions"
import { useLoaderData } from "react-router-dom"


export const AuctionListPage = () => {
    // getting data from loader
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


    // preview page of auctions list
    return (
        <div className="container-fluid p-3 text-center">
            <h1 className="display-4 fw-bold mb-5">List of your auctions</h1>
        </div>
    )
}

export const auctionListLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo()

    // returning currentUser 
    return currentUser
}