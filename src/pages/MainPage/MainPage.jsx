// importing styles
import "./MainPage.css"

// importing api functions
import { getAllAuctionsWithoutCurrentUser } from "../../api_functions/functions"

// importing time functions
import {  } from "../../date_functions/date_functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useState , useEffect } from "react"

// importing components
import { AuctionTab } from "../../components/AuctionTab/AuctionTab"


//main page look
export const MainPage = () => {

    // getting loaderData 
    const loaderData = useLoaderData()

    // creating useState variable auctions 
    let [auctions, setAuctions] = useState(loaderData)

    
    // useEffect that get auctions every 3 seconds
    useEffect(()=>{
        const interval = setInterval( async () => {
            // getting data from endpoint
            const newAuctions = await getAllAuctionsWithoutCurrentUser()

            // setting auctions useState variable
            auctions = newAuctions
            setAuctions(auctions)

        }, 3000)

        return () => { clearInterval(interval) }
    }, [])


    // preview page 
    return(
        <div className="container-fluid text-center p-3">

            {/* displaying auctions */}
            {auctions.map((auction)=> (
                //  tab
                <AuctionTab auctionInfo={auction} />
            ))}

        </div>
    )
}

// loader of the mainPage
export const loaderMainPage = async () =>{
    // getting auctions which the owner is not current user
    const auctions = await getAllAuctionsWithoutCurrentUser()

    return auctions
}