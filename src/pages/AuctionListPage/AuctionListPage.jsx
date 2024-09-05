// importing styles
import "./AuctionListPage.css"

// importing functions and components from react library 
import { useEffect, useState } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom"

// importing api functions
import { getCurrentUserAuctions, getCurrentUserInfo, postRequest } from "../../api_functions/functions"

// importing date functions
import { getExpireTime, getFullDiff } from "../../date_functions/date_functions"


export const AuctionListPage = () => {
    // getting data from loader
    const loaderData = useLoaderData()

    // initializing useState variable
    let [currentUserData, setCurrentUserData] = useState(loaderData[0])

    // initializing useState variable
    let [currentUserAuctions, setCurrentUserAuctions] = useState(loaderData[1])

    // initializing useState variable isExpanded
    let [isExpanded, setIsExpanded] = useState(false)

    // initializing useState variable currentDate
    let [currentDate, setCurrentDate] = useState(new Date())

    // useEffect to update currentDate and currentUserAuctions
    useEffect(()=>{
        const interval = setInterval(async()=>{
            // getting info about current date to get current time
            currentDate = new Date()
            setCurrentDate(currentDate) 

            // getting info about current user auctions if anything chang it will be automatically updated on the page by
            // useState variable
            currentUserAuctions = await getCurrentUserAuctions()
            setCurrentUserAuctions(currentUserAuctions)
        }, 1000)

        return () => { clearInterval(interval) }
    }, [])


    // preview page of auctions list
    return (
        <div className="container-fluid p-3 text-center d-flex flex-column gap-3">
            <h1 className="display-4 fw-bold mb-2">List of your auctions</h1>

            {/* button to open form */}
            <button className="btn col-lg-2 col-6  mx-auto btn-outline-primary shadow-lg"
                    onClick={()=>{ setIsExpanded(!isExpanded) }}>

                {/* plus icon from bootstrap icons if !isExpanded*/}
                {!isExpanded ? <i className="bi bi-plus-square icon-30"/> : ""}
                
                {/* minus icon from bootstrap icons if isExpanded */}
                {isExpanded ? <i className="bi bi-dash-square icon-30"/> : ""}

            </button>

            {/* new auction form */}
            {isExpanded ? 
                <Form   method="POST"
                        action="/account/auctionList"
                        className="container col-lg-6 p-3 shadow-lg d-flex flex-column gap-2">
                    
                    {/* header of the form */}
                    <h3 className="display-5">Create new auction</h3>

                    {/* fields of the form */}

                    {/* title field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Title of your auction"
                            name="title"/>

                    {/* description field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Description of your auction"
                            name="desc"/>

                    {/* buyoutCost field */}
                    <input  type="number" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Buyout cost"
                            name="buyoutCost"/>
                    
                    {/* minBidCost field */}
                    <input  type="text" 
                            className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                            placeholder="Min bidding cost"
                            name="minBid"/>

                    {/* time field */}
                    {/* header */}
                    <h3 className="display-5 pt-3">Expire info</h3>

                    {/* inputs */}
                    <input      type="datetime-local" 
                                className="p-3 text-center col-lg-6 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                                placeholder="Seconds"
                                name="expireDate"/>

                    <div className="container d-flex gap-1">

                        <input  type="number" 
                                className="p-3 text-center col-lg-3 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                                placeholder="Hours"
                                name="hours"/>

                        <input  type="number" 
                                className="p-3 text-center col-lg-3 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                                placeholder="Minutes"
                                name="minutes"/>

                        <input  type="number" 
                                className="p-3 text-center col-lg-3 col-md-6 col-sm-6 col-10 mx-auto shadow-lg border-0 rounded" 
                                placeholder="Seconds"
                                name="seconds"/>

                    </div>

                    {/* submit button */}
                    <button className="btn btn-outline-success col-lg-4 col-md-4 col-sm-4 col-6 mx-auto">Create</button>

                </Form> 
            : ""}

            {/* list of your auctions */}
            {currentUserAuctions.map((auction)=>(
                    <div className="container-fluid col-lg-10 col-md-12 mx-auto shadow-lg rounded p-3 my-4">
                        <h3 className="display-5 fw-bold">Title: {auction.title}</h3>
                        <p className="fs-4">Description: {auction.desc}</p>

                        <div className="container-fluid row fs-5 shadow-lg mx-auto mt-5">
                            <h3 className="display-6 fw-bold p-3">Money informations</h3>
                            <div className="col-lg-6 col-md-6 col-12 p-4">Min bid : {auction.minBid}</div>
                            <div className="col-lg-6 col-md-6 col-12 p-4">Buyout cost : {auction.buyoutCost}</div>
                            <p className="fs-5 fst-italic">Current bid : {auction.currentBid}</p>
                        </div>

                        <div className="container-fluid row fs-5 shadow-lg mx-auto mt-5">
                            <h3 className="display-6 fw-bold p-3">Time informations</h3>
                            <div className="col-lg-6 col-md-6 col-12 p-4">Creation date : {new Date(auction.creatingDate).toLocaleString()}</div>
                            <div className="col-lg-6 col-md-6 col-12 p-4">Expire date : {new Date(auction.expireDate).toLocaleString()}</div>
                            <p className="fs-5 fst-italic">Remaining time : {getFullDiff(currentDate, new Date(auction.expireDate))}</p>
                        </div>
                    </div>
            ))}

        </div>
    )
}

export const auctionListLoader = async () => {
    // getting current user data
    const currentUser = await getCurrentUserInfo()

    // getting current user auctions
    const currentUserAuctions = await getCurrentUserAuctions()

    // returning currentUser and currentUserAuctions
    return [currentUser,currentUserAuctions]
}

export const auctionAction = async ( {request} ) => {


    // getting form data
    const data = await request.formData()

    // getting title
    const title = data.get("title")

    // getting desc
    const desc = data.get("desc")

    // getting buyoutCost
    const buyoutCost = data.get("buyoutCost")

    // getting minBid
    const minBid = data.get("minBid")

    // getting time of auction
    // getting date
    const date = data.get("expireDate")

    // getting hours
    const hours = data.get("hours")

    // getting minutes
    const minutes = data.get("minutes")

    // getting seconds
    const seconds = data.get("seconds")

    // checking if any field is empty 
    if ( title == "" || desc == "" || buyoutCost == "" || minBid == "" || (hours == "" && minutes == "" && seconds == "" && date == "") ) {
        // returning error message
        return { error : "All fields must be provided" }
    }

    // getting currentUserData 
    const currentUserData = await getCurrentUserInfo()

    // getting currentDate 
    let currentTime = new Date()

    // creating date after given number of hours , minutes , seconds
    let expireTime = ""
    if (date == ""){
        expireTime = getExpireTime("", hours, minutes, seconds)
    } else {
        expireTime = getExpireTime(date, hours, minutes, seconds)
    }
    
    // creating newAuction object
    const newAuction = {
        id: crypto.randomUUID(),
        ownerID: currentUserData.id,
        title: title,
        desc: desc,
        buyoutCost: buyoutCost,
        minBid: minBid,
        currentBid: 0,
        creatingDate: currentTime,
        expireDate: expireTime
    }

    // posting data into database
    try {
        // posting data to the endpoint 'http://localhost:3000/auctions/'
        await postRequest("http://localhost:3000/auctions/", newAuction)
    } catch {
        // returning error message
        return { error : "Something went wrong during creating auction"}
    }

    // redirecting to same route 
    return redirect("/account/")
}