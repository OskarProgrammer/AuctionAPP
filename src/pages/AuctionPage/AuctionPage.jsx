
// importing styles
import "./AuctionPage.css"

// importing api fucntions
import { deleteRequest, getCurrentUserInfo, getRequest, postRequest, putRequest } from "../../api_functions/functions"

// importing functions and components from react library
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importign date functions
import { addSeconds, getFullDiff } from "../../date_functions/date_functions"

export const AuctionPage = () => {
    // getting loader data
    const [currentUser, auctionData, ownerInfo] = useLoaderData()

    // setting useState variables
    let [currentUserData, setCurrentUserData] = useState(currentUser)
    let [auctionInfo, setAuctionInfo] = useState(auctionData)
    let [currentDate, setCurrentDate] = useState(new Date())
    let [timeRemaining, setTimeRemaining] = useState(getFullDiff(new Date(auctionInfo.expireDate), currentDate))
    let [message, setMessage] = useState("")
    let [block, setBlock] = useState(false)
    

    // creating useEffect interval to update auctionInfo, timeRemaining and currentDate
    useEffect(()=>{
        const interval = setInterval ( async () => {
            while (block){}

            // splitting timeRemaining, checking if is 0

            // setting hours variable with first element of the split array
            let hours = timeRemaining.split(":")[0]

            // setting minutes variable with second element of the split array
            let minutes = timeRemaining.split(":")[1]

            // setting seconds variable with third element of the split array
            let seconds = timeRemaining.split(":")[2]


            // verifying if auction did not expire
            if ( hours == "0" && minutes == "0" && seconds == "0" && !auctionInfo.isFinished) {

                // deleting auction from auctions table
                try {
                    await deleteRequest(`http://localhost:3000/auctions/${auctionInfo.id}`)
                } catch {
                    throw new Error("Error during deleting data")
                }

                // posting auction to finishedAuctions table
                try {
                    auctionInfo.isFinished = true
                    await postRequest("http://localhost:3000/finishedAuctions/", auctionInfo)
                } catch {
                    throw new Error("Error during posting data")
                }

                setMessage("")
            }   

            
            // getting info about auction
            try {
                auctionInfo = await getRequest(`http://localhost:3000/auctions/${auctionInfo.id}`)
                auctionInfo.isFinished = false
            } catch {
                auctionInfo = await getRequest(`http://localhost:3000/finishedAuctions/${auctionInfo.id}`)
                auctionInfo.isFinished = true
            }

            // updating auctionInfo 
            setAuctionInfo(auctionInfo)

            // updating currentDate
            currentDate = new Date()
            setCurrentDate(currentDate)

            // updating time remaining
            if (!auctionInfo.isFinished) {
                timeRemaining = getFullDiff(new Date(auctionInfo.expireDate), currentDate)
                setTimeRemaining(timeRemaining)
            }
            

        }, 1000)

        return () => { clearInterval(interval) } // clearing interval
    })

    const buy = async () => {
        // blocking the thread
        block = true
        setBlock(true)

        if (currentUserData.balance < auctionInfo.buyoutCost) {
            // setting message
            message = "You haven't got enough money"
            setMessage(message)

            // unblocking thread
            block = false
            setBlock(block)

            // stopping function
            return
        }

        // rewriting the winner id and currentBid in the record of this auction
        auctionInfo.winnerID = currentUserData.id
        auctionInfo.currentBid = auctionInfo.buyoutCost

        // deleting auction from auctions table
        try {
            await deleteRequest(`http://localhost:3000/auctions/${auctionInfo.id}`)
        } catch {
            throw new Error("Error during deleting data")
        }

        // posting auction to finishedAuctions table
        try {
            auctionInfo.isFinished = true
            await postRequest("http://localhost:3000/finishedAuctions/", auctionInfo)
        } catch {
            throw new Error("Error during posting data")
        }

        // setting message
        message = "You bought this item"
        setMessage(message)

        // unblocking thread
        block = false
        setBlock(block)
    }

    const bid = async () => {

        // blocking thread
        block = true
        setBlock(block)

        // checking if user have enough money and if user isnt the winner already
        if (currentUserData.balance < (1.2 * auctionInfo.currentBid) || currentUserData.id == auctionInfo.winnerID){
            // setting message 
            message = "You can't bid price!"
            setMessage(message)

            // unblocking thread
            block = false
            setBlock(block)

            return
        }

        // rewriting info of auction
        auctionInfo.winnerID = currentUserData.id

        if (auctionInfo.currentBid == 0){
            auctionInfo.currentBid = (1.2 * auctionInfo.minBid)
        }else{
            auctionInfo.currentBid = (1.2 * auctionInfo.currentBid)
        }
        auctionInfo.expireDate = addSeconds(new Date(auctionInfo.expireDate), 30)

        try {
            await putRequest(`http://localhost:3000/auctions/${auctionInfo.id}`, auctionInfo)
        } catch {
            throw new Error("Something went wrong during updating")
        }

        // setting message
        message = "You have bidden price!"
        setMessage(message)

        // unblocking thread
        block = false
        setBlock(block)

        // stopping function
        return
    }

    return (
        <div className="container-fluid row ">

            {/* left side */}
            <div className="col-lg-8 text-center my-auto">
                <h2 className="display-3 fw-bold">{auctionInfo.title}</h2>
                <div className="container-fluid my-5 shadow fs-3 p-3">
                    {auctionInfo.desc}
                </div>
            </div>

            {/* right side */}
            <div className="col-lg-4 text-center mt-4 ">

                {/* image section */}
                <div className="container-fluid bg-dark text-center text-light imageSection rounded d-lg-block d-sm-none d-none">
                    IMAGE
                </div>

                {/* button container */}
                { !auctionInfo.isFinished &&  currentUserData.isLogged && currentUserData.id != auctionInfo.ownerID? <div className="container-fluid d-flex flex-row justify-content-center gap-3 p-2 mt-4">
                        <button className="btn btn-outline-success btn-lg col-5 buttonHover" onClick={()=>{ buy() }}>Buy out</button>
                        <button className="btn btn-outline-success btn-lg col-5 buttonHover" onClick={()=>{ bid() }}>Bid</button>
                    </div> : 
                    ""
                }

                {/* message */}
                { message ? <p className="fs-3 py-2 fw-bold">{message}</p> : ""}
                
                {/* price info */}
                <div className="container-fluid d-flex flex-column shadow my-3 p-1">
                    <p className="fs-3 pt-2">Current price : {auctionInfo.currentBid}</p>
                    <p className="fs-3">Buy out price : {auctionInfo.buyoutCost}</p>
                    <p className="fs-3">Bid price : {1.2 * auctionInfo.currentBid}</p>
                </div>

                {/* time info */}
                {!auctionInfo.isFinished ? <p className="fs-3 textShadow">Time remaining : {timeRemaining}</p> : 
                    auctionInfo.winnerID == currentUserData.id ? <p className="fs-3 bg-success text-light p-3 rounded">You won</p> :
                    <p className="fs-3 bg-danger text-light p-3 rounded">Auction ended</p>
                }

                {/* bidding info */}
                {!auctionInfo.isFinished && auctionInfo.winnerID == currentUserData.id ? <p className="fs-3 bg-success text-light p-3 rounded">You are winning</p> 
                : ""}

                {/* owner info */}
                <div className="container-fluid d-flex flex-column gap-0">
                    <div className="container-fluid">Owner : {ownerInfo.login}</div>
                    <div className="container-fluid">Owner ID: {ownerInfo.id}</div>
                </div>

            </div>

        </div>
    )
}

// loader of the page
export const auctionLoader = async ({params}) => {
    // getting auction id
    const {id} = params

    // declaring variaable auctionData
    let auctionData = {}

    // getting data about auction 
    try {
        auctionData = await getRequest(`http://localhost:3000/auctions/${id}`) 
        auctionData.isFinished = false
    } catch {
        auctionData = await getRequest(`http://localhost:3000/finishedAuctions/${id}`) 
        auctionData.isFinished = true
    }

    // getting current user data
    let currentUserData = await getCurrentUserInfo()
    if (currentUserData == undefined) {
        currentUserData = {
            id: null,
            isLogged: false
        }
    } else {
        currentUserData.isLogged = true
    }

    // getting auction owner info
    let auctionOwnerInfo = await getRequest(`http://localhost:3000/users/${auctionData.ownerID}`)

    // returning data
    return [currentUserData, auctionData, auctionOwnerInfo]
}