// importing styles
import "./AuctionTab.css"

// importing time functions
import { getFullDiff } from "../../date_functions/date_functions"

// importing functions and components from react library
import { useEffect, useState } from "react"
import { deleteRequest, getRequest, postRequest } from "../../api_functions/functions"
import { NavLink } from "react-router-dom"


export const AuctionTab = (props) => {
    // getting props data
    let auction = props.auctionInfo

    // creating useState variable ownerInfo
    let [ownerInfo, setOwnerInfo] = useState()

    // creating useState variable currentDate 
    let [currentDate, setCurrentDate] = useState(new Date())

    // creating useState variable timeDiff
    let [timeDiff, setTimeDiff] = useState(getFullDiff( currentDate , new Date(auction.expireDate)))

    // useEffect to get auction owner info
    useEffect(()=>{
        const timeout = setTimeout( async () => {

            // getting info about owner of the auction 
            ownerInfo = await getRequest(`http://localhost:3000/users/${auction.ownerID}`)

            // setting useState variable ownerInfo
            setOwnerInfo(ownerInfo)

        },1)

        return () => { clearInterval(timeout) } // clearing interval in destructor method
    }, [])

    // useEffect to update currentDate
    useEffect(()=>{
        const interval = setInterval( async () => {

            // creating new Date()
            currentDate = new Date()

            // updating useState variable
            setCurrentDate(currentDate)

            
            // splitting timeDiff, checking if is 0

            // setting hours variable with first element of the split array
            let hours = timeDiff.split(":")[0]

            // setting minutes variable with second element of the split array
            let minutes = timeDiff.split(":")[1]

            // setting seconds variable with third element of the split array
            let seconds = timeDiff.split(":")[2]


            // verifying if auction did not expire
            if ( hours == "0" && minutes == "0" && seconds == "0") {

                // deleting auction from auctions table
                try {
                    await deleteRequest(`http://localhost:3000/auctions/${auction.id}`)
                } catch {
                    throw new Error("Error during deleting data")
                }

                // posting auction to finishedAuctions table
                try {
                    await postRequest("http://localhost:3000/finishedAuctions/", auction)
                } catch {
                    throw new Error("Error during posting data")
                }

                // stopping function
                return
            }   

            // setting timeDiff
            timeDiff = getFullDiff( currentDate , new Date(auction.expireDate))

            // setting useState variable timeDiff
            setTimeDiff(timeDiff)
        
        },1000)

        return () => { clearInterval(interval) } // clearing interaval
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
                        <p>Time remaining: {timeDiff} </p>
                    </div>

                </div>

                {/* displaying order info */}
                {ownerInfo ? <p>Owner info : {ownerInfo.login}</p> : ""}

                {/* displaying auction id */}
                <p>Auction id : {auction.id}</p>

                {/* navlink to join the auction , link to '/auction/:id' */}
                <NavLink to={`/auction/${auction.id}`} className="btn btn-outline-success col-lg-5 col-md-5 col-sm-5 col-12 mx-auto">
                    Join the auction!
                </NavLink>

        </div>
    )
}