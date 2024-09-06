//  importing styles
import "./FinishedAuctionsPage.css"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUserFinishedAuctions } from "../../api_functions/functions"
import { FinishedAuctionTab } from "../../components/FinishedAuctionTab/FinishedAuctionTab"

export const FinishedAuctionsPage = () => {

    // getting loader data
    const loaderData = useLoaderData()
    
    // creating useState variable auctions
    let [auctions, setAuctions] = useState(loaderData)


    // creating useEffect with refresher for auctions
    useEffect(()=>{
        // creating interval
        const interval = setInterval( async () => {
            // getting data from data
            auctions = await getCurrentUserFinishedAuctions()

            // setting useState variable
            setAuctions(auctions)
        }, 1000)

        // returning clearInterval
        return () => { clearInterval(interval) }
    })

    return (
        <div className="container-fluid text-center p-3 d-flex flex-column gap-5">

            {/* header */}
            <h1 className="display-4 fw-bold">Failed and not paid auctions list</h1>

            {/* listing finished auctions*/}
            { auctions.map((auction) => (
                
                <FinishedAuctionTab auctionInfo={auction} />
                
            )) }

        </div>
    )
}


// creating finishedAuctionsLoader
export const finishedAuctionsLoader = async () => {
    // getting finished auctions of user
    const currentUserFinishedAuctions = await getCurrentUserFinishedAuctions()

    // returning result
    return currentUserFinishedAuctions
}