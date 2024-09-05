// importing styles
import "./AuctionTab.css"

// importing time functions
import { getFullDiff } from "../../date_functions/date_functions"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { getRequest } from "../../api_functions/functions"


export const AuctionTab = (props) => {
    // getting props data
    const auction = props.auctionInfo

    // creating useState variable ownerInfo
    let [ownerInfo, setOwnerInfo] = useState()

    // creating useState variable currentDate 
    let [currentDate, setCurrentDate] = useState(new Date())

    // useEffect to get auction owner info
    useEffect(()=>{
        const timeout = setTimeout( async () => {

            ownerInfo = await getRequest(`http://localhost:3000/users/${auction.ownerID}`)
            setOwnerInfo(ownerInfo)

        },1)

        return () => { clearInterval(timeout) }
    }, [])

    // useEffect to update currentDate
    useEffect(()=>{
        const interval = setInterval(()=>{

            // creating new Date()
            currentDate = new Date()
            setCurrentDate(currentDate)

        },1000)

        return () => { clearInterval(interval) }
    }, [])

    return (
        <div className="container-lg border border-1 border-dark shadow-lg d-flex flex-column p-3 mx-auto my-4">
                {/* title */}
                <h3 className="display-5 fw-bold">{auction.title}</h3>

                {/* container */}
                <div className="container-fluid d-flex my-4">
                    
                    {/* money info */}
                    <div className="container d-flex bg-dark text-light flex-column col-lg-5 col-md-5 col-sm-5 p-2 gap-3 shadow-sm  rounded">
                        <h5 className="display-6 fst-italic">Money info</h5>
                        <p>Current price : {auction.currentBid}</p>
                        <p>Buy out price: {auction.buyoutCost}</p>
                        <p>Min bidding price: {auction.minBid}</p>
                    </div>

                    {/* time info */}
                    <div className="container d-flex bg-dark text-light flex-column col-lg-5 col-md-5 col-sm-5 p-2 gap-3 shadow-sm  rounded">
                        <h5 className="display-6 fst-italic">Time info</h5>
                        <p>Date of creation : {new Date(auction.creatingDate).toLocaleString()}</p>
                        <p>Auction end date : {new Date(auction.expireDate).toLocaleString()}</p>
                        <p>Time remaining: {getFullDiff( currentDate , new Date(auction.expireDate))} </p>
                    </div>

                </div>

                {/* displaying order info */}
                {ownerInfo ? <p>Owner info : {ownerInfo.login}</p> : ""}

                {/* displaying auction id */}
                <p>Auction id : {auction.id}</p>

                {/* button to join the auction , link to auction*/}
                <button className="btn btn-outline-success col-lg-5 col-md-5 col-sm-5 col-12 mx-auto">Join the auction!</button>

        </div>
    )
}